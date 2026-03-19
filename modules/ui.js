//UI FUNCTIONS

const statsColorChange = (statElement, color) => {
	statElement.style.color = `var(--${color})`;
};

//highlights the current character to be types
const highlightCurrentCharacter = (character) => {
	character.style.backgroundColor = "var(--dark-gray)";
	character.style.color = "var(--white)";
	character.style.textDecoration = "none";
	character.style.borderRadius = "2px";

	//scrolls current character into view on screen
	character.scrollIntoView({
		block: "start",
		inline: "nearest",
		behavior: "smooth",
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

const undoCharacterStyling = (character) => {
	character.style.color = "var(--light-gray)";
	character.style.textDecoration = "none";
	character.style.backgroundColor = "var(--black)";
};

const toggleDisplay = (element) => {
	element.classList.contains("hidden")
		? element.classList.remove("hidden")
		: element.classList.add("hidden");
};

function capitalizeFirstLetter(input) {
	let word = input;
	word = word.split("");
	word[0] = word[0].toUpperCase();
	word = word.join("");
	return word;
}

export {
	highlightCurrentCharacter,
	turnCharacterGreen,
	turnCharacterRed,
	undoCharacterStyling,
	statsColorChange,
	toggleDisplay,
	capitalizeFirstLetter
};
