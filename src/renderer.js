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
		element.classList.toggle("program-selected");
	})
})
