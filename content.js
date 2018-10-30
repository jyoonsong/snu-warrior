(function() {
    chrome.runtime.onMessage.addListener(onMessage);

    function onMessage(data, sender) {
        console.log("received " + data.msg);

        // game and league info
        let infos = document.getElementById("game_date").innerText.split(" ");

        let date = infos[1].replace(".", "") + "월 " + infos[2] + "일";
        let place = infos[infos.length - 1];
        let league = document.querySelector(".wordkbl_header_wrap h3").innerText;

        // calc loser and winner
        let hometeamScore = parseInt( document.querySelector("#side1_score").innerHTML ),
            visitteamScore = parseInt( document.querySelector("#side2_score").innerHTML );

        let lostTeam = {
            type : "visit",
            ele : document.querySelector(".word_lineup_visit"),
            score : visitteamScore
        }
        let wonTeam = {
            type : "home",
            ele : document.querySelector(".word_lineup_home"),
            score : hometeamScore
        };

        if (hometeamScore < visitteamScore) {
            let tmp = lostTeam;
            lostTeam = wonTeam;
            wonTeam = tmp;
        }

        // previous games
        let histories = document.querySelector(".tbl_vsrecord tr.odd ." + lostTeam.type).innerText.replace("패", "").replace("승", "").split(" ");
        lostTeam.historyWon = histories[0];
        lostTeam.historyLost = histories[1];

        // check vip
        let members = Array.from( lostTeam.ele.querySelectorAll(".tbl_team_lineup tbody tr") );
        let max = 0;
        let vip = -1;
        members.forEach(function(ele, i) {
            let score = parseInt( ele.querySelector(".score strong").innerHTML );
            if (max < score) {
                vip = i;
            }
        });
        alert(members[vip].querySelector(".name a").innerHTML);
    }

})();