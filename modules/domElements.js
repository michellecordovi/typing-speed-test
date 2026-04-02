// DOM Elements Module - Organized by functionality

// Game Windows
export const gameWindows = {
  startTypingWindow: document.querySelector(".start-typing-window"),
  testCompleteWindow: document.querySelector(".test-complete-window"),
  passageWindow: document.querySelector(".passage"),
};

// Game Controls
export const gameControls = {
  mobileKeyboardTrigger: document.getElementById("mobile-keyboard-trigger"),
  goAgainBtn: document.querySelector(".go-again-button"),
  restartButton: document.querySelector(".restart-button"),
};

// Stats Display
export const statsDisplay = {
  wpm: document.getElementById("wpm"),
  accuracy: document.getElementById("accuracy"),
  time: document.getElementById("time"),
};

// Results Display
export const resultsDisplay = {
  wpmResult: document.querySelector(".wpm-result"),
  accuracyResult: document.querySelector(".accuracy-result"),
  correctCharacters: document.getElementById("correct-characters"),
  incorrectCharacters: document.getElementById("incorrect-characters"),
  personalBestResult: document.getElementById("personal-best"),
  testResultHeader: document.getElementById("test-result-header"),
  testResultParagraph: document.getElementById("test-result-paragraph"),
  personalBest: document.querySelector(".personal-best-display"),
};

// Difficulty Settings
export const difficultySettings = {
  toggles: document.querySelectorAll(".difficulty-toggle"),
  mobileButton: document.querySelector(".mobile-difficulty-toggle"),
  mobileMenu: document.querySelector(".difficulty-radio-buttons"),
  mobileSelectors: document.querySelectorAll(".difficulty-radio-button"),
  mobileDisplay: document.querySelector(".mobile-difficulty-display"),
};

// Mode Settings
export const modeSettings = {
  toggles: document.querySelectorAll(".mode-toggle"),
  mobileButton: document.querySelector(".mobile-mode-toggle"),
  mobileSelectors: document.querySelectorAll(".mode-radio-button"),
  mobileMenu: document.querySelector(".mode-radio-buttons"),
  mobileDisplay: document.querySelector(".mobile-mode-display"),
};