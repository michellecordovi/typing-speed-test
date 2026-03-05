let passages = {};

fetch("./data.json")
	.then((response) => response.json())
	.then((data) => {
		passages = data;
		let randomI = Math.floor(Math.random() * passages.medium.length);
		document.querySelector(".passage").innerHTML =
			passages.medium[randomI].text;
	})
	.catch((err) => console.error(err));

export {passages};