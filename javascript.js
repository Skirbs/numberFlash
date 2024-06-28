let gameStarted = false;
let numAmtSys = 0;
let currentNumAmt = 0;
let numDelaySys = 0;

let answer = 0;

document.querySelector(".start-btn").addEventListener("click", startGame);
document.querySelector(".show-answer").addEventListener("click", showAnswer);

const numberPop = document.querySelector(".number-pop");

const minNum = document.querySelector(".min-num");
const maxNum = document.querySelector(".max-num");
const numAmt = document.querySelector(".amt-num");
const numDelay = document.querySelector(".num-delay");

minNum.value = localStorage.getItem("minNum", minNum.value);
maxNum.value = localStorage.getItem("maxNum", maxNum.value);
numAmt.value = localStorage.getItem("numAmt", numAmt.value);
numDelay.value = localStorage.getItem("numDelay", numDelay.value);

minNum.addEventListener("focusout", () => {
  localStorage.setItem("minNum", minNum.value);
});
maxNum.addEventListener("focusout", () => {
  localStorage.setItem("maxNum", maxNum.value);
});
numAmt.addEventListener("focusout", () => {
  localStorage.setItem("numAmt", numAmt.value);
});
numDelay.addEventListener("focusout", () => {
  localStorage.setItem("numDelay", numDelay.value);
});

document.addEventListener("keydown", (key) => {
  if (key.key === "s") {
    startGame();
  } else if (key.key === " ") {
    showAnswer();
  }
});

function startGame() {
  if (gameStarted) return;

  numAmtSys = parseFloat(numAmt.value);
  currentNumAmt = 0;
  answer = 0;
  numberPop.style.color = "rgb(243, 243, 243)";
  spawnNumber();
  gameStarted = true;
}

function spawnNumber() {
  if (numAmtSys <= currentNumAmt) {
    return;
  }
  const max = parseFloat(maxNum.value);
  const min = parseFloat(minNum.value);

  const randNum = Math.floor(Math.random() * (max + 1 - min) + min);

  answer += randNum;
  numberPop.innerHTML = randNum;
  numberPop.classList.add("darken-anim");
  currentNumAmt++;
  setTimeout(() => {
    numberPop.classList.remove("darken-anim");
  }, parseFloat(numDelay.value * 100));

  var speech = new SpeechSynthesisUtterance(randNum.toString());
  let range = -(parseFloat(numDelay.value) - 2.2) / 0.194;
  range = range > 10 ? 10 : range;
  range = range < 1 ? 1 : range;
  speech.rate = range;
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);

  if (numAmtSys <= currentNumAmt) {
    var speech = new SpeechSynthesisUtterance("is equals to?");
    speech.rate = 2;
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
    return;
  }

  setTimeout(spawnNumber, parseFloat(numDelay.value * 1000));
}

function showAnswer() {
  if (numAmtSys <= currentNumAmt && gameStarted) {
    numberPop.innerHTML = answer;
    numberPop.style.color = "green";
    gameStarted = false;
  }
}
