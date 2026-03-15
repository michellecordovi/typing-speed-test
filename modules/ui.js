//UI FUNCTIONS

const statsColorChange = (statElement, color) => {
	statElement.style.color = `var(--${color})`
}

//highlights the current character to be types
const highlightCurrentCharacter = (character) => {
	character.style.backgroundColor = "var(--dark-gray)";
	character.style.color = "var(--white)";
	character.style.textDecoration = "none";
	character.style.borderRadius = '2px'

	character.scrollIntoView({
		block: "start",
		inline: "nearest",
		behavior: "smooth"
	});
};

//make function to turn a character green if correctly input (this should remove the background from when it was highlighted as the current character)
const turnCharacterGreen = (character) => {
	character.style.color = "green";
	character.style.backgroundColor = "var(--black)";
	character.style.textDecoration = "none";
};
//make function to turn a character red if incorrect
const turnCharacterRed = (character) => {
	character.style.color = "red";
	character.style.textDecoration = "underline";
	character.style.backgroundColor = "var(--black)";
};

export {highlightCurrentCharacter, turnCharacterGreen, turnCharacterRed, statsColorChange};