const urls = [
    "beodulgol",
    "56",
    "75_1",
    "38",
    "131",
    "main_stadium",
    "jahayeon",
    "main_gate",
    "67",
    "83",
    "220",
    "74",
    "4",
    "14",
    "63",
    "44_1",
    "100",
    "500",
    "102",
    "200",
    "28",
    "62",
    "30_2",
    "105",
    "12",
    "58",
    "301",
    "50_51",
    "32_1",
    "16",
    "61",
    "43_1"
]
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    console.log(changeInfo.status);
    console.log(tab.url);
    
    if (changeInfo.status == "complete") {

        let url = tab.url;

        if (!url || url.includes("locations")) {
            chrome.tabs.sendMessage(tab.id, {msg: 'haha'});
        }
        else {
            let changedURL, rand;
            rand = Math.floor(Math.random() * 32);
            changedURL = "https://snuwar.io/locations/" + urls[rand];
            
            chrome.tabs.update(tab.id, {url: changedURL}, function(t) {
                console.log("go to " + rand);
            });
        }

          
        
    }
    
});

chrome.runtime.onMessage.addListener(function(data, sender, sendResponse) {
    
    let changedURL, rand;
    do {
        rand = Math.floor(Math.random() * 32);
        changedURL = "https://snuwar.io/locations/" + urls[rand];
    } while (sender.tab.url.includes(urls[rand]));
    
    chrome.tabs.update(sender.tab.id, {url: changedURL}, function(tab) {
        console.log("updated to " + rand);
    });

    // console.log(data);

    // let time = 15000;
    // if (data.diff == 0) {
    //     time = 50;
    // }

    // setTimeout(function() {
    //     // let changedURL = sender.tab.url;
    //     // if (!sender.tab.url.includes("locations")) {
    //         let rand = Math.floor(Math.random() * 22);
    //         changedURL = "https://snuwar.io/locations/" + urls[rand];
    //     // }
    //     chrome.tabs.update(sender.tab.id, {url: changedURL}, function(tab) {
    //         console.log("updated to " + tab.url);
    //     });
    // }, time);
    
});
