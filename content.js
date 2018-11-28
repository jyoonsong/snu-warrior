(function() {
    if (!chrome.runtime) {
        return;
    }
    chrome.runtime.onMessage.addListener(onMessages);

    function onMessages(data, sender, response) {
        
        let rand = Math.floor(Math.random() * 21) - 10; // 0 ~ 20 => -10 ~ 10
        
        let img = document.querySelector(".building-image");
        if (img) {
            // loop for clicks (80~90s)
            for (let i = 0; i < 1000; i++) {
                let time = 80*i + rand;

                setTimeout(function() {
                    img.click();
                }, time);
            }

            // check if it's working
            let m = Array.from(document.querySelectorAll("#detail_outer span.ng-binding"))[2];
            if (!m) {
                chrome.runtime.sendMessage({diff: b-a});
            }
            let a = parseInt( m.innerText );
            for (let i = 0; i <= 22; i++) {
                setTimeout(function() {
                    m = Array.from(document.querySelectorAll("#detail_outer span.ng-binding"))[2];
                    let b = m ? parseInt( m.innerText ) : a;
                    if (b == a) {
                        chrome.runtime.sendMessage({diff: b-a});
                    }
                    a = b;
                }, 2000 + 4000*i);
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
