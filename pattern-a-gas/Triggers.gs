/**
 * G-10: 定期実行（時間主導型トリガーで dailyCheck を指定）
 */

var PROP_LAST_AUTO_REMINDER_DAY_ = 'LAST_AUTO_REMINDER_DAY';

/**
 * 締切3日前・1日前に未回答者へ自動リマインド（1日1回まで）。
 * 集計・色分けも更新する。
 */
function dailyCheck() {
  try {
    if (isDeadlinePassed()) {
      Logger.log('dailyCheck: 締切後のためリマインドなし');
      updateSummary();
      colorizeAllRows();
      return;
    }

    var config = getConfig();
    var deadline = config['回答締切日'];
    if (!(deadline instanceof Date) || isNaN(deadline.getTime())) {
      Logger.log('dailyCheck: 回答締切日が不正');
      updateSummary();
      colorizeAllRows();
      return;
    }

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var d = new Date(deadline.getTime());
    d.setHours(0, 0, 0, 0);
    var daysLeft = Math.ceil((d - today) / (1000 * 60 * 60 * 24));

    var tz = Session.getScriptTimeZone();
    var todayStr = Utilities.formatDate(new Date(), tz, 'yyyyMMdd');
    var props = PropertiesService.getScriptProperties();
    var lastSent = props.getProperty(PROP_LAST_AUTO_REMINDER_DAY_);

    if ((daysLeft === 3 || daysLeft === 1) && lastSent !== todayStr) {
      sendReminderMails();
      props.setProperty(PROP_LAST_AUTO_REMINDER_DAY_, todayStr);
      Logger.log('dailyCheck: 自動リマインド送信（daysLeft=' + daysLeft + '）');
    }

    updateSummary();
    colorizeAllRows();
  } catch (err) {
    Logger.log('dailyCheck エラー: ' + err);
    throw err;
  }
}
