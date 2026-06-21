/**
 * G-3 / G-4: メール送信・テンプレート
 */

var INITIAL_SUBJECT_TEMPLATE_ = '【ご案内】{{イベント名}}';
var INITIAL_BODY_TEMPLATE_ =
  '━━━━━━━━━━━━━━━━━━━━━━\n' +
  '{{氏名}} 様\n\n' +
  'ご無沙汰しております。{{幹事名}}です。\n' +
  'この度、下記のとおり{{イベント種別}}を開催することになりました。\n' +
  'ぜひご参加いただけますと嬉しく思います。\n\n' +
  '■ イベント名：{{イベント名}}\n' +
  '■ 日時：{{開催日時}}\n' +
  '■ 会場：{{会場名}}\n' +
  '■ 会費：{{会費}}\n' +
  '■ 回答期限：{{回答締切日}}\n\n' +
  '▼ 出欠のご回答はこちら（タップするだけでOKです）\n' +
  '{{回答URL}}\n\n' +
  '※このURLは {{氏名}} さん専用です。他の方には転送しないようお願いします。\n\n' +
  'ご不明な点はお気軽にご連絡ください。\n' +
  '{{幹事名}}（{{幹事メールアドレス}}）\n' +
  '━━━━━━━━━━━━━━━━━━━━━━';

var REMINDER_SUBJECT_TEMPLATE_ = '【リマインド】{{イベント名}} — 回答期限が近づいています';
var REMINDER_BODY_TEMPLATE_ =
  '{{氏名}} 様\n\n' +
  '先日ご案内した{{イベント種別}}について、\n' +
  'まだご回答をいただいていないようです。\n\n' +
  'お忙しいところ大変恐れ入りますが、\n' +
  '{{回答締切日}}までにご回答いただけますと助かります。\n\n' +
  '▼ 出欠のご回答はこちら（約30秒で完了します）\n' +
  '{{回答URL}}\n\n' +
  '{{幹事名}} より';

var CONFIRM_SUBJECT_TEMPLATE_ = '【回答受付完了】{{イベント名}}';
var CONFIRM_BODY_TEMPLATE_ =
  '{{氏名}} 様、ご回答ありがとうございます。\n\n' +
  '以下の内容で受け付けました：\n' +
  '■ 回答：{{回答ラベル}}\n' +
  '{{コメント行}}' +
  '\n回答内容を変更される場合は、\n' +
  'メールのリンクから再度回答いただけます（期限：{{回答締切日}}まで）。\n\n' +
  '{{幹事名}} より';

/**
 * {{キー}} を置換
 * @param {string} template
 * @param {Object<string, *>} map
 * @return {string}
 */
function buildMailBody(template, map) {
  var out = template;
  for (var k in map) {
    if (!Object.prototype.hasOwnProperty.call(map, k)) continue;
    var re = new RegExp('\\{\\{' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\}\\}', 'g');
    out = out.replace(re, String(map[k] == null ? '' : map[k]));
  }
  return out;
}

/**
 * 初回案内メールを名簿の全員に送信（回答 URL 必須）
 * @return {number} 送信数
 */
function sendInitialMails() {
  var config = getConfig();
  if (isDeadlinePassed()) {
    Logger.log('sendInitialMails: 締切後のため送信しません');
    return 0;
  }
  var sheet = getInviteesSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;
  var rows = sheet.getRange(2, 1, lastRow, COL_URL).getValues();
  var n = 0;
  for (var i = 0; i < rows.length; i++) {
    var email = String(rows[i][COL_EMAIL - 1] || '').trim();
    var url = String(rows[i][COL_URL - 1] || '').trim();
    if (!email || !url) {
      Logger.log('sendInitialMails: スキップ（メールまたはURLなし） 行 ' + (i + 2));
      continue;
    }
    var map = buildInviteeMailMap_(rows[i], config);
    map['回答URL'] = url;
    var subject = buildMailBody(INITIAL_SUBJECT_TEMPLATE_, map);
    var body = buildMailBody(INITIAL_BODY_TEMPLATE_, map);
    GmailApp.sendEmail(email, subject, body);
    n++;
    Utilities.sleep(200);
  }
  Logger.log('sendInitialMails: ' + n + ' 件送信しました');
  return n;
}

/**
 * G-3: 未回答者のみリマインド（UI なし）
 * @return {number} 送信数
 */
function sendReminderMails() {
  if (isDeadlinePassed()) {
    Logger.log('sendReminderMails: 締切後のため送信しません');
    return 0;
  }
  var list = getUnansweredInvitees();
  var config = getConfig();
  var n = 0;
  for (var i = 0; i < list.length; i++) {
    sendReminderMail_(list[i], config);
    n++;
    Utilities.sleep(200);
  }
  Logger.log('sendReminderMails: ' + n + ' 件送信しました');
  return n;
}

/**
 * @param {Array} rowVals 名簿の1行分（先頭列から COL_URL まで）
 * @param {Object} config
 * @return {Object<string, string>}
 */
function buildInviteeMailMap_(rowVals, config) {
  return {
    氏名: String(rowVals[COL_NAME - 1] || ''),
    イベント名: formatConfigValue_(config['イベント名']),
    イベント種別: String(config['イベント種別'] || ''),
    幹事名: String(config['幹事名'] || ''),
    幹事メールアドレス: String(config['幹事メールアドレス'] || ''),
    開催日時: String(config['開催日時'] || ''),
    会場名: String(config['会場名'] || ''),
    会費: String(config['会費'] || ''),
    回答締切日: formatConfigValue_(config['回答締切日']),
  };
}

/**
 * @param {UnansweredInvitee} inv
 * @param {Object} config
 */
function sendReminderMail_(inv, config) {
  var map = {
    氏名: inv.name,
    イベント名: formatConfigValue_(config['イベント名']),
    イベント種別: String(config['イベント種別'] || ''),
    幹事名: String(config['幹事名'] || ''),
    回答締切日: formatConfigValue_(config['回答締切日']),
    回答URL: inv.url,
  };
  var subject = buildMailBody(REMINDER_SUBJECT_TEMPLATE_, map);
  var body = buildMailBody(REMINDER_BODY_TEMPLATE_, map);
  GmailApp.sendEmail(inv.email, subject, body);
}

/**
 * @param {InviteeRow} inviteeData
 * @param {string} statusLabel 参加 / 不参加 / 保留
 * @param {string=} comment
 */
function sendConfirmationMail(inviteeData, statusLabel, comment) {
  var config = getConfig();
  var commentLine = '';
  if (comment && String(comment).trim()) {
    commentLine = '■ コメント：' + String(comment).trim() + '\n';
  }
  var map = {
    氏名: inviteeData.name,
    イベント名: formatConfigValue_(config['イベント名']),
    回答ラベル: statusLabel,
    コメント行: commentLine,
    回答締切日: formatConfigValue_(config['回答締切日']),
    幹事名: String(config['幹事名'] || ''),
  };
  var email = String(inviteeData.email || '').trim();
  if (!email) {
    Logger.log('sendConfirmationMail: メールなしのためスキップ');
    return;
  }
  var subject = buildMailBody(CONFIRM_SUBJECT_TEMPLATE_, map);
  var body = buildMailBody(CONFIRM_BODY_TEMPLATE_, map);
  GmailApp.sendEmail(email, subject, body);
}
