// This is the main renderer.js, for general use

// Run on page load:
// let homeElement = document.getElementsByClassName("nav-item")[0];
// goToElement("home-view", homeElement);
let homeElement = document.getElementsByClassName("nav-item")[1];
goToElement("staging", homeElement);

function goToElement(name, navElement) {
	// Hide all elements
	let content = document.getElementById("content");
	let elements = content.childNodes;
	for (let i = 0; i < elements.length; i++) {
		elements[i].hidden = true;
	}

	// Show selected content
	let selected = document.getElementById(name);
	selected.hidden = false;
	window.scrollTo(0, 0);

	// Set default background color for all nav headers
	sections = document.getElementsByClassName("nav-item");
	Object.values(sections).forEach((element) => {
		element.style.background = "var(--nav-default)";
	});

	// Highlight selected
	if (navElement) navElement.style.background = "var(--nav-selected)";
}

document.querySelectorAll(".edit-programs-list-icon").forEach(element => {
	element.addEventListener('click', () => {
		element.classList.toggle("program-selected");
	})
})
