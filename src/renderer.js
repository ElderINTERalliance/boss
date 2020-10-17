// goToElement("home");

function goToElement(name) {
	let content = document.getElementsByClassName("content")[0];
	let elements = content.getElementsByTagName("div");
	for (let i = 0; i < elements.length; i++) {
		elements[i].style.display = 'none';
	}
	let selected = document.getElementById(name);
	selected.style.display = 'block';
	window.scrollTo(0, 0);
}

document.querySelectorAll(".edit-programs-list-icon").forEach(element => {
	element.addEventListener('click', () => {
		color = document.getElementById("edit-pane").dataset.color;
		element.classList.toggle("program-selected");
		element.classList.toggle(`light-${color}`)
	})
})

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