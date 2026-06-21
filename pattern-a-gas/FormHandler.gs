/**
 * G-4: フォーム回答トリガー（スプレッドシート「フォーム送信時」）
 *
 * Gmail で確認メールを送るため、トリガーは「インストール可能トリガー」で作成すること
 * （編集 → 現在のプロジェクトのトリガー → フォーム送信時 → onFormSubmit）。
 */

/**
 * スプレッドシートに紐づくフォームで回答が追加されたときに実行する。
 * @param {*} e フォーム送信イベント（range を使用）
 */
function onFormSubmit(e) {
  try {
    var sheet = e.range.getSheet();
    if (sheet.getName() !== SHEET_RESPONSES) {
      Logger.log('onFormSubmit: 対象外シートのためスキップ');
      return;
    }
    var row = e.range.getRow();
    if (row < 2) return;

    var logRow = sheet.getRange(row, 1, row, LOG_PROCESSED).getValues()[0];
    var token = String(logRow[LOG_TOKEN - 1] || '').trim();

    if (isDeadlinePassed()) {
      sheet.getRange(row, LOG_PROCESSED).setValue('❌ 期限切れ');
      Logger.log('onFormSubmit: 締切後の回答を拒否');
      return;
    }

    if (!token) {
      sheet.getRange(row, LOG_PROCESSED).setValue('不正なトークン');
      Logger.log('onFormSubmit: トークン空');
      return;
    }

    var inv = getInviteeByToken(token);
    if (!inv) {
      sheet.getRange(row, LOG_PROCESSED).setValue('トークン不一致');
      Logger.log('onFormSubmit: トークン不一致');
      return;
    }

    var statusRaw = logRow[LOG_STATUS - 1];
    var status = normalizeAttendance_(statusRaw);
    var responseData = {
      status: status,
      guests: String(logRow[LOG_GUESTS - 1] || ''),
      afterparty: String(logRow[LOG_AFTERPARTY - 1] || ''),
      allergy: String(logRow[LOG_ALLERGY - 1] || ''),
      comment: String(logRow[LOG_COMMENT - 1] || ''),
    };

    updateInvitee(token, responseData);
    updateSummary();
    colorizeRow(inv.row, status);

    sendConfirmationMail(inv, status, responseData.comment);

    sheet.getRange(row, LOG_PROCESSED).setValue('✅ 処理済');
  } catch (err) {
    Logger.log('onFormSubmit エラー: ' + err);
    try {
      var row = e.range.getRow();
      e.range.getSheet().getRange(row, LOG_PROCESSED).setValue('エラー: ログ参照');
    } catch (ignore) {}
    throw err;
  }
}
