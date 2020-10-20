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
];

let index = 0;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    if (changeInfo.status == "complete") {

        let url = tab.url;

        if (!url || url.includes("locations")) {
            chrome.tabs.sendMessage(tab.id, {msg: 'haha'});
        }
        else {
            let changedURL = "https://snuwar.io/locations/" + urls[index];
            index++;
            if (index > 31) index = 0;
            
            chrome.tabs.update(tab.id, {url: changedURL}, function(t) {
                console.log("go to " + index);
            });
        }

    }
    else {
        console.log(changeInfo);
    }
    
});

chrome.runtime.onMessage.addListener(function(data, sender, sendResponse) {
    
    let changedURL = "https://snuwar.io/locations/" + urls[index];
    index++;
    if (index > 31) index = 0;
    
    chrome.tabs.update(sender.tab.id, {url: changedURL}, function(tab) {
        console.log("updated to " + index);
    });
    
});
