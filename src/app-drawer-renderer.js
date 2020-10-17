// This is the renderer file for functions related
// to the App Drawer

// const app = require("electron");
const preferences = require("./preferences-handler");
const storage = require("electron-json-storage");
const electron = require("electron");
const fs = require("fs");
const { projectName } = require("./preferences-handler");

const path = storage.getDefaultDataPath();
// TODO - Make file path work across operating systems
const storagePath = `${path}\\${preferences.projectName}.json`;

// Functionalized for easy future re-implementation
function readUserData() {
	return fs.readFileSync(storagePath, "utf8");
}

// I'm using fs to read files, because the `get`
// function from electron-json-storage was acting weird
function getUserPreferences() {
	return JSON.parse(readUserData());
}

// Display User Data
// __________________________
// THIS IS RUN AT SCRIPT LOAD
// This reads the user data, and appends it to the home tab,
// in the form of app drawers

loadAppDrawers();

document.getElementById("new-shortcut").addEventListener("click", () => {
	editDrawer("")
});

document.querySelectorAll(".edit-button").forEach((element) => {
	element.addEventListener("click", () => {
		editDrawer(this)
	});
});
// __________________________

function loadAppDrawers() {
	let drawerList = document.getElementById("shortcuts-list");
	drawerList.innerHTML = "";
	drawerList.append(parsePreferences(getUserPreferences()));
}

// Takes user preferences as an object, and returns an array
// of drawers of apps
function parsePreferences(data) {
	var root = document.createElement("div");
	Object.keys(data).forEach((drawer) => {
		root.append(createDrawer(drawer, data[drawer]));
	});
	return root;
}

function createDrawer(drawerName, drawerContents) {
	let div = initializeDrawerElement();

	// Add function to Launch all apps
	let launchAll = div.getElementsByClassName("launch-button")[0];
	launchAll.onclick = function () {
		openAllApps(this);
	};

	// Set Title
	let title = div.getElementsByClassName("shortcut-card-label")[0];
	title.textContent = drawerName;

	// Populate drawer with app icons
	let body = div.getElementsByClassName("shortcut-card-programs")[0];
	body.append(createDivFromIcons(drawerContents));
	return div;
}

function openAllApps(clicked) {
	let appDrawer = clicked.parentElement.parentElement;
	let apps = appDrawer.getElementsByClassName("shortcut-card-program-icon");
	Object.values(apps).forEach((icon) => {
		icon.click();
	});
}

function initializeDrawerElement() {
	let div = document.createElement("div");
	div.innerHTML += `
	<div class="shortcut-card-home">
		<div class="shortcut-card-icons">
			<div class="icon launch-button" id="launch">
				<i class="material-icons-round md-48">
					launch
				</i>
			</div>
			<div class="icon edit-button" id="edit">
				<i class="material-icons-round md-48">
					edit
				</i>
			</div>
		</div>
		<div class="shortcut-card-programs">
		</div>
		<h2 class="shortcut-card-label">
		</h2>
	</div>`;
	return div;
}

function createDivFromIcons(icons) {
	var div = document.createElement("div");
	// from the user json, each icon will have
	// at least a url, app name, src, and protocol
	Object.keys(icons).forEach((appName) => {
		let app = icons[appName];
		let iconURL = app["icon"];
		let src = app["src"];
		let protocol = app["protocol"];
		div.innerHTML += createIconElement(iconURL, appName, src, protocol);
	});
	return div;
}

function createIconElement(url, title = "", src, protocol) {
	let onclick = `onclick="openApp('${src}', '${protocol}')"`;
	return `<img class="shortcut-card-program-icon" ${onclick} src="${url}" title="${title}"/>`;
}

function openApp(src, protocol) {
	if (!protocol) return;
	if (protocol == "browser") {
		openUrlInBrowser(src);
	}
}

function openUrlInBrowser(url) {
	electron.shell.openExternal(url);
}

// ----------
// Edit pane:
// ----------

function editApps() {
	displayUserData();
	let json = getUserPreferences();
	console.log(json);
	json["test"] = {
		creeper: "aww man",
		yeet: "skeet",
	};
	setUserJson(JSON.stringify(json));
	try {
		displayUserData();
	} catch (error) {
		setTimeout(() => {
			displayUserData();
		}, 3000);
	}
}

function editDrawer(drawerClicked) {
	if (drawerClicked) {
		openEditWindow("test");
	}
}

function openEditWindow(prefill) {
	if (prefill) {
		setLabelValue(prefill);
	} else {
		setLabelValue("");
	}
	goToElement("edit-view");
}

function getLabelValue() {
	return document.querySelector("#text-field-hero-input");
}

function setLabelValue(value) {
	var el = document.querySelector("#text-field-hero-input");
	el.value = value;
	// el.prefill = 
}

function getTitleOfEditButton(button) {
	// prettier-ignore
	// go up two levels, and get the card label.
	return button
		.parentElement
		.parentElement
		.getElementsByClassName("shortcut-card-label")[0]
		.textContent
}

// electron-json-storage had problems, and kept creating lock files
// when I didn't want it to.
// We're using it to create the storage file, but we'll use node to
// actually work with the file.
function setUserJson(newJson) {
	fs.writeFile(storagePath, newJson, function (err) {
		if (err) return console.log(err);
	});
}

function displayUserData() {
	let out = document.getElementById("user-json");
	let text = JSON.stringify(getUserPreferences());
	text = text.replace(/},/g, "}\t");
	text = text.replace(/}/g, "}\n");
	text += "\n ======== \n";
	out.innerText += text;
}
