import { passages } from "./modules/data.js"; //returns object of passages
import {
	highlightCurrentCharacter,
	turnCharacterGreen,
	turnCharacterRed,
	statsColorChange,
} from "./modules/ui.js";

//DOCUMENT POINTER VARIABLES
const startTypingWindow = document.querySelector(".start-typing-window"); //Start Typing window
const startTypingBtn = document.querySelector(".start-typing-button"); //Start Typing button
const testCompleteWindow = document.querySelector(".test-complete-window"); //test complete window at end of game
const goAgainBtn = document.querySelector(".go-again-button"); //go again button at end of game
const passageWindow = document.querySelector(".passage"); //Passage container
const wpm = document.getElementById("wpm"); //wpm counter
const accuracy = document.getElementById("accuracy"); //accuracy counter
const time = document.getElementById("time");
const wpmResult = document.querySelector('.wpm-result');
const accuracyResult = document.querySelector('.accuracy-result');
const correctCharacters = document.getElementById('correct-characters');
const incorrectCharacters = document.getElementById('incorrect-characters')
const difficultyToggles = document.querySelectorAll(".difficulty-toggle"); //
const modeToggles = document.querySelectorAll(".mode-toggle");
const personalBestResult = document.getElementById('personal-best')

//GAME VARIABLES
const gameState = {
	passage: "",
	difficulty: "easy", //difficulty variable - default is 'easy' when page starts
	mode: "timed", //mode variable - default is 'timed' when page starts
	characterCount: 0,
	wordCount: 0,
	passageIndex: 0,
	currentCharacter: "",
	correctCharacters: 0,
	passageTimer: null,
	countdownTimer: null,
	seconds: 0,
	minutes: 0,
	wpm: 0,
	accuracy: 100,
	personalBest: null,

	timerFunction(){
		if (gameState.seconds < 59) {
				gameState.seconds++;
			} else {
				gameState.seconds = 0;
				gameState.minutes++;
			}

			if (gameState.seconds < 10) {
				time.innerHTML = `${gameState.minutes}:0${gameState.seconds}`;
			} else {
				time.innerHTML = `${gameState.minutes}:${gameState.seconds}`;
			}
			gameState.calculateWPM();
			wpm.innerHTML = gameState.wpm;//WPM is calculated every second
	}, //this starts a timer when mode is set to passage

	countdown(){
		if (gameState.minutes === 1 && gameState.seconds === 0){
			gameState.seconds = 59;
			gameState.minutes = 0;
		} else {
			gameState.seconds--;
		}


		if (gameState.seconds < 10) {
			time.innerHTML = `${gameState.minutes}:0${gameState.seconds}`;
		} else {
		time.innerHTML = `${gameState.minutes}:${gameState.seconds}`;
		}

		if (gameState.seconds === 0){
			endGame();
		}
		gameState.calculateWPM();
		wpm.innerHTML = gameState.wpm;//WPM is calculated every second
	}, //this starts a count down from 60s in timed mode

	calculateAccuracy() {
		let index = this.passageIndex + 1;
		this.accuracy =  Math.round((this.correctCharacters / index) * 100) + "%";
	},

	calculateWPM(){
		if(this.mode === 'passage'){
			let minutesPassed = this.seconds / 60 + this.minutes;
			this.wpm =  Math.round(this.correctCharacters / 5 / minutesPassed);
		} else if (this.mode === 'timed'){
			let secondsPassed = 60 - this.seconds;
			let minutesPassed = secondsPassed / 60;
			this.wpm =   Math.round(this.correctCharacters / 5 / minutesPassed);
		}
	}
};

//TOGGLE DIFFICULTY
const selectDifficulty = (event) => {
	let btn = event.target;
	let selectedDifficulty = btn.dataset.difficulty;

	if (selectedDifficulty === gameState.difficulty) return; //if selected difficulty is already in place, nothing happens.

	gameState.difficulty = selectedDifficulty; //update difficulty based on selection

	difficultyToggles.forEach((toggle) => toggle.classList.remove("active")); //remove 'active' className for all toggles
	btn.classList.add("active"); //add 'active' class name to only the toggle that was pressed

	if (startTypingWindow.style.display === "none") {
		startOver(); //opens up start typing window again if they click the toggle in the middle of the game
	}
};
difficultyToggles.forEach((toggle) =>
	toggle.addEventListener("click", selectDifficulty),
);

//TOGGLE MODE
const selectMode = (event) => {
	let btn = event.target;
	let selectedMode = btn.dataset.mode;

	if (selectedMode === gameState.mode) return; //if selected mode is already in place, nothing happens.

	gameState.mode = selectedMode; //update mode based on selection

	modeToggles.forEach((toggle) => toggle.classList.remove("active")); //remove 'active' className for all toggles
	btn.classList.add("active"); //add 'active' class name to only the toggle that was pressed

	//sets default time start depending on mode selection
	if (gameState.mode === "passage") {
		time.innerHTML = "0:00";
		gameState.minutes = 0;
		gameState.seconds = 0;
	} else {
		time.innerHTML = "1:00";
		gameState.minutes = 1;
		gameState.seconds = 0;
	}

	if (startTypingWindow.style.display === "none") {
		startOver(); //opens up start typing window again if they click the toggle in the middle of the game
	}
};
modeToggles.forEach((toggle) => toggle.addEventListener("click", selectMode));

//KEY PRESS EVENT LISTENER
const keyPress = (event) => {
	event.preventDefault(); //prevent default behavior of typing keys, including spacebar

	// Block control keys and only allow printable characters, except backspace/delete
	if (event.key === "Backspace" || event.key === "Delete") {
		if (gameState.passageIndex > 0) {
			gameState.currentCharacter.style.backgroundColor = "inherit"; //undoes highlight of previous character
			gameState.currentCharacter.style.color = "var(--light-gray)";
			gameState.passageIndex--; //changes passage index -1
			gameState.currentCharacter =
				passageWindow.children[gameState.passageIndex]; //updates next character based on index
			highlightCurrentCharacter(gameState.currentCharacter);
		}
		return;
	} else if (event.key.length > 1 || event.ctrlKey || event.metaKey) {
		return;
	}

	//normalizes all dashes to === hyphen '-'
	const normalizeChar = (char) => {
		return char.replace(/[–—]/g, "-"); // Convert en-dash and em-dash to hyphen
	};

	const typedChar = normalizeChar(event.key);
	const expectedChar = normalizeChar(gameState.currentCharacter.dataset.char);

	if (typedChar === expectedChar) {
		gameState.correctCharacters++; //increase correct characters entered
		turnCharacterGreen(gameState.currentCharacter); //correct input turns green
	} else if (typedChar !== expectedChar) {
		turnCharacterRed(gameState.currentCharacter); //incorrect input turns red
	}

	gameState.calculateAccuracy();
	accuracy.innerHTML = gameState.accuracy; //updates accuracy stat with each key press

	if (accuracy.innerHTML !== "100%") {
		statsColorChange(accuracy, "red");
	} //changes accuracy stat to red when its below 100%

	gameState.passageIndex++; //changes passage index +1 for every character input

	if (gameState.passageIndex === gameState.passage.length) {
		endGame(); //end game if they've typed in all characters
	} else {
		gameState.currentCharacter =
			passageWindow.children[gameState.passageIndex]; //updates next character based on index
		highlightCurrentCharacter(gameState.currentCharacter); //next character is highlighted
	}
};

//GAME START

const startTyping = () => {
	let randomIndex = Math.floor(
		Math.random() * passages[gameState.difficulty].length,
	);
	let span;

	passageWindow.innerHTML = ""; //clears default passage places at document load
	gameState.passage = passages[gameState.difficulty][randomIndex].text; //assigns passage a random passage based on difficulty selection

	//creates a span element with the letter of each letter in the passage, adds this to the passage window
	//this way, when typing, each letter's color can be individually changed
	for (let i = 0; i < gameState.passage.length; i++) {
		span = document.createElement("span");
		span.classList.add("passage-char");
		span.innerHTML = gameState.passage[i];
		span.setAttribute("data-char", gameState.passage[i]);
		passageWindow.appendChild(span);
	}

	//turns on timer depending on mode
	if (gameState.mode === "passage") {
		gameState.passageTimer = setInterval(gameState.timerFunction, 1000);
	} else {
		gameState.countdownTimer = setInterval(gameState.countdown, 1000)
	}

	startTypingWindow.style.display = "none"; //hides start typing window, shows passage
	gameState.characterCount = gameState.passage.length; //calculates character count
	gameState.wordCount = gameState.passage.split(" ").length; //calculates word count
	gameState.passageIndex = 0; //passage index resets to 0 at start of game
	gameState.currentCharacter = passageWindow.children[gameState.passageIndex]; //sets current character to first SPAN ELEMENT in the new passage
	highlightCurrentCharacter(gameState.currentCharacter); //highlights first character at start of game
	statsColorChange(wpm, "white");
	statsColorChange(accuracy, "green");
	statsColorChange(time, "yellow");
	document.addEventListener("keydown", keyPress); //turns on event listener for key pressing once game has started
};
startTypingBtn.onclick = startTyping; //Clicking Start Typing button will close start typing window, set gameState properties, and show passage

//END GAME FUNTION
const endGame = () => {
	testCompleteWindow.style.display = "flex"; //results window appears
	document.removeEventListener("keydown", keyPress); //when game is over, document stops listening for keys input
	clearInterval(gameState.passageTimer);
	clearInterval(gameState.countdownTimer)

	if (!localStorage.personalBest){
		localStorage.setItem('personalBest', gameState.wpm)
		gameState.personalBest = gameState.wpm;
		personalBestResult.innerHTML = ' ' + gameState.personalBest + ' WPM'
	} else if(localStorage.personalBest < gameState.wpm){
		localStorage.personalBest = gameState.wpm;
		gameState.personalBest = gameState.wpm;
		personalBestResult.innerHTML = ' ' + gameState.personalBest + ' WPM'
	} 

	//results
	wpmResult.innerHTML = gameState.wpm;
	accuracyResult.innerHTML = gameState.accuracy;
	correctCharacters.innerHTML = gameState.correctCharacters;
	incorrectCharacters.innerHTML = gameState.characterCount - gameState.correctCharacters;
};

//start over
const startOver = () => {
	testCompleteWindow.style.display = "none";
	startTypingWindow.style.display = "flex";
	gameState.correctCharacters = 0;
	clearInterval(gameState.passageTimer)
	clearInterval(gameState.countdownTimer)

	statsColorChange(wpm, "light-gray");
	statsColorChange(accuracy, "light-gray");
	statsColorChange(time, "light-gray");

	wpm.innerHTML = '0';
	accuracy.innerHTML = '100%';
	time.innerHTML = '0:00'

	let randomI = Math.floor(Math.random() * passages.medium.length);
	document.querySelector(".passage").innerHTML =
		passages.medium[randomI].text; //puts random passage in the background of start typing screen
};
goAgainBtn.addEventListener("click", startOver); 