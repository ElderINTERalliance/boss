// This is the renderer file for functions related
// to the App Drawer

const child = require('child_process').execFile;
const path = require('path');
// const app = require("electron");
const preferences = require("./preferences-handler");
const storage = require("electron-json-storage");
const electron = require("electron");
const fs = require("fs");
const { projectName } = require("./preferences-handler");
const { shell } = require('electron');
const { exec } = require('child_process');

const defaultPath = storage.getDefaultDataPath();
// TODO - Make file path work across operating systems
const storagePath = `${defaultPath}\\${preferences.projectName}.json`;

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
	editDrawer("");
});

// console.log(document.querySelectorAll("#edit"))
document.querySelectorAll("#edit").forEach((element) => {
	element.onclick = function () {
		editDrawer(this)
	};
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
	root.className = "drawer-container"
	Object.keys(data).forEach((drawer) => {
		root.append(createDrawer(drawer, data[drawer]));
	});
	return root;
}

function createDrawer(drawerName, drawerContents) {
	let div = initializeDrawerElement(drawerContents.color);

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
	body.append(createDivFromIcons(drawerContents.programs));
	return div;
}

function openAllApps(clicked) {
	let appDrawer = clicked.parentElement.parentElement;
	let apps = appDrawer.getElementsByClassName("shortcut-card-program-icon");
	Object.values(apps).forEach((icon) => {
		icon.click();
	});
}

function initializeDrawerElement(color = "purple") {
	let div = document.createElement("div");
	div.innerHTML += `
	<div class="shortcut-card-home light-${color}">
		<div class="shortcut-card-icons">
			<div class="icon launch-button dark-${color}" id="launch">
				<i class="material-icons-round md-48">
					launch
				</i>
			</div>
			<div class="icon edit-button dark-${color}" id="edit">
				<i class="material-icons-round md-48">
					edit
				</i>
			</div>
		</div>
		<div class="shortcut-card-programs">
		</div>
		<h2 class="shortcut-card-label dark-${color}">
		</h2>
	</div>`;
	return div;
}

function createDivFromIcons(programs) {
	var div = document.createElement("div");
	programs.forEach((icons) => {
		// from the user json, each icon will have
		// at least a url, app name, src, and protocol
		Object.keys(icons).forEach((appName) => {
			let app = icons[appName];
			let src = app["src"];
			let protocol = app["protocol"];
			let iconURL = app["icon"];
			if (iconURL != undefined) {
				div.innerHTML += createIconElement(appName, src, protocol, iconURL);
			} else {
				div.innerHTML += createIconElement(appName, src, protocol);
			}
		});
	});
	return div;
}

function createIconElement(title = "", src, protocol, url = undefined) {
	let onclick = `onclick="openApp('${src}', '${protocol}')"`;
	if (url === undefined) {
		var parseURL = new URL(src);
		return `<img class="shortcut-card-program-icon" ${onclick} src="https://icons.duckduckgo.com/ip3/${parseURL.hostname}.ico" title="${title}"/>`;
	}
	return `<img class="shortcut-card-program-icon" ${onclick} src="${url}" title="${title}"/>`;
}

function openApp(src, protocol) {
	if (!protocol) return;
	if (protocol == "browser") {
		openUrlInBrowser(src);
	}
	if (protocol == "program") {
		openProgram(src);
	}
	if (protocol == "shortcut") {
		openShortcut(src);
	}
}

function openUrlInBrowser(url) {
	electron.shell.openExternal(url);
}

function openProgram(executablePath) {
	console.log(executablePath);
	child(executablePath, function(err, data) {
		if(err){
		console.error(err);
		return;
		}
	});
}

function openShortcut(shortcutPath) {
	// TODO: Add support for Windows Shortcuts
	console.log(shortcutPath);
	console.log("Shortcuts are not yet supported. Support is planned for a future version");
	shell.readShortcutLink(shortcutPath);
}

// ----------
// Edit pane:
// This is not finished yet, but I am prioritizing 
// a pretty product over a functional product.
// 
// To Do:
// - Add "Add Icon" button
// - Dynamically generate preview pane
// - make textbox labels float properly
// ----------

function editDrawer(buttonClicked) {
	if (buttonClicked) {
		openEditWindow(getTitleOfEditButton(buttonClicked))
	} else {
		openEditWindow("")
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
	// FIXME - Name implies text, but function returns html
	return document.querySelector("#input-drawer-name");
}

function setLabelValue(value) {
	var el = document.querySelector("#input-drawer-name");
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
