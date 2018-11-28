(function() {
    if (!chrome.runtime) {
        return;
    }
    chrome.runtime.onMessage.addListener(onMessages);

    function onMessages(data, sender, response) {
        
        let img = document.querySelector(".building-image");
        if (img) {
            for (let i = 0; i < 1000; i++) {
                setTimeout(function() {
                    img.click();
                }, 80*i);
            }
            let m = Array.from(document.querySelectorAll("#detail_outer span.ng-binding"))[2];
            if (!m) {
                chrome.runtime.sendMessage({diff: b-a});
            }
            let a = parseInt( m.innerText );
            for (let i = 0; i <= 50; i++) {
                setTimeout(function() {
                    m = Array.from(document.querySelectorAll("#detail_outer span.ng-binding"))[2];
                    let b = m ? parseInt( m.innerText ) : a;
                    if (b == a) {
                        chrome.runtime.sendMessage({diff: b-a});
                    }
                    a = b;
                }, 2000 + 2000*i);
            }
        }
        
        // response( {event: "write", gameInfo: gameInfo} );
    }

})();

// window.addEventListener('DOMContentLoaded', function () {
//     chrome.tabs.query({
//       active: true,
//       currentWindow: true
//     }, function (tabs) {
//         console.log(tabs);
//         if (tabs[0].url.includes("snuwar.io/locations")) {
//             let msg = { event: "click" };
//             console.log(tabs[0]);
//             chrome.tabs.sendMessage(tabs[0].id, msg, clicker);
//         }
//     });
//   });
