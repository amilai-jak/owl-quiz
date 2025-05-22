async function resultRender() {
    const leaderboardData = await fetch("https://kool.krister.ee/chat/owlquiz");
    const leaderboardDataJson = await leaderboardData.json();
    const leaderboard = document.getElementById("quiz-answers");
    leaderboard.innerHTML = ""

    leaderboardDataJson.forEach(element => {
        const user = document.createElement("p");
        user.innerHTML = `username: ${element.username}<br>start: ${element.start}<br>end: ${element.end}`;

        leaderboard.appendChild(user);
    })
}

resultRender();