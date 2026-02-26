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
const startTypingWindow = document.querySelector('.start-typing-window');
const startTypingBtn = document.querySelector('.start-typing-button');
const passage = document.querySelector('.passage');

//Clicking Start Typing button will close start typing window and show passage
const hideWindow = () =>{
  startTypingWindow.style.visibility = 'hidden';
};

startTypingBtn.addEventListener('click', hideWindow);

