//fetches passages from json file
let passages = {};

fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    passages = data;
    let randomI = Math.floor(Math.random()*10)
    document.querySelector('.passage').innerHTML = passages.hard[randomI].text;

  })
.catch(err => console.error(err));

//VARIABLES
const startTypingWindow = document.querySelector('.start-typing-window'); //Start Typing window
const startTypingBtn = document.querySelector('.start-typing-button'); //Start Typing button
const passage = document.querySelector('.passage'); //PASSAGE
const difficultyToggles = document.querySelectorAll('.difficulty-toggle');
let passageHidden = true; //Passage is hidden true or false
let difficulty = 'easy'; //difficulty variable - default is 'easy' when page starts
let mode = 'timed'; //mode variable - default is 'timed' when page starts


//TOGGLE DIFFICULTY
const selectDifficulty = (event) => {
  let btn = event.target;
  let selectedDifficulty = btn.dataset.difficulty;

  if (selectedDifficulty === difficulty) return;

  difficulty = selectedDifficulty;

  difficultyToggles.forEach(toggle => toggle.classList.remove('active'));
  btn.classList.add('active')

  console.log(difficulty)
};
difficultyToggles.forEach(toggle => toggle.addEventListener('click', selectDifficulty))

//Clicking Start Typing button will close start typing window and show passage
const hideWindow = () =>{
  startTypingWindow.style.visibility = 'hidden';
  passageHidden = false;
};

startTypingBtn.onclick = hideWindow;