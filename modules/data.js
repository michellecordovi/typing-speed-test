let passages = {};

fetch("./data.json")
	.then((response) => response.json())
	.then((data) => {
		passages = data;
		let randomI = Math.floor(Math.random() * passages.hard.length);
		document.querySelector(".passage").innerHTML =
			passages.hard[randomI].text;
	})
	.catch((err) => console.error(err));

export {passages};