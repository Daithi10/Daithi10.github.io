const quizForm = document.getElementById("sportsQuizForm");
const quizResult = document.getElementById("quizResult");
const extraContent = document.getElementById("extraContent");
const resetQuizBtn = document.getElementById("resetQuizBtn");

quizForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const questions = ["q1", "q2", "q3"];
  const answers = { q1: "11", q2: "France", q3: "40" };
  let score = 0;
  let allAnswered = true;

  questions.forEach((q) => {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    const questionBlock = document.querySelector(`input[name="${q}"]`).closest(".quiz-question");

    if (!selected) {
      allAnswered = false;
      questionBlock.classList.add("unanswered");
    } else {
      questionBlock.classList.remove("unanswered");
      if (selected.value === answers[q]) {
        score++;
      }
    }
  });

  if (!allAnswered) {
    quizResult.textContent = "Please answer all questions!";
    quizResult.className = "result error";
    return;
  }

  const messages = [
    "Nice try! Keep training and you’ll be a champ in no time!",
    "Great effort! You’re scoring like a pro!",
    "Awesome! You really know your sports!",
    "Legendary! You crushed this quiz like a true MVP!",
  ];
  const colors = ["low", "medium", "high", "top"]; // used as class names

  quizResult.textContent = `You scored ${score} out of 3. ${messages[score]}`;
  quizResult.className = `result ${colors[score]}`;

  // Clear and show extra content
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

// Leaderboard
function updateLeaderboard(name, score) {
  const leaderboard = JSON.parse(localStorage.getItem("quizLeaderboard")) || [];
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("quizLeaderboard", JSON.stringify(leaderboard.slice(0, 5))); // Top 5
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
const fanPollForm = document.getElementById("fanPollForm");
const pollResults = document.getElementById("pollResults");
const resetPoll = document.getElementById("resetPoll");

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

// Display existing results on page load
displayPollResults();
document.getElementById("fanCommentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("fanName").value.trim();
  const message = document.getElementById("fanMessage").value.trim();
  const fanMessages = document.getElementById("fanMessages");

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
  // Footer placeholder
  // <div id="footer-placeholder"></div>

    // Email validator
    const form = document.getElementById("contactForm");
    const emailInput = document.getElementById("email");
    const status = document.getElementById("form-status");

    form.addEventListener("submit", function (e) {
      const emailValue = emailInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(emailValue)) {
        e.preventDefault(); // Stop form submission
        status.textContent = "Please enter a valid email address.";
        status.style.color = "red";
      } else {
        status.textContent = ""; // Clear error if valid
      }
    })

