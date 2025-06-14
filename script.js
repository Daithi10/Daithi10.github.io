document.addEventListener("DOMContentLoaded", () => {
  // === QUIZ SECTION ===
  const quizForm = document.getElementById("sportsQuizForm");
  const quizResult = document.getElementById("quizResult");
  const extraContent = document.getElementById("extraContent");
  const resetQuizBtn = document.getElementById("resetQuizBtn");

  if (quizForm && quizResult && extraContent && resetQuizBtn) {
    quizForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const questions = ["q1", "q2", "q3"];
      const answers = { q1: "11", q2: "France", q3: "40" };
      let score = 0;
      let allAnswered = true;

      questions.forEach((q) => {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        const questionBlock = document.querySelector(`input[name="${q}"]`)?.closest(".quiz-question");

        if (!selected) {
          allAnswered = false;
          if (questionBlock) questionBlock.classList.add("unanswered");
        } else {
          if (questionBlock) questionBlock.classList.remove("unanswered");
          if (selected.value === answers[q]) score++;
        }
      });

      if (!allAnswered) {
        quizResult.textContent = "Please answer all questions!";
        quizResult.className = "result error";
        return;
      }

      const messages = [
        "Nice try! Keep training!",
        "Great effort! You’re a pro!",
        "Awesome! You really know your sports!",
        "Legendary! True MVP!",
      ];
      const colors = ["low", "medium", "high", "top"];

      quizResult.textContent = `You scored ${score} out of 3. ${messages[score]}`;
      quizResult.className = `result ${colors[score]}`;

      // Show fun fact button
      extraContent.innerHTML = "";

      const factBtn = document.createElement("button");
      factBtn.textContent = "Show me a fun sports fact!";
      factBtn.classList.add("fact-button");
      extraContent.appendChild(factBtn);

      const factDiv = document.createElement("div");
      factDiv.classList.add("fact");
      extraContent.appendChild(factDiv);

      factBtn.addEventListener("click", () => {
        const facts = [
          "The fastest goal in World Cup history was scored after just 11 seconds!",
          "Basketball was invented in 1891 by James Naismith.",
          "The longest tennis match lasted 11 hours and 5 minutes!",
          "On 28 May 2025 Knocknacarra FC beat Loughrea FC 6-2 in the Galway FA Over 35's!",
        ];
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        factDiv.textContent = randomFact;
      });

      const userName = prompt("Enter your name for the leaderboard:");
      if (userName) {
        updateLeaderboard(userName.trim(), score);
      }
    });

    resetQuizBtn.addEventListener("click", function () {
      quizForm.reset();
      quizResult.textContent = "";
      quizResult.className = "result";
      extraContent.innerHTML = "";
      const questions = quizForm.querySelectorAll(".quiz-question");
      questions.forEach(q => q.classList.remove("unanswered"));
    });

    function updateLeaderboard(name, score) {
      const leaderboard = JSON.parse(localStorage.getItem("quizLeaderboard")) || [];
      leaderboard.push({ name, score });
      leaderboard.sort((a, b) => b.score - a.score);
      localStorage.setItem("quizLeaderboard", JSON.stringify(leaderboard.slice(0, 5)));
      showLeaderboard();
    }

    function showLeaderboard() {
      const leaderboard = JSON.parse(localStorage.getItem("quizLeaderboard")) || [];
      const board = document.createElement("div");
      board.classList.add("leaderboard");

      board.innerHTML = "<h3>🏅 Top Scores</h3><ol>" +
        leaderboard.map(e => `<li>${e.name}: ${e.score}/3</li>`).join("") +
        "</ol>";
      extraContent.appendChild(board);
    }
  }

  // === FAN POLL SECTION ===
  const fanPollForm = document.getElementById("fanPollForm");
  const pollResults = document.getElementById("pollResults");
  const resetPoll = document.getElementById("resetPoll");

  if (fanPollForm && pollResults && resetPoll) {
    fanPollForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const selected = document.querySelector('input[name="player"]:checked');
      if (!selected) {
        pollResults.innerHTML = "<p style='color:red;'>Please select a player to vote!</p>";
        return;
      }

      const choice = selected.value;
      const votes = JSON.parse(localStorage.getItem("fanVotes")) || {};
      votes[choice] = (votes[choice] || 0) + 1;
      localStorage.setItem("fanVotes", JSON.stringify(votes));
      displayPollResults();
    });

    resetPoll.addEventListener("click", () => {
      localStorage.removeItem("fanVotes");
      pollResults.innerHTML = "";
      fanPollForm.reset();
    });

    function displayPollResults() {
      const votes = JSON.parse(localStorage.getItem("fanVotes")) || {};
      const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

      if (totalVotes === 0) {
        pollResults.innerHTML = "<p>No votes yet.</p>";
        return;
      }

      let resultHTML = "<h4>Fan Favorites:</h4>";
      for (let [player, count] of Object.entries(votes)) {
        const percent = ((count / totalVotes) * 100).toFixed(1);
        resultHTML += `<div>${player}: ${count} votes (${percent}%)</div>`;
      }

      pollResults.innerHTML = resultHTML;
    }

    displayPollResults(); // Load existing poll results
  }

  // === FAN COMMENTS SECTION ===
  const fanCommentForm = document.getElementById("fanCommentForm");
  const fanMessages = document.getElementById("fanMessages");

  if (fanCommentForm && fanMessages) {
    fanCommentForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("fanName").value.trim();
      const message = document.getElementById("fanMessage").value.trim();

      const inappropriateWords = ["hate", "kill", "stupid", "idiot", "dumb"];
      const containsInappropriate = inappropriateWords.some(word => message.toLowerCase().includes(word));

      if (!name || !message) {
        alert("Please enter both your name and a message.");
        return;
      }

      if (containsInappropriate) {
        alert("Your message contains inappropriate language and cannot be posted.");
        return;
      }

      const entry = document.createElement("p");
      entry.innerHTML = `<strong>${name}:</strong> ${message}`;
      fanMessages.appendChild(entry);

      this.reset();
    });
  }

  // === CONTACT FORM VALIDATOR ===
  const form = document.getElementById("contactForm");
  const emailInput = document.getElementById("email");
  const status = document.getElementById("form-status");

  if (form && emailInput && status) {
    form.addEventListener("submit", function (e) {
      const emailValue = emailInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(emailValue)) {
        e.preventDefault();
        status.textContent = "Please enter a valid email address.";
        status.style.color = "red";
      } else {
        status.textContent = "";
      }
    });
  }

  // === TRANSFER NEWS SECTION ===
  const transferNewsData = {
    arsenal: "Arsenal signs a new striker from Portugal.",
    chelsea: "Chelsea interested in a Ligue 1 defender.",
    liverpool: "Liverpool confirm two midfield departures.",
    "man-city": "Manchester City secure €60m deal for a Spanish winger.",
    "man-united": "Manchester United part ways with two defenders.",
    spurs: "Tottenham Hotspur make a bid for Serie A midfielder.",
  };

  const clubSelect = document.getElementById("clubSelect");
  const newsBox = document.getElementById("transferNews");

  if (clubSelect && newsBox) {
    clubSelect.addEventListener("change", function () {
      const selectedClub = this.value;
      if (selectedClub && transferNewsData[selectedClub]) {
        newsBox.textContent = transferNewsData[selectedClub];
      } else if (selectedClub) {
        newsBox.textContent = "No current transfer news for this club.";
      } else {
        newsBox.textContent = "";
      }
    });
  }
});