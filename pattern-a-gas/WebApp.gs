/**
 * G-6: ウェブアプリ（締切チェック → フォームへリダイレクト）
 * デプロイ後、設定シートの GASウェブアプリURL にこの URL を設定する。
 *
 * 追加の設定キー（設定シート B 列）:
 * - フォームURL … Googleフォームの /viewform までの URL
 * - トークンentry番号 … フォームの「トークン」設問の entry.XXXXXXXX の数字部分のみ
 */

/**
 * @param {GoogleAppsScript.Events.DoGet} e
 * @return {GoogleAppsScript.HTML.HtmlOutput}
 */
function doGet(e) {
  try {
    var token = e.parameter.token ? String(e.parameter.token).trim() : '';

    if (isDeadlinePassed()) {
      return createClosedPage();
    }

    if (!token) {
      return createErrorPage();
    }

    var inv = getInviteeByToken(token);
    if (!inv) {
      return createErrorPage();
    }

    return createRedirectPage(token);
  } catch (err) {
    Logger.log('doGet エラー: ' + err);
    return createErrorPage();
  }
}

function createClosedPage() {
  var config = getConfig();
  var title = escapeHtml_(config['イベント名']);
  var when = escapeHtml_(config['開催日時']);
  var place = escapeHtml_(config['会場名']);
  var name = escapeHtml_(config['幹事名']);
  var mail = escapeHtml_(config['幹事メールアドレス']);
  var html =
    '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<title>受付終了</title><style>' +
    'body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;' +
    'min-height:100vh;margin:0;background:#f8f9fa;text-align:center;padding:20px;}' +
    '.card{background:#fff;border-radius:12px;padding:40px 32px;max-width:400px;' +
    'box-shadow:0 4px 20px rgba(0,0,0,0.1);}' +
    '.icon{font-size:48px;margin-bottom:16px;}' +
    'h1{font-size:22px;color:#333;margin-bottom:12px;}' +
    'p{font-size:14px;color:#666;line-height:1.8;}' +
    '.event-info{background:#f8f9fa;border-radius:8px;padding:16px;margin:20px 0;' +
    'font-size:13px;color:#555;text-align:left;}' +
    '.contact{color:#1a73e8;font-size:13px;margin-top:16px;}' +
    '</style></head><body><div class="card"><div class="icon">🚪</div>' +
    '<h1>受付は終了しました</h1><p>このイベントの回答受付は<br>締め切られました。</p>' +
    '<div class="event-info"><strong>📅 ' +
    title +
    '</strong><br>' +
    when +
    '<br>' +
    place +
    '</div><p class="contact">ご不明な点は幹事までお問い合わせください。<br>' +
    name +
    '（' +
    mail +
    '）</p></div></body></html>';
  return HtmlService.createHtmlOutput(html).setTitle('受付終了');
}

function createErrorPage() {
  var html =
    '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<title>エラー</title></head><body style="font-family:sans-serif;text-align:center;padding:40px;">' +
    '<p>不正なアクセスです。</p></body></html>';
  return HtmlService.createHtmlOutput(html).setTitle('エラー');
}

/**
 * @param {string} token
 * @return {GoogleAppsScript.HTML.HtmlOutput}
 */
function createRedirectPage(token) {
  var config = getConfig();
  var formUrl = String(config['フォームURL'] || '').trim();
  var entryRaw = String(config['トークンentry番号'] || '').trim();
  if (!formUrl || !entryRaw) {
    Logger.log('createRedirectPage: フォームURL または トークンentry番号 が未設定');
    return createErrorPage();
  }
  var entryId = entryRaw.replace(/^entry\./i, '');
  var sep = formUrl.indexOf('?') >= 0 ? '&' : '?';
  var dest = formUrl + sep + 'entry.' + entryId + '=' + encodeURIComponent(token);
  var html =
    '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8">' +
    '<meta http-equiv="refresh" content="0;url=' +
    escapeAttr_(dest) +
    '">' +
    '<title>リダイレクト中</title></head><body style="font-family:sans-serif;padding:24px;">' +
    '<p>フォームへ移動しています…</p>' +
    '<script>window.location.replace(' +
    JSON.stringify(dest) +
    ');</script></body></html>';
  return HtmlService.createHtmlOutput(html).setTitle('回答フォーム');
}

/**
 * @param {string} s
 * @return {string}
 */
function escapeHtml_(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * @param {string} s
 * @return {string}
 */
function escapeAttr_(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}
