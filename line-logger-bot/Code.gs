/**
 * LINEログ収集Bot（Google Apps Script）
 *
 * 目的:
 * - LINE Messaging API の Webhook を受け取り（doPost）
 * - 署名検証を行い（改ざん防止）
 * - 会話ログを Google Sheets に追記する
 *
 * 事前準備（スクリプトプロパティに設定）:
 * - LINE_CHANNEL_SECRET: チャネルシークレット
 * - LINE_CHANNEL_ACCESS_TOKEN: チャネルアクセストークン（長期トークン推奨）
 * - SPREADSHEET_ID: 保存先スプレッドシートID
 * - SHEET_NAME: シート名（未設定なら "Conversations"）
 *
 * 保存列:
 * timestamp | group_id | user_id | user_name | message_type | message_text | reply_token
 */

/**
 * Webhook エントリーポイント（POST /）
 *
 * LINE からのリクエストは JSON で events 配列を含みます。
 * - 1リクエストに複数イベントが入ることがあるため、events を全処理します。
 */
function doPost(e) {
  try {
    // --- 1) 入力の取り出し ---
    // GAS では e.postData.contents にリクエストボディ（文字列）が入ります。
    var body = (e && e.postData && e.postData.contents) ? e.postData.contents : "";
    if (!body) {
      // ボディが空なら処理できないため 400 相当（LINEは再送する可能性あり）
      return jsonResponse_(400, { ok: false, error: "Empty body" });
    }

    // --- 2) Webhook署名検証（改ざん検知） ---
    // LINEは X-Line-Signature ヘッダに HMAC-SHA256 の署名を Base64 で付与します。
    // GAS の doPost ではヘッダ参照が制限されるため、
    // Web Apps の設定/環境によっては e.parameter / e.headers で取れないことがあります。
    // 可能な範囲で取得し、取れない場合は明示エラーにします（運用では必ず検証できる形に設定してください）。
    var signature = extractLineSignature_(e);
    if (!signature) {
      return jsonResponse_(401, { ok: false, error: "Missing X-Line-Signature" });
    }

    var secret = getScriptPropertyRequired_("LINE_CHANNEL_SECRET");
    var ok = verifyLineSignature_(secret, body, signature);
    if (!ok) {
      return jsonResponse_(401, { ok: false, error: "Invalid signature" });
    }

    // --- 3) JSONパース ---
    var payload;
    try {
      payload = JSON.parse(body);
    } catch (err) {
      return jsonResponse_(400, { ok: false, error: "Invalid JSON", detail: String(err) });
    }

    var events = payload && payload.events ? payload.events : [];
    if (!events || events.length === 0) {
      // 検証目的の ping 的リクエストや、空イベントの可能性に備える
      return jsonResponse_(200, { ok: true, processed: 0 });
    }

    // --- 4) Sheets へ追記（存在しない場合は作成/ヘッダ整備） ---
    var sheet = getOrCreateSheet_();

    // LINEプロフィール取得にはアクセストークンが必要
    var accessToken = getScriptPropertyRequired_("LINE_CHANNEL_ACCESS_TOKEN");

    var rows = [];
    for (var i = 0; i < events.length; i++) {
      var ev = events[i];

      // 返信トークン（メッセージイベントに付与される。時限で失効するためログ用に保存）
      var replyToken = ev.replyToken || "";

      // ソース情報（どこで発生したイベントか）
      var source = ev.source || {};
      var groupId = source.groupId || "";
      var userId = source.userId || "";

      // タイムスタンプ（LINEはミリ秒を返す）
      var ts = ev.timestamp ? new Date(ev.timestamp) : new Date();

      // メッセージ情報
      var message = ev.message || {};
      var messageType = message.type || "";

      // 本文（テキスト以外も "情報が取れる範囲で" 文字列化して残す）
      var messageText = extractMessageText_(messageType, message);

      // ユーザー名（グループなら group member profile API を優先）
      var userName = "";
      if (userId) {
        userName = fetchUserNameSafe_(accessToken, groupId, userId);
      }

      rows.push([
        formatTimestamp_(ts),
        groupId,
        userId,
        userName,
        messageType,
        messageText,
        replyToken
      ]);
    }

    if (rows.length > 0) {
      var startRow = sheet.getLastRow() + 1;
      sheet.getRange(startRow, 1, rows.length, rows[0].length).setValues(rows);
    }

    return jsonResponse_(200, { ok: true, processed: rows.length });
  } catch (errTop) {
    // 想定外エラーはログに残し、レスポンスは 500
    console.error(errTop);
    return jsonResponse_(500, { ok: false, error: "Internal error", detail: String(errTop) });
  }
}

/**
 * X-Line-Signature を取り出します。
 *
 * 注意:
 * - GASのWeb Appsは実行環境によってヘッダが e に載らない場合があります。
 * - その場合は「デプロイ設定」や「プロキシ/Cloud Run」など別経路で署名検証する構成が必要です。
 * - 今回は「取れる場合に取り出す」実装にしています。
 */
function extractLineSignature_(e) {
  // 可能性のある場所を順に探す
  // 1) e.headers（環境によって存在）
  if (e && e.headers) {
    // 大文字小文字の揺れに備える
    return e.headers["X-Line-Signature"] || e.headers["x-line-signature"] || "";
  }
  // 2) e.parameter（クエリに付いてしまった場合の保険。通常は使わない）
  if (e && e.parameter) {
    return e.parameter["X-Line-Signature"] || e.parameter["x-line-signature"] || "";
  }
  return "";
}

/**
 * LINE Webhook署名検証（HMAC-SHA256 + Base64）
 *
 * 仕様:
 * - 署名 = Base64( HMAC_SHA256(channelSecret, requestBodyBytes) )
 * - requestBody は "生の文字列" をそのままバイト列化して計算します。
 */
function verifyLineSignature_(channelSecret, body, signature) {
  var mac = Utilities.computeHmacSha256Signature(body, channelSecret);
  var computed = Utilities.base64Encode(mac);
  // 署名は完全一致で判定（余計な空白を除去して比較）
  return computed === String(signature).trim();
}

/**
 * スクリプトプロパティを必須として取得します。
 * 未設定なら例外を投げて、設定漏れを早期に気づけるようにします。
 */
function getScriptPropertyRequired_(key) {
  var props = PropertiesService.getScriptProperties();
  var val = props.getProperty(key);
  if (!val) throw new Error("Missing Script Property: " + key);
  return val;
}

/**
 * シートが無ければ作り、ヘッダ行も無ければ作成します。
 *
 * - SPREADSHEET_ID は必須
 * - SHEET_NAME は任意（未設定なら "Conversations"）
 */
function getOrCreateSheet_() {
  var spreadsheetId = getScriptPropertyRequired_("SPREADSHEET_ID");
  var props = PropertiesService.getScriptProperties();
  var sheetName = props.getProperty("SHEET_NAME") || "Conversations";

  var ss;
  try {
    ss = SpreadsheetApp.openById(spreadsheetId);
  } catch (err) {
    // 例: IDが間違っている/権限が無い
    throw new Error("Cannot open spreadsheet. Check SPREADSHEET_ID and permissions. detail=" + String(err));
  }

  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    // 存在しないシートは作成して復旧できるようにする
    sheet = ss.insertSheet(sheetName);
  }

  // ヘッダ整備（1行目が空ならヘッダを書き込む）
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["timestamp", "group_id", "user_id", "user_name", "message_type", "message_text", "reply_token"]);
  }

  return sheet;
}

/**
 * メッセージタイプに応じて、ログとして残しやすい文字列を作ります。
 * - text: 本文
 * - image/video/audio/file: id, fileName など取れる範囲
 * - location/sticker: 主要情報を短く
 */
function extractMessageText_(messageType, message) {
  if (!messageType) return "";
  if (messageType === "text") return message.text || "";

  // 画像/動画/音声/ファイルは「本文」が無いので、識別子を残す
  if (messageType === "image" || messageType === "video" || messageType === "audio") {
    return "contentProvider=" + JSON.stringify(message.contentProvider || {}) + " id=" + (message.id || "");
  }
  if (messageType === "file") {
    return "fileName=" + (message.fileName || "") + " fileSize=" + (message.fileSize || "") + " id=" + (message.id || "");
  }
  if (messageType === "location") {
    return "title=" + (message.title || "") + " address=" + (message.address || "");
  }
  if (messageType === "sticker") {
    return "packageId=" + (message.packageId || "") + " stickerId=" + (message.stickerId || "");
  }

  // その他は JSON で残しておく（後から分析しやすい）
  return JSON.stringify(message || {});
}

/**
 * ユーザー名取得（エラーが出てもログ保存は止めない）
 *
 * グループ内のユーザー名は、通常の profile API では取れないため、
 * group member profile API を優先します。
 */
function fetchUserNameSafe_(accessToken, groupId, userId) {
  try {
    var profile;
    if (groupId) {
      profile = fetchGroupMemberProfile_(accessToken, groupId, userId);
    } else {
      profile = fetchUserProfile_(accessToken, userId);
    }
    return (profile && profile.displayName) ? profile.displayName : "";
  } catch (err) {
    console.warn("Profile fetch failed. groupId=" + groupId + " userId=" + userId + " detail=" + String(err));
    return "";
  }
}

/**
 * 1:1チャット等で使えるプロフィール取得
 * GET https://api.line.me/v2/bot/profile/{userId}
 */
function fetchUserProfile_(accessToken, userId) {
  var url = "https://api.line.me/v2/bot/profile/" + encodeURIComponent(userId);
  return httpGetJson_(url, accessToken);
}

/**
 * グループ内メンバーのプロフィール取得
 * GET https://api.line.me/v2/bot/group/{groupId}/member/{userId}
 */
function fetchGroupMemberProfile_(accessToken, groupId, userId) {
  var url = "https://api.line.me/v2/bot/group/" + encodeURIComponent(groupId) + "/member/" + encodeURIComponent(userId);
  return httpGetJson_(url, accessToken);
}

/**
 * LINE API を GET して JSON を返します。
 * - APIエラー時は例外（HTTPステータスと本文）を含めて投げます。
 */
function httpGetJson_(url, accessToken) {
  var res = UrlFetchApp.fetch(url, {
    method: "get",
    muteHttpExceptions: true,
    headers: { Authorization: "Bearer " + accessToken }
  });
  var code = res.getResponseCode();
  var text = res.getContentText();
  if (code < 200 || code >= 300) {
    throw new Error("HTTP " + code + " " + text);
  }
  return JSON.parse(text);
}

/**
 * 監視しやすい形式に整形したタイムスタンプ（ISO風）
 */
function formatTimestamp_(d) {
  // スプレッドシート側で並び替えしやすいよう "YYYY-MM-DD HH:mm:ss" 形式
  var yyyy = d.getFullYear();
  var mm = ("0" + (d.getMonth() + 1)).slice(-2);
  var dd = ("0" + d.getDate()).slice(-2);
  var HH = ("0" + d.getHours()).slice(-2);
  var MM = ("0" + d.getMinutes()).slice(-2);
  var SS = ("0" + d.getSeconds()).slice(-2);
  return yyyy + "-" + mm + "-" + dd + " " + HH + ":" + MM + ":" + SS;
}

/**
 * JSONレスポンスを返します（ContentService）
 */
function jsonResponse_(statusCode, obj) {
  // doPost の返り値ではステータスコードを細かく制御しづらい環境があるため、
  // ここでは body に status を含める実装にしています（必要なら後で構成に合わせて変更）。
  var payload = {
    status: statusCode,
    body: obj
  };
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

