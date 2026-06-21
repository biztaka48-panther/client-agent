/**
 * G-9: BOM 付き UTF-8 CSV（トークン・回答 URL は出力しない）
 */

/**
 * 名簿から CSV を作成し Drive ルートに保存して URL を表示する。
 */
function exportResponsesCsv() {
  var config = getConfig();
  var sheet = getInviteesSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 1) {
    SpreadsheetApp.getUi().alert('名簿にデータがありません。');
    return;
  }

  var header = [
    'No',
    '氏名',
    'メールアドレス',
    '電話番号',
    '回答状況',
    '同行者数',
    '支払状況',
    '幹事メモ',
    '最終回答日時',
  ];
  var lines = [header.map(escapeCsvField).join(',')];

  if (lastRow >= 2) {
    var data = sheet.getRange(2, 1, lastRow, COL_LAST_RESP).getValues();
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      var line = [
        row[COL_NO - 1],
        row[COL_NAME - 1],
        row[COL_EMAIL - 1],
        row[COL_PHONE - 1],
        row[COL_STATUS - 1],
        row[COL_GUESTS - 1],
        row[COL_PAYMENT - 1],
        row[COL_MEMO - 1],
        row[COL_LAST_RESP - 1],
      ].map(escapeCsvField);
      lines.push(line.join(','));
    }
  }

  var bom = '\uFEFF';
  var csvContent = bom + lines.join('\r\n');
  var baseName = String(config['イベント名'] || 'イベント').replace(/[\\/:*?"<>|]/g, '_');
  var fileName = baseName + '_回答一覧_' + getDateString() + '.csv';
  var file = DriveApp.createFile(fileName, csvContent, MimeType.CSV);
  Logger.log('CSV保存完了: ' + file.getUrl());
  SpreadsheetApp.getUi().alert('CSVを保存しました。\n' + file.getUrl());
}

/**
 * @param {*} value
 * @return {string}
 */
function escapeCsvField(value) {
  if (value == null || value === '') return '';
  var s;
  if (value instanceof Date && !isNaN(value.getTime())) {
    s = Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy/MM/dd HH:mm');
  } else {
    s = String(value);
  }
  if (/[",\n\r]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

/**
 * @return {string} YYYYMMDD
 */
function getDateString() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd');
}
