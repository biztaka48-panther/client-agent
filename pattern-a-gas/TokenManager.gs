/**
 * G-2: トークン生成・URL 自動生成
 */

/**
 * 名簿の空トークン行に UUID と回答 URL（GAS ウェブアプリ + token）を設定する。
 * @return {number} 生成件数
 */
function generateTokens() {
  var sheet = getInviteesSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    Logger.log('generateTokens: データ行がありません');
    return 0;
  }
  var config = getConfig();
  var baseUrl = String(config['GASウェブアプリURL'] || '').trim();
  if (!baseUrl) {
    throw new Error('設定シートに GASウェブアプリURL を設定してから実行してください。');
  }
  var existing = collectExistingTokens_(sheet, lastRow);
  var count = 0;
  for (var r = 2; r <= lastRow; r++) {
    var cellToken = sheet.getRange(r, COL_TOKEN).getValue();
    if (cellToken !== '' && cellToken != null) continue;

    var token;
    var safety = 0;
    do {
      token = Utilities.getUuid().replace(/-/g, '');
      safety++;
      if (safety > 50) {
        throw new Error('トークン重複回避に失敗しました');
      }
    } while (existing[token]);

    existing[token] = true;
    // 仕様: baseUrl + '?token=' + token（baseUrl に既に ? がある場合は &）
    var sep = baseUrl.indexOf('?') >= 0 ? '&' : '?';
    var answerUrl = baseUrl + sep + 'token=' + token;
    sheet.getRange(r, COL_TOKEN).setValue(token);
    sheet.getRange(r, COL_URL).setValue(answerUrl);
    count++;
    Logger.log('generateTokens: 行 ' + r + ' にトークンを設定しました');
  }
  Logger.log('generateTokens: ' + count + '件のトークンを生成しました');
  return count;
}

/**
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 * @param {number} lastRow
 * @return {Object<string, boolean>}
 */
function collectExistingTokens_(sheet, lastRow) {
  var map = {};
  if (lastRow < 2) return map;
  var vals = sheet.getRange(2, COL_TOKEN, lastRow, COL_TOKEN).getValues();
  for (var i = 0; i < vals.length; i++) {
    var t = String(vals[i][0] || '').trim();
    if (t) map[t] = true;
  }
  return map;
}

/**
 * トークンに一致する名簿行を返す。見つからなければ null。
 * @param {string} token
 * @return {InviteeRow|null}
 */
function getInviteeByToken(token) {
  var t = String(token || '').trim();
  if (!t) return null;
  var sheet = getInviteesSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;
  var range = sheet.getRange(2, 1, lastRow, COL_LAST_RESP);
  var rows = range.getValues();
  for (var i = 0; i < rows.length; i++) {
    var rowToken = String(rows[i][COL_TOKEN - 1] || '').trim();
    if (rowToken === t) {
      var rowNum = i + 2;
      return {
        row: rowNum,
        name: String(rows[i][COL_NAME - 1] || ''),
        email: String(rows[i][COL_EMAIL - 1] || ''),
        status: String(rows[i][COL_STATUS - 1] || ''),
        guests: String(rows[i][COL_GUESTS - 1] || ''),
        payment: String(rows[i][COL_PAYMENT - 1] || ''),
      };
    }
  }
  return null;
}

/**
 * @typedef {{
 *   row: number,
 *   name: string,
 *   email: string,
 *   status: string,
 *   guests: string,
 *   payment: string
 * }} InviteeRow
 */
