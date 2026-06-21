/**
 * G-8: 未回答者・メニュー（onOpen）
 */

/**
 * @typedef {{
 *   name: string,
 *   email: string,
 *   token: string,
 *   url: string
 * }} UnansweredInvitee
 */

/**
 * @return {Array<UnansweredInvitee>}
 */
function getUnansweredInvitees() {
  var sheet = getInviteesSheet();
  var lastRow = sheet.getLastRow();
  var list = [];
  if (lastRow < 2) return list;
  var range = sheet.getRange(2, 1, lastRow, COL_URL);
  var rows = range.getValues();
  for (var i = 0; i < rows.length; i++) {
    var status = String(rows[i][COL_STATUS - 1] || '').trim();
    if (status && status !== '未回答') continue;
    var email = String(rows[i][COL_EMAIL - 1] || '').trim();
    var url = String(rows[i][COL_URL - 1] || '').trim();
    if (!email || !url) continue;
    list.push({
      name: String(rows[i][COL_NAME - 1] || ''),
      email: email,
      token: String(rows[i][COL_TOKEN - 1] || ''),
      url: url,
    });
  }
  return list;
}

/**
 * 未回答者へリマインド（確認ダイアログ付き）
 */
function sendReminderToUnanswered() {
  if (isDeadlinePassed()) {
    SpreadsheetApp.getUi().alert('締切後のためリマインドを送信できません。');
    return;
  }
  var list = getUnansweredInvitees();
  if (list.length === 0) {
    SpreadsheetApp.getUi().alert('未回答者はいません。');
    return;
  }
  var ok = SpreadsheetApp.getUi().alert(
    '未回答者が ' + list.length + ' 名います。催促メールを送信しますか？',
    SpreadsheetApp.getUi().ButtonSet.OK_CANCEL
  );
  if (ok !== SpreadsheetApp.getUi().Button.OK) return;

  var config = getConfig();
  for (var i = 0; i < list.length; i++) {
    sendReminderMail_(list[i], config);
    Utilities.sleep(200);
  }
  SpreadsheetApp.getUi().alert(list.length + ' 名にリマインドメールを送信しました。');
}

function onOpen() {
  setupMenu();
}

function setupMenu() {
  SpreadsheetApp.getUi()
    .createMenu('📋 同窓会管理')
    .addItem('トークン生成（新規）', 'generateTokens')
    .addSeparator()
    .addItem('初回案内メール送信', 'sendInitialMails')
    .addItem('未回答者へリマインド送信', 'sendReminderToUnanswered')
    .addSeparator()
    .addItem('全行を色分け更新', 'colorizeAllRows')
    .addItem('集計シートを更新', 'updateSummary')
    .addSeparator()
    .addItem('CSV出力（Driveに保存）', 'exportResponsesCsv')
    .addToUi();
}
