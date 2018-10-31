window.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
        console.log(tabs);
        if (tabs[0].url.includes("sports.news.naver.com/sports/new/live/index.nhn?category=kbl&gameId=")) {
            let msg = { event: "click" };
            console.log(tabs[0]);
            chrome.tabs.sendMessage(tabs[0].id, msg, showArticle);
        }
        else {
            alert("여기 말고 네이버 스포츠 - 농구 - 일정/결과 - 경기기록 가셔야 돼요!");
        }
    });
  });

function showArticle(data) {
    console.log(data);
    if (!data || data.event != "write") {
        alert("이런, 문제가 생겼네요. 죄송합니다! 새로고침하고 다시 클릭 해주세요!");
        return;
    }
    
    // extract variables
    let lostTeam = data.gameInfo.lostTeam;
    let wonTeam = data.gameInfo.wonTeam;
    let ls;

    // title
    ls = document.querySelectorAll("#title > span");
    if (data.gameInfo.isExtended) {
        show( ls[0] );
    }
    else if (data.gameInfo.isTurnaround) {
        show( ls[1] );
    }
    else if (lostTeam.vip.score >= 15) {
        show( ls[2] );
    }
    else {
        show( ls[3] );
    }

    // general
    ls = document.querySelectorAll("#general > span");
    if (data.gameInfo.isTurnaround) {
        if (lostTeam.side == 1)
            show( ls[0] );
        else if (lostTeam.side == 2)
            show( ls[1] );
    }
    else {
        if (lostTeam.side == 1)
            show( ls[2] );
        else if (lostTeam.side == 2)
            show( ls[3] );
    }

    // basic
    ls = document.querySelectorAll("#basic > span");
    if (wonTeam.score - lostTeam.score >= 15)
        show( ls[0] );
    else
        show( ls[1] );

    // history
    ls = document.querySelectorAll("#history > span");
    let diff = lostTeam.historyWon - lostTeam.historyLost;
    if (lostTeam.historyLost == 0) {
        if (lostTeam.historyWon == 0) {
            show( ls[0] );
        }
        else {
            show( ls[1] );
            show( ls[3] );
        }
    }
    else if (diff <= -5) {
        show( ls[2] );
        show( ls[6] );
    }
    else if (diff <= 0) {
        show (ls[5]);
    }
    else {
        show(ls[4]);
    }

    // quarter1 & quarter2
    ls = document.querySelectorAll("#q1 > span");
    let ls2 = document.querySelectorAll("#q2 > span");
    if (lostTeam.quarters.q1 >= wonTeam.quarters.q1) {
        show( ls[0] );
        if (lostTeam.quarters.q2 >= wonTeam.quarters.q2) {
            show( ls2[0] );
        }
        else {
            show( ls2[1] );
        }
    }
    else {
        show( ls[1] );
        if (lostTeam.quarters.q2 >= wonTeam.quarters.q2) {
            show( ls2[2] );
        }
        else {
            show( ls2[3] );
        }
    }

    // quarter3
    ls = document.querySelectorAll("#q3 > span");
    if (lostTeam.quarters.q3 >= wonTeam.quarters.q3) {
        show( ls[0] );
    }
    else {
        show( ls[1] );
    }

    // quarter4 and extended quarter
    ls = document.querySelectorAll("#q4 > span");
    
    if (!data.gameInfo.isExtended) {
        show( ls[0] );
    }
    else {
        show( ls[1] );
        ls = document.querySelectorAll("#q5 > span");

        if (wonTeam.quarters.q5 - lostTeam.quarters.q5 < 8) {
            show( ls[0] );
        }
        else
            show( ls[1] );
    }
    
    // vip
    ls = document.querySelectorAll("#vip > span");
    if (!lostTeam.vip.score) {
        show( ls[0] );
    }
    else if (lostTeam.vip.score >= 15) {
        show( ls[1] );
    }
    else if (lostTeam.vip.score >= 8) {
        show( ls[2] );
    }
    else {
        show( ls[3] );
    }

    // reaction
    show( document.querySelector("#reaction span") );
    
    // show the words
    inject("date", data.gameInfo.date);
    inject("place", data.gameInfo.place);
    inject("league", data.gameInfo.league);

    inject("lostTeamName", lostTeam.name);
    inject("wonTeamName", wonTeam.name);
    inject("lostTeamScore", lostTeam.score);
    inject("wonTeamScore", wonTeam.score);

    inject("historyWon", lostTeam.historyWon);
    inject("historyWonPlusOne", parseInt(lostTeam.historyWon) + 1);
    inject("historyLost", lostTeam.historyLost);

    inject("q1", lostTeam.quarters.q1);
    inject("q4", lostTeam.quarters.q4);
    inject("wonTeam-q4", wonTeam.quarters.q4);
    inject("wonTeam-q5", wonTeam.quarters.q5);

    inject("vip", lostTeam.vip.name);
    inject("vipScore", lostTeam.vip.score);

    getJosa("ulul", "을/를");
    getJosa("unun", "은/는");
    getJosa("iga", "이/가");

    // remove loading
    document.querySelector("#load").style.opacity = 0
    
}

function show(ele) {
    ele.classList.add("shown");
}

function inject(className, word) {
    if (!document.querySelector(".shown ." + className)) return;
    Array.from( document.querySelectorAll(".shown ." + className) ).forEach(function(e) {
        e.innerText = word;
    })
}

function getJosa(className, type) {
    if (!document.querySelector(".shown ." + className)) return;

    Array.from( document.querySelectorAll(".shown ." + className) ).forEach(function(e) {
        e.innerText = Josa.r(e.innerText, type);
    })
}