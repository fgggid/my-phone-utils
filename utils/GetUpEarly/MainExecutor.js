let automator = singletonRequire('Automator')
let _widgetUtils = singletonRequire('WidgetUtils')

function MainExecutor() {

  this.exec = function () {
    // 执行主要业务逻辑
    app.startActivity({
      action: 'VIEW',
      data: 'alipays://platformapi/startapp?appId=20000067&url=https%3a%2f%2factivity-alisports.taobao.com%2fgetup',
      //data: 'taobao://activity-alisports.taobao.com/p/taobao/activity/getup_early/m_home.html?game_type=9',
      //data: 'alipays://platformapi/startapp?appId=68687635',
      packageName: ''
    })
    let ret = 0
    let tryCount = 0
    while (!(ret = _widgetUtils.widgetWaiting('已累计.*天早起')) && tryCount++ < 3) {
      sleep(1000)
    }
    sleep(1000)
    automator.clickRandomRegion({ left: 500, top: 850, width: 150, height: 150})

    if (config.auto_lock === true && unlocker.needRelock() === true) {
      debugInfo('重新锁定屏幕')
      automator.lockScreen()
      unlocker.saveNeedRelock(true)
    }
    // 关闭悬浮窗
    FloatyInstance.close()
    flushAllLogs()
    runningQueueDispatcher.removeRunningTask(true)
    exit()
  }
}
module.exports = new MainExecutor()

