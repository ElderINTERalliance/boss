goToElement("home-view");

function goToElement(name) {
	let content = document.getElementById("content");
	let elements = content.childNodes;
	for (let i = 0; i < elements.length; i++) {
		elements[i].hidden = true;
	}
	let selected = document.getElementById(name);
	selected.hidden = false
	window.scrollTo(0, 0);
}
