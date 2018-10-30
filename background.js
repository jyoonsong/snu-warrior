// chrome.runtime.onInstalled.addListener(function() {
//     chrome.contextMenus.create({
//       "id": "basketballJournalist",
//       "title": "농구 기사 써주세요",
//       "contexts": ["selection"]
//     });
// });

chrome.runtime.onMessage.addListener(function (message, sender) {
    chrome.tabs.executeScript({
        file: "write.js"
    });
    console.log(message);
    
 });


chrome.browserAction.onClicked.addListener(function(tab) {
    buttonClicked(tab);
 });

 function buttonClicked(tab) {
     if (tab.url.includes("sports.news.naver.com/sports/new/live/index.nhn?category=kbl&gameId=")) {
        let msg = { message: "click" };
        chrome.tabs.sendMessage(tab.id, msg);
     }
     else {
         alert("여기 말고 네이버 스포츠 가셔야 돼요!");
     }
 }
