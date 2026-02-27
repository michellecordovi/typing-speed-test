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
const difficultyToggles = document.getElementsByClassName('.difficulty-toggle');
let passageHidden = true; //Passage is hidden true or false
let difficulty = 'easy'; //difficulty variable - default is 'easy' when page starts
let mode = 'timed'; //mode variable - default is 'timed' when page starts


//TOGGLES

//default difficulty
const highlightDefaultToggles = () =>{
  //highlights easy button when page starts(default)
  document.querySelector(`.${difficulty}-toggle`).style.border = '1px solid var(--light-blue)';
  document.querySelector(`.${difficulty}-toggle`).style.color = 'var(--light-blue)';

  //highlights timed button when page starts (default)
  document.querySelector(`.${mode}-toggle`).style.border = '1px solid var(--light-blue)';
  document.querySelector(`.${mode}-toggle`).style.color = 'var(--light-blue)';
}
highlightDefaultToggles();

//creates blue border around toggle buttons based on difficulty and mode
const highlightToggle = (event) => {
  
}

for (let toggle of difficultyToggles){
  toggle.onclick = highlightToggle;
}

//Clicking Start Typing button will close start typing window and show passage
const hideWindow = () =>{
  startTypingWindow.style.visibility = 'hidden';
  passageHidden = false;
};

startTypingBtn.onclick = hideWindow;