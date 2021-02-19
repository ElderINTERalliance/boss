// This is the main renderer.js, for general use

// Run on page load:
let homeElement = document.getElementsByClassName("nav-item")[0];
goToElement("home-view", homeElement);

function goToElement(name, navElement) {
	// Hide all elements
	let elements = document.querySelectorAll("body > div:not(#nav-bar)");
	for (let i = 0; i < elements.length; i++) {
		elements[i].hidden = true;
	}

	// Show selected content
	let selected = document.getElementById(name);
	selected.hidden = false;
	window.scrollTo(0, 0);

	// Set default background color for all nav headers
	if (navElement) {
		sections = document.getElementsByClassName("nav-item");
		Object.values(sections).forEach((element) => {
			element.style.borderBottom = "none";
		});
	}

	// Highlight selected
	if (navElement) navElement.style.borderBottom = "2px #3D3F44 solid";
}

// Moved Icon Selector to all-programs.js

// Color Switcher

var color = document.getElementById("edit-pane").dataset.color;

document.querySelectorAll(".large-color").forEach(element => {
	if (element.dataset.color == color){
		element.classList.toggle("color-selected");
	}
	element.addEventListener('click', () => {
		document.querySelector(".color-selected").classList.toggle('color-selected');
		element.classList.toggle("color-selected");
		color = document.getElementById("edit-pane").dataset.color;
		document.querySelectorAll(`.light-${color}:not(.lock)`).forEach(el => {
			el.classList.replace(`light-${color}`, `light-${element.dataset.color}`);
		})
		document.querySelectorAll(`.dark-${color}:not(.lock)`).forEach(el => {
			el.classList.replace(`dark-${color}`, `dark-${element.dataset.color}`);
		})
		document.getElementById("edit-pane").dataset.color = element.dataset.color;
	})
})
