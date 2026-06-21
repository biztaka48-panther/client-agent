/**
 * G-5: 名簿更新・集計ヘルパー
 */

/**
 * 名簿の該当行を回答で上書きする（同一トークンは常に1行）。
 * @param {string} token
 * @param {ResponsePayload} responseData
 * @return {boolean}
 */
function updateInvitee(token, responseData) {
  var inv = getInviteeByToken(token);
  if (!inv) {
    Logger.log('updateInvitee: 名簿に存在しないトークンです');
    return false;
  }
  var sheet = getInviteesSheet();
  var row = inv.row;
  sheet.getRange(row, COL_STATUS).setValue(responseData.status);
  sheet.getRange(row, COL_GUESTS).setValue(responseData.guests || '');
  sheet.getRange(row, COL_LAST_RESP).setValue(new Date());
  Logger.log('updateInvitee: ' + token + ' の回答を更新しました（行 ' + row + '）');
  return true;
}

/**
 * @param {string} token
 * @return {boolean}
 */
function hasAlreadyResponded(token) {
  var inv = getInviteeByToken(token);
  if (!inv) return false;
  var s = String(inv.status || '').trim();
  if (!s) return false;
  return s !== '未回答';
}

/**
 * @return {{
 *   attend: number,
 *   absent: number,
 *   pending: number,
 *   unanswered: number,
 *   total: number
 * }}
 */
function getResponseCount() {
  var sheet = getInviteesSheet();
  var lastRow = sheet.getLastRow();
  var out = { attend: 0, absent: 0, pending: 0, unanswered: 0, total: 0 };
  if (lastRow < 2) return out;
  var vals = sheet.getRange(2, COL_STATUS, lastRow, COL_STATUS).getValues();
  for (var i = 0; i < vals.length; i++) {
    out.total++;
    var s = String(vals[i][0] || '').trim();
    if (!s || s === '未回答') {
      out.unanswered++;
    } else if (s === '参加') {
      out.attend++;
    } else if (s === '不参加') {
      out.absent++;
    } else if (s === '保留') {
      out.pending++;
    } else {
      out.unanswered++;
    }
  }
  return out;
}

/**
 * フォームの出欠文言を名簿用に正規化
 * @param {string} raw
 * @return {string}
 */
function normalizeAttendance_(raw) {
  var t = String(raw || '').trim();
  if (t === '参加します') return '参加';
  if (t === '参加できません') return '不参加';
  if (t === 'まだ分かりません') return '保留';
  return t;
}

/**
 * @typedef {{
 *   status: string,
 *   guests: string,
 *   afterparty: string,
 *   allergy: string,
 *   comment: string
 * }} ResponsePayload
 */
