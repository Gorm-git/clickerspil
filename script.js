"use strict";

let kills = 0;
let hearts = 0;
let gameRunning = false;

window.addEventListener("load", start);

function start() {
  console.log("Hello script.js");
  document.querySelector("#btn_start").addEventListener("click", runGame);
  document.querySelector("#btn_restart").addEventListener("click", runGame);
  document
    .querySelector("#btn_try_again")
    .addEventListener("click", displayStartScreen);
}

function runGame() {
  console.log("game is running");
  gameRunning = true;
  resetHearts();
  resetKills();
  displayGameScreen();

  startTheShow();

  startTime();

  document.querySelector("#audio_game").play();
  document.querySelector("#audio_game").volume = 1;
  document.querySelector("#audio_game").currentTime = 0;

  // mousedown reg
  document
    .querySelector("#zombieContainer1")
    .addEventListener("mousedown", clickZombie);

  document
    .querySelector("#zombieContainer2")
    .addEventListener("mousedown", clickZombie);

  document
    .querySelector("#zombieContainer3")
    .addEventListener("mousedown", clickZombie);

  document
    .querySelector("#zombieContainer4")
    .addEventListener("mousedown", clickZombie);

  document
    .querySelector("#soldierContainer1")
    .addEventListener("mousedown", clickSoldier);

  document
    .querySelector("#soldierContainer2")
    .addEventListener("mousedown", clickSoldier);

  document
    .querySelector("#soldierContainer3")
    .addEventListener("mousedown", clickSoldier);

  document
    .querySelector("#soldierContainer4")
    .addEventListener("mousedown", clickSoldier);

  // restart animations
  document
    .querySelector("#coin1_container")
    .addEventListener("animationiteration", restartRunning);
  document
    .querySelector("#coin2_container")
    .addEventListener("animationiteration", restartRunning);
  document
    .querySelector("#coin3_container")
    .addEventListener("animationiteration", restartRunning);
  document
    .querySelector("#bomb_container")
    .addEventListener("animationiteration", restartRunning);
  document
    .querySelector("#heart_container")
    .addEventListener("animationiteration", restartRunning);
}

function displayStartScreen() {
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function displayRunningScreen() {
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#gameOver").classList.add("hidden");
  document.querySelector("#levelComplete").classList.add("hidden");
}

// Kills og liv
function resetKills() {
  kills = 0;
}

function showKills() {
  console.log("show kills");
  document.querySelector("#zombie_kills").textContent = kills;
}

function zombiesKilled() {
  console.log("Zombie killed");
  kills++;
  console.log(`You have killed ${kills} zombies`);
  showKills();
}

function heartLost() {
  console.log("Heart lost");
  showHeartLost();
  hearts--;
  if (hearts === 0) {
    gameLost;
  }
}

function resetLives() {
  console.log("Hearts have been reset");
  hearts = 3;
  document.querySelector("#heart0").classList.remove("broken_heart");
  document.querySelector("#heart1").classList.remove("broken_heart");
  document.querySelector("#heart2").classList.remove("broken_heart");
  document.querySelector("#heart0").classList.add("active_heart");
  document.querySelector("#heart1").classList.add("active_heart");
  document.querySelector("#heart2").classList.add("active_heart");
}
