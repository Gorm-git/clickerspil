"use strict";

let kills = 0;
let lives = 0;
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
  resetHP();
  resetKills();
  displayRunningScreen();
  elementClickRegistration();
  resetAnimationClasses();
  startTheShow();
  startTime();

  document.querySelector("#audio_game").play();
  document.querySelector("#audio_game").volume = 1;
  document.querySelector("#audio_game").currentTime = 0;
}

function elementClickRegistration() {
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
}

function resetAnimationClasses() {
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

// function resetGameElementClasses() {

// }

function displayStartScreen() {
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#gameOver").classList.add("hidden");
  document.querySelector("#levelComplete").classList.add("hidden");
}

function displayRunningScreen() {
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#gameOver").classList.add("hidden");
  document.querySelector("#levelComplete").classList.add("hidden");
}

function clickZombie() {
  console.log("Shoot Zombie");
  // No more multi click
  const zombie = this;
  zombie.removeEventListener("mousedown", clickZombie);

  zombie.classList.add("paused");

  // deadsprite animation
  zombie.querySelector("img").classList.add("deadSprite");

  zombie.addEventListener("animationend", zombieGone);
  document.querySelector("#audio_zombie4").currentTime = 0;
  document.querySelector("#audio_zombie4").play();

  document.querySelector("#audio_gunshot2").currentTime = 0;
  document.querySelector("#audio_gunshot2").play();

  // document.querySelector("audio_gunshot").currentTime = 0;
  // document.querySelector("audio_gunshot").play();

  zombiesKilled();
}

function zombieGone() {
  console.log("Zombie died, tragic");
  const zombie = this;

  zombie.removeEventListener("animationend", zombieGone);

  zombie.querySelector("img").classList.remove("deadSprite");

  zombie.classList.remove("paused");

  if (gameRunning) {
    restartRunning.call(this);
    zombie.addEventListener("mousedown", clickZombie);
  }
}

function clickSoldier() {
  console.log("You shot a soldier D:");
  // No more multi click
  let soldier = this;
  soldier.removeEventListener("mousedown", clickSoldier);

  soldier.classList.add("paused");

  // deadsprite animation
  soldier.querySelector("img").classList.add("deadSprite");

  soldier.addEventListener("animationend", soldierGone);
  document.querySelector("#audio_soldier2").currentTime = 0;
  document.querySelector("#audio_soldier2").play();

  document.querySelector("#audio_gunshot").currentTime = 0;
  document.querySelector("#audio_gunshot").play();

  heartLost();
}

function soldierGone() {
  console.log("A soldier just died, whose side are you on?");
  let soldier = this;

  soldier.removeEventListener("animationend", soldierGone);

  soldier.querySelector("img").classList.remove("deadSprite");

  soldier.classList.remove("paused");

  soldier.addEventListener("mousedown", clickSoldier);

  if (gameRunning) {
    restartRunning.call(this);
    soldier.addEventListener("mousedown", clickZombie);
  }
}

function restartRunning() {
  let animation = this;

  animation.classList.remove("run");
  animation.offsetWidth;
  animation.classList.add("run");
  animation.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5",
    "position6",
    "position7",
    "position8"
  );

  let newPosition = Math.floor(Math.random() * 8) + 1;
  animation.classList.add(`position${newPosition}`);

  animation.classList.remove(
    "speed1",
    "speed2",
    "speed3",
    "speed4",
    "speed5",
    "speed6",
    "speed7",
    "speed8"
  );

  let newSpeed = Math.floor(Math.random() * 8) + 1;
  animation.classList.add(`speed${newSpeed}`);
}

// Kills og liv
function resetKills() {
  kills = 0;
  showKills();
}

function zombiesKilled() {
  console.log("Zombie killed");
  kills++;
  console.log(`You have killed ${kills} zombies`);
  showKills();
}

function showKills() {
  console.log("show kills");
  document.querySelector("#zombie_kills").textContent = kills;
}

function resetHP() {
  console.log("Hearts have been reset");
  lives = 3;
  document.querySelector("#heart1").classList.remove("empty_heart");
  document.querySelector("#heart2").classList.remove("empty_heart");
  document.querySelector("#heart3").classList.remove("empty_heart");
  document.querySelector("#heart1").classList.add("red_heart");
  document.querySelector("#heart2").classList.add("red_heart");
  document.querySelector("#heart3").classList.add("red_heart");
}

function heartLost() {
  console.log("Heart lost");
  showHeartLost();
  lives--;
  if (lives <= 0) {
    gameLost();
  }
}

function showHeartLost() {
  document.querySelector("#heart" + lives).classList.remove("red_heart");
  document.querySelector("#heart" + lives).classList.add("empty_heart");
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
  //animation
  document.querySelector("#zombieContainer1").classList.add("run");
  document.querySelector("#zombieContainer2").classList.add("run");
  document.querySelector("#zombieContainer3").classList.add("run");
  document.querySelector("#zombieContainer4").classList.add("run");
  document.querySelector("#soldierContainer1").classList.add("run");
  document.querySelector("#soldierContainer2").classList.add("run");
  document.querySelector("#soldierContainer3").classList.add("run");
  document.querySelector("#soldierContainer4").classList.add("run");

  //Position
  document.querySelector("#zombieContainer1").classList.add("position1");
  document.querySelector("#soldierContainer1").classList.add("position2");
  document.querySelector("#zombieContainer2").classList.add("position3");
  document.querySelector("#soldierContainer2").classList.add("position4");
  document.querySelector("#zombieContainer3").classList.add("position5");
  document.querySelector("#soldierContainer3").classList.add("position6");
  document.querySelector("#zombieContainer4").classList.add("position7");
  document.querySelector("#soldierContainer4").classList.add("position8");
  //speed
  document.querySelector("#zombieContainer1").classList.add("speed1");
  document.querySelector("#zombieContainer2").classList.add("speed2");
  document.querySelector("#zombieContainer3").classList.add("speed3");
  document.querySelector("#zombieContainer4").classList.add("speed4");
  document.querySelector("#soldierContainer1").classList.add("speed5");
  document.querySelector("#soldierContainer2").classList.add("speed6");
  document.querySelector("#soldierContainer3").classList.add("speed7");
  document.querySelector("#soldierContainer4").classList.add("speed8");
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

  //fjerner classes i tilfælde af at man spiller spillet mere end en gang

  document.querySelector("#zombieContainer1").classList.remove("position");
  document.querySelector("#zombieContainer2").classList.remove("position");
  document.querySelector("#zombieContainer3").classList.remove("position");
  document.querySelector("#zombieContainer4").classList.remove("position");
  document.querySelector("#soldierContainer1").classList.remove("speed");
  document.querySelector("#soldierContainer2").classList.remove("speed");
  document.querySelector("#soldierContainer3").classList.remove("speed");
  document.querySelector("#soldierContainer4").classList.remove("speed");

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
  console.log("You lost!");
  document.querySelector("#gameOver").classList.remove("hidden");
  gameStopped();
  document.querySelector("#audio_lost").play();
  document.querySelector("#game_over_zombies").textContent = kills;
}

function levelComplete() {
  document.querySelector("#levelComplete").classList.remove("hidden");
  document.querySelector("#audio_win").play();
  document.querySelector("#level_complete_coins").textContent = kills;
  gameStopped();
}
