function getDelayInfo() {
  //電車遅延情報をJSON形式で取得
  let json = JSON.parse(UrlFetchApp.fetch("https://tetsudo.rti-giken.jp/free/delay.json").getContentText());
  //路線名を指定
  let lineName = "";
  //遅延を知りたい路線名
  let noticeLines = ['琵琶湖線', 'JR京都線', 'JR神戸線'] 
  //メッセージ本文
  let messageBody="";

  for(let obj of json){

    //指定した路線名と運営会社名に一致する遅延情報を取得
    for(let noticeLine of noticeLines){
      if(obj.name === noticeLine){
  
        messageBody += `${noticeLine} `;
      }
    }
  }

  if(messageBody){ 
    messageBody += 'が遅延しています'
    //遅延情報をLINEに送信
    sendHttpPost(messageBody);
  } else {
    //遅延情報をLINEに送信
    messageBody = '遅延情報はありません'
    sendHttpPost(messageBody);
  }
}
 
function sendHttpPost(messageBody){
  //アクセストークンを設定
  let accessToken = get_property('accessToken');
  let userId = get_property('userId');

  let postData = {
    'to': userId,
    'messages': [
      {
        'type': 'text',
        'text': messageBody
      }
    ]
  };
  
  //LINE に送るリクエストを設定
  let options = {
    "method"  : "post",
    "payload" : JSON.stringify(postData),
    "headers" : {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ accessToken}
  };
 
   //リクエスト送信
   UrlFetchApp.fetch("https://api.line.me/v2/bot/message/push",options);
}