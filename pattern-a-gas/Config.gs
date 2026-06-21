/**
 * G-1: 設定・定数（設計書パターンA）
 * 設定シートのA列をキー、B列を値として読み込みます。
 */

var SHEET_INVITEES = '名簿';
var SHEET_RESPONSES = '回答ログ';
var SHEET_CONFIG = '設定';
var SHEET_SUMMARY = '集計';

/** 名簿シート列（A=1） */
var COL_NO = 1;
var COL_NAME = 2;
var COL_EMAIL = 3;
var COL_PHONE = 4;
var COL_TOKEN = 5;
var COL_URL = 6;
var COL_STATUS = 7;
var COL_GUESTS = 8;
var COL_PAYMENT = 9;
var COL_MEMO = 10;
var COL_LAST_RESP = 11;

/** 回答ログ列 */
var LOG_TIMESTAMP = 1;
var LOG_TOKEN = 2;
var LOG_STATUS = 3;
var LOG_GUESTS = 4;
var LOG_AFTERPARTY = 5;
var LOG_ALLERGY = 6;
var LOG_COMMENT = 7;
var LOG_PROCESSED = 8;

/**
 * 設定シートを読み込み、キー→値のオブジェクトを返す。
 * 「回答締切日」は Date に正規化する。
 */
function getConfig() {
  var sheet = getSheet(SHEET_CONFIG);
  var lastRow = sheet.getLastRow();
  var config = {};
  if (lastRow < 2) {
    Logger.log('getConfig: 設定シートにデータがありません');
    return config;
  }
  var data = sheet.getRange(2, 1, lastRow, 2).getValues();
  for (var i = 0; i < data.length; i++) {
    var key = String(data[i][0] || '').trim();
    if (!key) continue;
    var raw = data[i][1];
    if (key === '回答締切日') {
      config[key] = parseConfigDate_(raw);
    } else {
      config[key] = raw;
    }
  }
  Logger.log('getConfig: 読み込み ' + Object.keys(config).length + ' 件');
  return config;
}

/**
 * @param {string} name
 * @return {GoogleAppsScript.Spreadsheet.Sheet}
 */
function getSheet(name) {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    throw new Error('シートが見つかりません: ' + name);
  }
  return sh;
}

function getInviteesSheet() {
  return getSheet(SHEET_INVITEES);
}

function getResponsesSheet() {
  return getSheet(SHEET_RESPONSES);
}

/**
 * 締切日の「翌日」0時以降なら true（締切当日は false）。
 */
function isDeadlinePassed() {
  var config = getConfig();
  var deadline = config['回答締切日'];
  if (!(deadline instanceof Date) || isNaN(deadline.getTime())) {
    Logger.log('isDeadlinePassed: 回答締切日が不正のため false');
    return false;
  }
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var d = new Date(deadline.getTime());
  d.setHours(0, 0, 0, 0);
  return today > d;
}

/**
 * @param {*} raw
 * @return {Date}
 */
function parseConfigDate_(raw) {
  if (raw instanceof Date && !isNaN(raw.getTime())) {
    return raw;
  }
  var s = String(raw || '').trim();
  if (!s) {
    return new Date(NaN);
  }
  var parsed = new Date(s);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }
  var m = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
  if (m) {
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  }
  return new Date(NaN);
}

/**
 * 表示用に日付・値を整形
 * @param {*} v
 * @return {string}
 */
function formatConfigValue_(v) {
  if (v instanceof Date && !isNaN(v.getTime())) {
    return Utilities.formatDate(v, Session.getScriptTimeZone(), 'yyyy/MM/dd');
  }
  return v == null ? '' : String(v);
}
