(function () {
  const choices = document.querySelectorAll(".choice-item");
  const scoreDiv = document.querySelector(".header-scoreBox_score");
  const resultDiv = document.querySelector(".gameResult");
  const result = document.querySelector(".gameResult-text");
  const restart = document.querySelector(".gameResult-button");
  const playDiv = document.querySelector(".play");
  const houseChoiceImg = document.querySelector(".play-houseChoice_img");
  const myChoiceImg = document.querySelector(".play-myChoice_img");
  const choiceDiv = document.querySelector(".choice");
  const VARIANTS = [
    {
      name: "rock",
      beats: "scissors",
    },
    {
      name: "paper",
      beats: "rock",
    },
    {
      name: "scissors",
      beats: "paper",
    },
    {
      name: "lizard",
      beats: "spock",
    },
    {
      name: "spock",
      beats: "scissors",
    },
    {
      name: "scissors",
      beats: "lizard",
    },
    {
      name: "paper",
      beats: "spock",
    },
    {
      name: "rock",
      beats: "lizard",
    },
    {
      name: "lizard",
      beats: "paper",
    },
    {
      name: "spock",
      beats: "rock",
    },
  ];

  choices.forEach((choice) => {
    choice.addEventListener("click", play);
  });

  function play(e) {
    choiceDiv.style.display = "none";
    restart.style.display = "block";
    playDiv.style.display = "flex";
    resultDiv.style.display = "flex";
    const myChoice = e.target.id;
    myChoiceImg.style.backgroundColor = "#fff";
    myChoiceImg.classList.add(myChoice);
    const variants = VARIANTS.filter((v) => v.name === myChoice);
    const houseChoice = getHouseChoice();
    const winner = getWinner(myChoice, houseChoice, variants);

    setTimeout(() => {
      showHouseChoice(houseChoice);
      setTimeout(() => {
        showWinner(winner, +localStorage.score);
      }, 1200);
    }, 800);
  }
  function getHouseChoice() {
    const randomIndex = Math.floor(Math.random() * VARIANTS.length);
    return VARIANTS[randomIndex].name;
  }
  function showHouseChoice(houseChoice) {
    houseChoiceImg.classList.add(houseChoice);
    houseChoiceImg.style.backgroundColor = "#fff";
  }
  function getWinner(myChoice, houseChoice, variants) {
    if (myChoice === houseChoice) return "draw";
    if (variants.find((v) => v.beats === houseChoice)) return "meWinner";
    else return "houseWinner";
  }

  function updateScore(value) {
    if (typeof Storage !== "undefined") {
      if (localStorage.score) {
        let scoreNum = +localStorage.getItem("score") + value;
        localStorage.setItem("score", scoreNum + "");
      } else {
        localStorage.setItem("score", "0");
      }
      scoreDiv.innerHTML = localStorage.getItem("score");
    } else {
      scoreDiv.innerHTML = "Sorry";
    }
  }

  function showWinner(winner, score) {
    if (winner === "meWinner") {
      result.innerHTML = "You win :)";
      updateScore(1);
    }
    if (winner === "houseWinner") {
      result.innerHTML = "You lose :(";
      if (+localStorage.score > 0) {
        updateScore(-1);
      }
    }
    if (winner === "draw") {
      result.innerHTML = "It's a draw!";
    }
  }
  restart.addEventListener("click", restartGame);
  restart.addEventListener("click", updateScore(0));
  function restartGame() {
    myChoiceImg.classList.remove(
      myChoiceImg.classList[myChoiceImg.classList.length - 1]
    );
    houseChoiceImg.classList.remove(
      houseChoiceImg.classList[houseChoiceImg.classList.length - 1]
    );
    houseChoiceImg.style.backgroundColor = "hsl(240, 65%, 13%)";
    result.innerHTML = "";
    choiceDiv.style.display = "flex";
    restart.style.display = "none";
    playDiv.style.display = "none";
    resultDiv.style.display = "none";
  }
})();
