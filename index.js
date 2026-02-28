//fetches passages from json file
let passages = {};

fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    passages = data;
    let randomI = Math.floor(Math.random()* passages.hard.length)
    document.querySelector('.passage').innerHTML = passages.hard[randomI].text;
  })
.catch(err => console.error(err));

//DOCUMENT POINTER VARIABLES
const startTypingWindow = document.querySelector('.start-typing-window'); //Start Typing window
const startTypingBtn = document.querySelector('.start-typing-button'); //Start Typing button
const passageWindow = document.querySelector('.passage'); //Passage container
const difficultyToggles = document.querySelectorAll('.difficulty-toggle'); //
const modeToggles = document.querySelectorAll('.mode-toggle');

//GAME VARIABLES
const gameState = {
  passage: '',
  difficulty: 'easy', //difficulty variable - default is 'easy' when page starts
  mode: 'timed', //mode variable - default is 'timed' when page starts
  characterCount: 0,
  wordCount: 0,
  'typed passage':'',
  'passage index': 0
};

//TOGGLE DIFFICULTY
const selectDifficulty = (event) => {
  let btn = event.target;
  let selectedDifficulty = btn.dataset.difficulty;

  if (selectedDifficulty === gameState.difficulty) return;

  gameState.difficulty = selectedDifficulty;

  difficultyToggles.forEach(toggle => toggle.classList.remove('active'));
  btn.classList.add('active')
};
difficultyToggles.forEach(toggle => toggle.addEventListener('click', selectDifficulty));

//TOGGLE MODE
const selectMode = (event) => {
  let btn= event.target;
  let selectedMode = btn.dataset.mode;

  if(selectedMode === gameState.mode) return;

  gameState.mode = selectedMode;

  modeToggles.forEach(toggle => toggle.classList.remove('active'));
  btn.classList.add('active');
}
modeToggles.forEach(toggle => toggle.addEventListener('click', selectMode));

//Clicking Start Typing button will close start typing window and show passage
const startTyping = () =>{
  let randomIndex = Math.floor(Math.random() * passages[gameState.difficulty].length);
  let span;
  
  passageWindow.innerHTML = ''; //clears default passage places at document load
  gameState.passage = passages[gameState.difficulty][randomIndex].text;//assigns passage a random passage based on difficulty selection

  //creates a span element with the letter of each letter in the passage, adds this to the passage window
  //this way, when typing, each letter's color can be individually changed
  for(let i=0; i < gameState.passage.length; i++){
    span = document.createElement('span');
    span.classList.add('passage-char');
    span.innerHTML = gameState.passage[i];
    passageWindow.appendChild(span);
  }

  startTypingWindow.style.visibility = 'hidden';//hides start typing window, shows passage
  gameState.characterCount = gameState.passage.length;//calculates character count
  gameState.wordCount = gameState.passage.split(' ').length;//calculates word count
};
startTypingBtn.onclick = startTyping;

const keyPress = (event) => {
  // Block control keys and only allow printable characters
  if (event.key.length > 1 || event.ctrlKey || event.metaKey) {
    return;
  }

  gameState['typed passage'] += event.key;
  gameState['passage index']++;
  console.log(gameState['typed passage'])
};

document.addEventListener('keypress', keyPress);