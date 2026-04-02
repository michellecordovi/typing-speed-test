import { passages } from "./modules/data.js"; //returns object of passages
import {
	highlightCurrentCharacter,
	turnCharacterGreen,
	turnCharacterRed,
	undoCharacterStyling,
	statsColorChange,
	toggleDisplay,
	capitalizeFirstLetter,
} from "./modules/ui.js"; //ui change functions

import {
	gameWindows,
	gameControls,
	statsDisplay,
	resultsDisplay,
	difficultySettings,
	modeSettings,
} from "./modules/domElements.js"; //dom elements

//DOCUMENT POINTER VARIABLES

//STATS DISPLAY - Now imported from domElements.js

//GAME VARIABLES
const gameState = {
	passage: "",
	difficulty: "easy", //difficulty variable - default is 'easy' when page starts
	mode: "timed", //mode variable - default is 'timed' when page starts
	characterCount: 0,
	wordCount: 0,
	passageIndex: 0,
	currentCharacter: "",
	correctCharacters: [],
	passageTimer: null,
	countdownTimer: null,
	seconds: 0,
	minutes: 0,
	wpm: 0,
	accuracy: 100,
	personalBest: 0,

	timerFunction() {
		if (gameState.seconds < 59) {
			gameState.seconds++;
		} else {
			gameState.seconds = 0;
			gameState.minutes++;
		}

		gameState.seconds < 10
			? (statsDisplay.time.textContent = `${gameState.minutes}:0${gameState.seconds}`)
			: (statsDisplay.time.textContent = `${gameState.minutes}:${gameState.seconds}`);

		gameState.calculateWPM();
		statsDisplay.wpm.textContent = gameState.wpm; //WPM is calculated every second
	}, //this starts a timer when mode is set to passage

	countdown() {
		if (gameState.minutes === 1 && gameState.seconds === 0) {
			gameState.seconds = 59;
			gameState.minutes = 0;
		} else {
			gameState.seconds--;
		}

		gameState.seconds < 10
			? (statsDisplay.time.textContent = `${gameState.minutes}:0${gameState.seconds}`)
			: (statsDisplay.time.textContent = `${gameState.minutes}:${gameState.seconds}`);

		gameState.calculateWPM();
		statsDisplay.wpm.textContent = gameState.wpm; //WPM is calculated every second

		if (gameState.seconds === 0) {
			endGame();
		}
	}, //this starts a count down from 60s in timed mode

	calculateAccuracy() {
		let index = this.passageIndex + 1;
		this.accuracy =
			Math.round((this.correctCharacters.length / index) * 100) + "%";
	},

	calculateWPM() {
		if (this.mode === "passage") {
			let minutesPassed = this.seconds / 60 + this.minutes;
			this.wpm = Math.round(
				this.correctCharacters.length / 5 / minutesPassed,
			);
		} else if (this.mode === "timed") {
			let secondsPassed = 60 - this.seconds;
			let minutesPassed = secondsPassed / 60;
			this.wpm = Math.round(
				this.correctCharacters.length / 5 / minutesPassed,
			);
		}
	},
};

//TOGGLE DIFFICULTY
difficultySettings.mobileButton.addEventListener("click", () =>
	toggleDisplay(difficultySettings.mobileMenu),
);
difficultySettings.mobileSelectors.forEach((toggle) =>
	toggle.addEventListener("change", () =>
		toggleDisplay(difficultySettings.mobileMenu),
	),
);

const selectDifficulty = (event) => {
	let btn = event.target;
	let selectedDifficulty = btn.dataset.difficulty;

	if (selectedDifficulty === gameState.difficulty) return; //if selected difficulty is already in place, nothing happens.

	gameState.difficulty = selectedDifficulty; //update difficulty based on selection

	difficultySettings.toggles.forEach((toggle) =>
		toggle.classList.remove("active"),
	); //remove 'active' className for all toggles
	document
		.querySelector(`.${gameState.difficulty}-toggle`)
		.classList.add("active");
	//btn.classList.add("active"); //add 'active' class name to only the toggle that was pressed

	difficultySettings.mobileDisplay.textContent = capitalizeFirstLetter(
		gameState.difficulty,
	);

	if (gameWindows.startTypingWindow.classList.contains("hidden")) {
		startOver(); //opens up start typing window again if they click the toggle in the middle of the game
	}
};
difficultySettings.toggles.forEach((toggle) =>
	toggle.addEventListener("click", selectDifficulty),
);
difficultySettings.mobileSelectors.forEach((toggle) =>
	toggle.addEventListener("click", selectDifficulty),
);

//TOGGLE MODE
modeSettings.mobileButton.addEventListener("click", () =>
	toggleDisplay(modeSettings.mobileMenu),
);
modeSettings.mobileSelectors.forEach((toggle) =>
	toggle.addEventListener("click", () =>
		toggleDisplay(modeSettings.mobileMenu),
	),
);

const selectMode = (event) => {
	let btn = event.target;
	let selectedMode = btn.dataset.mode;

	if (selectedMode === gameState.mode) return; //if selected mode is already in place, nothing happens.

	gameState.mode = selectedMode; //update mode based on selection

	modeSettings.toggles.forEach((toggle) => toggle.classList.remove("active")); //remove 'active' className for all toggles
	document.querySelector(`.${gameState.mode}-toggle`).classList.add("active");
	//btn.classList.add("active"); //add 'active' class name to only the toggle that was pressed

	gameState.mode === "timed"
		? (modeSettings.mobileDisplay.textContent = "Timed(60s)")
		: (modeSettings.mobileDisplay.textContent = "Passage");

	gameState.mode === "timed"
		? (statsDisplay.time.textContent = "1:00")
		: (statsDisplay.time.textContent = "0:00");

	if (gameWindows.startTypingWindow.classList.contains("hidden")) {
		startOver(); //opens up start typing window again if they click the toggle in the middle of the game
	}
};
modeSettings.toggles.forEach((toggle) =>
	toggle.addEventListener("click", selectMode),
);
modeSettings.mobileSelectors.forEach((toggle) =>
	toggle.addEventListener("click", selectMode),
);

//KEY PRESS EVENT LISTENER
const keyPress = (event) => {
	event.preventDefault(); //prevent default behavior of typing keys, including spacebar

	// Block control keys and only allow printable characters, except backspace/delete
	if (event.key === "Backspace" || event.key === "Delete") {
		if (gameState.passageIndex > 0) {
			//if they backspace over a previously correct character, it will be removed from the correct character array
			if (
				gameState.correctCharacters.includes(
					gameState.currentCharacter.dataset.id,
				)
			) {
				let index = gameState.correctCharacters.indexOf(
					gameState.currentCharacter.dataset.id,
				);
				gameState.correctCharacters.splice(index, 1);
			}

			undoCharacterStyling(gameState.currentCharacter); //reverts character to original gray font

			gameState.passageIndex--; //changes passage index -1
			gameState.currentCharacter =
				gameWindows.passageWindow.children[gameState.passageIndex]; //updates next character based on index
			highlightCurrentCharacter(gameState.currentCharacter); //highlights new current character after backspace
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
	const expectedChar = normalizeChar(gameState.currentCharacter.textContent);

	if (typedChar === expectedChar) {
		if (
			!gameState.correctCharacters.includes(
				gameState.currentCharacter.dataset.id,
			)
		) {
			gameState.correctCharacters.push(
				gameState.currentCharacter.dataset.id,
			); //increase correct characters entered
		}
		turnCharacterGreen(gameState.currentCharacter); //correct input turns green
	} else if (typedChar !== expectedChar) {
		//if you backspace over a correct character, but input it wrong, it is removed from correct characters array
		if (
			gameState.correctCharacters.includes(
				gameState.currentCharacter.dataset.id,
			)
		) {
			let index = gameState.correctCharacters.indexOf(
				gameState.currentCharacter.dataset.id,
			);
			gameState.correctCharacters.splice(index, 1);
		}
		turnCharacterRed(gameState.currentCharacter); //incorrect input turns red
	}

	gameState.calculateAccuracy();
	statsDisplay.accuracy.textContent = gameState.accuracy; //updates accuracy stat with each key press

	statsDisplay.accuracy.textContent !== "100%"
		? statsColorChange(statsDisplay.accuracy, "red")
		: statsColorChange(statsDisplay.accuracy, "green"); //changes accuracy stat to red when its below 100% and back to green if it goes back up to 100%

	gameState.passageIndex++; //changes passage index +1 for every character input

	if (gameState.passageIndex === gameState.passage.length) {
		endGame(); //end game if they've typed in all characters
	} else {
		gameState.currentCharacter =
			gameWindows.passageWindow.children[gameState.passageIndex]; //updates next character based on index
		highlightCurrentCharacter(gameState.currentCharacter); //next character is highlighted
	}
};

//GAME START

const startTyping = () => {
	if (!passages) {
		return;
	} //nothing will happen if the passages haven't loaded

	let randomIndex = Math.floor(
		Math.random() * passages[gameState.difficulty].length,
	);

	let span;

	gameWindows.passageWindow.textContent = ""; //clears default passage placed at document load
	gameState.passage = passages[gameState.difficulty][randomIndex].text; //assigns passage a random passage based on difficulty selection

	//creates a span element with the letter of each letter in the passage, adds this to the passage window
	//this way, when typing, each letter's color can be individually changed
	for (let i = 0; i < gameState.passage.length; i++) {
		span = document.createElement("span");
		span.classList.add("passage-char");
		span.textContent = gameState.passage[i];
		span.setAttribute("data-id", i);
		gameWindows.passageWindow.appendChild(span);
	}

	toggleDisplay(gameControls.restartButton); //show restart button

	//turns on statsDisplay.timer depending on mode
	if (gameState.mode === "passage") {
		statsDisplay.time.textContent = "0:00";
		gameState.minutes = 0;
		gameState.seconds = 0;
		gameState.passageTimer = setInterval(gameState.timerFunction, 1000);
	} else {
		statsDisplay.time.textContent = "1:00";
		gameState.minutes = 1;
		gameState.seconds = 0;
		gameState.countdownTimer = setInterval(gameState.countdown, 1000);
	}

	if (!difficultySettings.mobileMenu.classList.contains("hidden")) {
		toggleDisplay(difficultySettings.mobileMenu);
	} else if (!modeSettings.mobileMenu.classList.contains("hidden")) {
		toggleDisplay(modeSettings.mobileMenu);
	}

	toggleDisplay(gameWindows.startTypingWindow); //hides start typing window, shows passage
	gameState.characterCount = gameState.passage.length; //calculates character count
	gameState.wordCount = gameState.passage.split(" ").length; //calculates word count
	gameState.passageIndex = 0; //passage index resets to 0 at start of game
	gameState.currentCharacter =
		gameWindows.passageWindow.children[gameState.passageIndex]; //sets current character to first SPAN ELEMENT in the new passage
	highlightCurrentCharacter(gameState.currentCharacter); //highlights first character at start of game
	statsColorChange(statsDisplay.wpm, "white");
	statsColorChange(statsDisplay.accuracy, "green");
	statsColorChange(statsDisplay.time, "yellow");
	document.addEventListener("keydown", keyPress); //turns on event listener for key pressing once game has started
};

gameWindows.startTypingWindow.onclick = (e) => {
	startTyping();
	gameControls.mobileKeyboardTrigger.focus();
};

gameWindows.passageWindow.onclick = (e) => {
	gameControls.mobileKeyboardTrigger.focus();
};

//END GAME FUNCTION - Results elements now imported from resultsDisplay

const endGame = () => {
	toggleDisplay(gameWindows.testCompleteWindow); //results window appears
	document.removeEventListener("keydown", keyPress); //when game is over, document stops listening for keys input
	clearInterval(gameState.passageTimer);
	clearInterval(gameState.countdownTimer);
	gameControls.mobileKeyboardTrigger.blur();
	window.scrollTo(0, 0);

	if (!localStorage.personalBest) {
		localStorage.setItem("personalBest", gameState.wpm);
		gameState.personalBest = gameState.wpm;
		resultsDisplay.personalBestResult.textContent =
			gameState.personalBest + " WPM";
		resultsDisplay.testResultHeader.textContent = "Baseline Established!";
		resultsDisplay.testResultParagraph.textContent = `You've set the bar. Now the real challenge begins - time to beat it.`;
	} else if (localStorage.personalBest < gameState.wpm) {
		localStorage.personalBest = gameState.wpm;
		gameState.personalBest = gameState.wpm;
		resultsDisplay.personalBestResult.textContent =
			gameState.personalBest + " WPM";
		resultsDisplay.testResultHeader.textContent = "High Score Smashed!";
		resultsDisplay.testResultParagraph.textContent = `You're getting faster. That was incredible typing.`;

		//confetti code
		let duration = 4000;
		let animationEnd = Date.now() + duration;
		let defaults = {
			startVelocity: 30,
			spread: 360,
			ticks: 60,
			zIndex: 100,
		};

		function randomInRange(min, max) {
			return Math.random() * (max - min) + min;
		}

		let interval = setInterval(function () {
			let timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			let particleCount = 50 * (timeLeft / duration);
			// since particles fall down, start a bit higher than random
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
			});
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
			});
		}, 250);
	} else if (localStorage.personalBest > gameState.wpm) {
		resultsDisplay.testResultHeader.textContent = "Test Complete!";
		resultsDisplay.testResultParagraph.textContent =
			"Solid run. Keep pushing to beat your high score.";
	}

	//results
	resultsDisplay.wpmResult.textContent = gameState.wpm;
	resultsDisplay.accuracyResult.textContent = gameState.accuracy;
	resultsDisplay.correctCharacters.textContent =
		gameState.correctCharacters.length;
	resultsDisplay.incorrectCharacters.textContent =
		gameState.characterCount - gameState.correctCharacters.length;
};

//loads your previous personal best from local storage
window.addEventListener("load", () => {
	if (localStorage.personalBest) {
		gameState.personalBest = localStorage.personalBest;
		resultsDisplay.personalBestResult.textContent =
			gameState.personalBest + " WPM";
	}
});

//updated personal best text depending on screen size

function updatePersonalBestText() {
	resultsDisplay.personalBest.textContent =
		window.innerWidth < 685 ? "Best:" : "Personal Best:";
}

window.addEventListener("resize", updatePersonalBestText);
updatePersonalBestText();

//start over
const startOver = () => {
	if (!gameWindows.testCompleteWindow.classList.contains("hidden")) {
		toggleDisplay(gameWindows.testCompleteWindow);
	} //if the results page is up, it will disappear. if the results page isn't up, this means they're starting over in the middle of a game and the results page will not be toggled.

	toggleDisplay(gameWindows.startTypingWindow);
	toggleDisplay(gameControls.restartButton);
	gameState.correctCharacters = [];
	clearInterval(gameState.passageTimer);
	clearInterval(gameState.countdownTimer);
	window.scrollTo(0, 0);
	gameControls.mobileKeyboardTrigger.blur();

	statsColorChange(statsDisplay.wpm, "light-gray");
	statsColorChange(statsDisplay.accuracy, "light-gray");
	statsColorChange(statsDisplay.time, "light-gray");

	statsDisplay.wpm.textContent = "0";
	statsDisplay.accuracy.textContent = "100%";
	statsDisplay.time.textContent = "0:00";

	let randomI = Math.floor(Math.random() * passages.medium.length);
	document.querySelector(".passage").textContent =
		passages.medium[randomI].text; //puts random passage in the background of start typing screen
};
gameControls.goAgainBtn.addEventListener("click", startOver);
gameControls.restartButton.onclick = startOver;
