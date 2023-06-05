"use strict";

let kills = 0;
let HP = 0;
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
//The game is now running
function runGame() {
  console.log("game is running");
  gameRunning = true;
  resetHP();
  resetKills();
  displayRunningScreen();

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
    .querySelector("#zombieContainer1")
    .addEventListener("animationiteration", restartRunning);
  document
    .querySelector("#zombieContainer2")
    .addEventListener("animationiteration", restartRunning);
  document
    .querySelector("#zombieContainer3")
    .addEventListener("animationiteration", restartRunning);
  document
    .querySelector("#zombieContainer4")
    .addEventListener("animationiteration", restartRunning);
  document
    .querySelector("#soldierContainer1")
    .addEventListener("animationiteration", restartRunning);
  document
    .querySelector("#soldierContainer2")
    .addEventListener("animationiteration", restartRunning);
  document
    .querySelector("#soldierContainer3")
    .addEventListener("animationiteration", restartRunning);
  document
    .querySelector("#soldierContainer4")
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

function clickZombie() {
  console.log("Shoot Zombie");
  // No more multi click
  let zombie = this;
  zombie.removeEventListener("mousedown", clickZombie);

  zombie.classList.add("paused");

  // deadsprite animation
  zombie.querySelector("img").classList.add("deadSprite");

  zombie.addEventListener("animationend", zombieGone);
  document.querySelector("#audio_zombie4").currentTime = 0;
  document.querySelector("#audio_zombie4").play();

  document.querySelector("audio_gunshot").currentTime = 0;
  document.querySelector("audio_gunshot").play();

  zombiesKilled();
}

function zombieGone() {
  console.log("Zombie died, tragic");
  let zombie = this;

  zombie.removeEventListener("animationend", zombieGone);

  zombie.querySelector("img").classList.remove("deadSprite");

  zombie.classList.remove("paused");

  zombie.addEventListener("mousedown", clickZombie);
}

function clickSoldier() {
  console.log("Shoot Zombie");
  // No more multi click
  let soldier = this;
  soldier.removeEventListener("mousedown", clickSoldier);

  soldier.classList.add("paused");

  // deadsprite animation
  soldier.querySelector("img").classList.add("deadSprite");

  soldier.addEventListener("animationend", soldierGone);
  document.querySelector("#audio_zombie4").currentTime = 0;
  document.querySelector("#audio_zombie4").play();

  document.querySelector("#audio_gunshot").currentTime = 0;
  document.querySelector("#audio_gunshot").play();

  heartLost();
}

function restartRunning() {
  console.log;
}

function soldierGone() {
  console.log("Zombie died, tragic");
  let soldier = this;

  soldier.removeEventListener("animationend", soldierGone);

  soldier.querySelector("img").classList.remove("deadSprite");

  soldier.classList.remove("paused");

  soldier.addEventListener("mousedown", clickSoldier);
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

function resetHP() {
  console.log("Hearts have been reset");
  Lives = 3;
  document.querySelector("#heart0").classList.remove("empty_heart");
  document.querySelector("#heart1").classList.remove("empty_heart");
  document.querySelector("#heart2").classList.remove("empty_heart");
  document.querySelector("#heart0").classList.add("red_heart");
  document.querySelector("#heart1").classList.add("red_heart");
  document.querySelector("#heart2").classList.add("red_heart");
}

function heartLost() {
  console.log("Heart lost");
  showHeartLost();
  hearts--;
  if (hearts === 0) {
    gameLost;
  }
}

function showHeartLost() {
  document.querySelector("#heart" + lives).classList.remove("red_heart");
  document.querySelector("#heart" + hearts).classList.add("empty_heart");
}

function startTime() {
  document.querySelector("#time_sprite").classList.remove("fill");
  document.querySelector("#time_sprite").offsetWidth;
  document.querySelector("#time_sprite").classList.add("fill");

  document
    .querySelector("#time_sprite")
    .addEventListener("animationend", noMoreTime);
}

function startTheShow() {
  document.querySelector("#zombieContainer1").classList.add("run");
  document.querySelector("#zombieContainer2").classList.add("run");
  document.querySelector("#zombieContainer3").classList.add("run");
  document.querySelector("#zombieContainer4").classList.add("run");
  document.querySelector("#soldierContainer1").classList.add("run");
  document.querySelector("#soldierContainer2").classList.add("run");
  document.querySelector("#soldierContainer3").classList.add("run");
  document.querySelector("#soldierContainer4").classList.add("run");

  // Sæt position klasser
  document.querySelector("#zombieContainer1").classList.add("position1");
  document.querySelector("#soldierContainer1").classList.add("position2");
  document.querySelector("#zombieContainer2").classList.add("position3");
  document.querySelector("#soldierContainer2").classList.add("position4");
  document.querySelector("#zombieContainer3").classList.add("position5");
  document.querySelector("#soldierContainer3").classList.add("position6");
  document.querySelector("#zombieContainer4").classList.add("position7");
  document.querySelector("#soldierContainer4").classList.add("position8");
}

function noMoreTime() {
  console.log("No more time sunnyboy");
  if (gameRunning) {
    if (kills >= 20) {
      levelComplete();
    } else {
      gameLost();
    }
  }
}

function gameStopped() {
  console.log("Game has ended");
  gameRunning = false;
  //stopper alle animationer, bagefter fjerner den mousedown og en lille musik nulstilling

  document.querySelector("#zombieContainer1").classList.remove("run");
  document.querySelector("#zombieContainer2").classList.remove("run");
  document.querySelector("#zombieContainer3").classList.remove("run");
  document.querySelector("#zombieContainer4").classList.remove("run");
  document.querySelector("#soldierContainer1").classList.remove("run");
  document.querySelector("#soldierContainer2").classList.remove("run");
  document.querySelector("#soldierContainer3").classList.remove("run");
  document.querySelector("#soldierContainer4").classList.remove("run");

  document
    .querySelector("#zombieContainer1")
    .removeEventListener("mousedown", clickZombie);
  document
    .querySelector("#zombieContainer2")
    .removeEventListener("mousedown", clickZombie);
  document
    .querySelector("#zombieContainer3")
    .removeEventListener("mousedown", clickZombie);
  document
    .querySelector("#zombieContainer4")
    .removeEventListener("mousedown", clickZombie);
  document
    .querySelector("#soldierContainer1")
    .removeEventListener("mousedown", clickSoldier);
  document
    .querySelector("#soldierContainer2")
    .removeEventListener("mousedown", clickSoldier);
  document
    .querySelector("#soldierContainer3")
    .removeEventListener("mousedown", clickSoldier);
  document
    .querySelector("#soldierContainer4")
    .removeEventListener("mousedown", clickSoldier);

  document.querySelector("#audio_game").pause();
  document.querySelector("#audio_game").currentTime = 0;
  document.querySelector("#time_sprite").classList.remove("fill");
}

function gameLost() {
  document.querySelector("#gameOver").classList.remove("hidden");
  document.querySelector("#audio_lost").play();
  if (lives <= 0) {
  }
  gameStopped();
}

function levelComplete() {
  document.querySelector("#levelComplete").classList.remove("hidden");
  document.querySelector("#audio_win").play();
  gameStopped();
}
