(function() {
    chrome.runtime.onMessage.addListener(onMessage);

    function onMessage(data, sender, response) {
        console.log(sender);
        if (data.event != "click") return;

        // game and league info
        let infos = document.getElementById("game_date").innerText.split(" ");

        let gameInfo = {
            date: infos[1].replace(".", "") + "월 " + infos[2] + "일",
            place: infos[infos.length - 1],
            league: document.querySelector(".wordkbl_header_wrap h3").innerText
        };
        
        // calc loser and winner
        let hometeamScore = parseInt( document.querySelector("#side1_score").innerText ),
            visitteamScore = parseInt( document.querySelector("#side2_score").innerText );

        let lostTeam = {
            side : 2,
            type : "visit",
            name : document.getElementById("side2_score_team_name").innerText,
            ele : document.querySelector(".word_lineup_visit"),
            score : visitteamScore
        }
        let wonTeam = {
            side : 1,
            type : "home",
            name : document.getElementById("side1_score_team_name").innerText,
            ele : document.querySelector(".word_lineup_home"),
            score : hometeamScore
        };

        if (hometeamScore < visitteamScore) {
            let tmp = lostTeam;
            lostTeam = wonTeam;
            wonTeam = tmp;
        }

        // per quarter
        lostTeam.quarters = {
            q1: parseInt( document.getElementById("side" + lostTeam.side + "_q1_score").innerText ),
            q2: parseInt( document.getElementById("side" + lostTeam.side + "_q2_score").innerText ),
            q3: parseInt( document.getElementById("side" + lostTeam.side + "_q3_score").innerText ),
            q4: parseInt( document.getElementById("side" + lostTeam.side + "_q4_score").innerText ),
            q5: parseInt( document.getElementById("side" + lostTeam.side + "_x_score").innerText )
        }

        wonTeam.quarters = {
            q1: parseInt( document.getElementById("side" + wonTeam.side + "_q1_score").innerText ),
            q2: parseInt( document.getElementById("side" + wonTeam.side + "_q2_score").innerText ),
            q3: parseInt( document.getElementById("side" + wonTeam.side + "_q3_score").innerText ),
            q4: parseInt( document.getElementById("side" + wonTeam.side + "_q4_score").innerText ),
            q5: parseInt( document.getElementById("side" + wonTeam.side + "_x_score").innerText )
        }

        // isExtended
        gameInfo.isExtended = (lostTeam.quarters.q5 > 0 || wonTeam.quarters.q5 > 0) ? true : false;

        // isTurnaround
        gameInfo.isTurnaround = (lostTeam.quarters.q1 + lostTeam.quarters.q2 > wonTeam.quarters.q1 + wonTeam.quarters.q2) ? true : false;

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

        lostTeam.vip = {
            name: members[vip].querySelector(".name a").innerHTML,
            score: members[vip].querySelector(".score strong").innerHTML
        }

        delete lostTeam.ele;
        delete wonTeam.ele;

        gameInfo.lostTeam = lostTeam;
        gameInfo.wonTeam = wonTeam;

        console.log(gameInfo);

        response( {event: "write", gameInfo: gameInfo} );
    }

})();