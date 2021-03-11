function setTrigger(){

  //曜日毎のタイマーの設定
  const timers = {
    // "日": [ [7, 4], [7, 34] ],
    "月": [ [7, 4], [7, 34] ],
    "火": [ [7, 4], [7, 34] ],
    "水": [ [7, 4], [7, 34] ],
    "木": [ [7, 4], [7, 34] ],
    "金": [ [7, 4], [7, 34] ],
    // "土": [ [7, 4], [7, 34] ]
  }

  //今日の曜日を取得
  const date = new Date();
  const dayOfWeekNum = date.getDay() ;
  dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeekNum] ;

  //今日のトリガーを設定
  for(let timer of timers[dayOfWeekStr]){
    let time = new Date();
    time.setHours(timer[0]);
    time.setMinutes(timer[1]);
    //新しいトリガーを作成
    ScriptApp.newTrigger('getDelayInfo').timeBased().at(time).create();
  }
}

function delTrigger() {
  //現在のプロジェクトのトリガーすべてを配列で取得
  const triggers = ScriptApp.getProjectTriggers();
  for(const trigger of triggers){
    if(trigger.getHandlerFunction() == "getDelayInfo"){
      ScriptApp.deleteTrigger(trigger);
    }
  }
}