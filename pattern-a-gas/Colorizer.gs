/**
 * G-7: 色分け・集計シート更新
 */

var COLORS = {
  attend: { bg: '#e6f4ea', text: '#1e8e3e' },
  absent: { bg: '#fce8e6', text: '#d93025' },
  pending: { bg: '#fef3e2', text: '#e37400' },
  unanswered: { bg: '#f1f3f4', text: '#5f6368' },
};

/**
 * @param {number} row
 * @param {string} status
 */
function colorizeRow(row, status) {
  var sheet = getInviteesSheet();
  var key = statusToColorKey_(status);
  var color = COLORS[key];
  if (!color) {
    color = COLORS.unanswered;
  }
  sheet.getRange(row, 1, row, COL_LAST_RESP).setBackground(color.bg);
  sheet.getRange(row, COL_STATUS).setFontColor(color.text);
  sheet.getRange(row, COL_STATUS).setFontWeight('bold');
}

/**
 * @param {string} status
 * @return {string}
 */
function statusToColorKey_(status) {
  var s = String(status || '').trim();
  if (s === '参加') return 'attend';
  if (s === '不参加') return 'absent';
  if (s === '保留') return 'pending';
  return 'unanswered';
}

function colorizeAllRows() {
  var sheet = getInviteesSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  for (var r = 2; r <= lastRow; r++) {
    var st = sheet.getRange(r, COL_STATUS).getValue();
    colorizeRow(r, String(st || ''));
  }
  Logger.log('colorizeAllRows: 完了');
}

/**
 * 集計シートを更新（A列ラベル・B列数値想定）
 */
function updateSummary() {
  var summary = getSheet(SHEET_SUMMARY);
  var counts = getResponseCount();
  var sheet = getInviteesSheet();
  var lastRow = sheet.getLastRow();
  var attendWithGuests = 0;
  if (lastRow >= 2) {
    var statusVals = sheet.getRange(2, COL_STATUS, lastRow, COL_STATUS).getValues();
    var guestVals = sheet.getRange(2, COL_GUESTS, lastRow, COL_GUESTS).getValues();
    for (var i = 0; i < statusVals.length; i++) {
      var st = String(statusVals[i][0] || '').trim();
      if (st !== '参加') continue;
      var g = guestVals[i][0];
      attendWithGuests += headcountFromGuestCell_(g);
    }
  }

  var total = counts.total;
  var responded = counts.attend + counts.absent + counts.pending;
  var rate = total === 0 ? 0 : Math.round((responded / total) * 1000) / 10;

  var rows = [
    ['参加', counts.attend],
    ['不参加', counts.absent],
    ['保留', counts.pending],
    ['未回答', counts.unanswered],
    ['総招待者数', total],
    ['参加+同行者合計', attendWithGuests],
    ['回答率', String(rate) + '%'],
  ];

  summary.getRange(1, 1, 7, 2).clearContent();
  summary.getRange(1, 1, 7, 2).clearFormat();
  summary.getRange(1, 1, rows.length, 2).setValues(rows);

  applySummaryRowColor_(summary, 1, 'attend');
  applySummaryRowColor_(summary, 2, 'absent');
  applySummaryRowColor_(summary, 3, 'pending');
  applySummaryRowColor_(summary, 4, 'unanswered');

  Logger.log('updateSummary: 完了');
}

/**
 * 同行者セルから「本人＋同行者」の人数
 * @param {*} cell
 * @return {number}
 */
function headcountFromGuestCell_(cell) {
  var s = String(cell || '').trim();
  if (!s || s === '—') return 1;
  if (/3名以上/.test(s)) return 5;
  var m = s.match(/(\d+)\s*名/);
  if (m) {
    return 1 + Number(m[1]);
  }
  return 1;
}

/**
 * @param {GoogleAppsScript.Spreadsheet.Sheet} summary
 * @param {number} row
 * @param {string} key
 */
function applySummaryRowColor_(summary, row, key) {
  var color = COLORS[key];
  if (!color) return;
  summary.getRange(row, 1, row, 2).setBackground(color.bg);
}
