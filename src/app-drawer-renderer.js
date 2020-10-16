// This is the renderer file for functions related
// to the App Drawer

// const app = require("electron");
const preferences = require("./preferences-handler");
const storage = require("electron-json-storage");
const electron = require("electron");
const fs = require("fs");

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
let drawerList = document.getElementById("shortcuts-list")
drawerList.append(parsePreferences(getUserPreferences()));
// __________________________

// Takes user preferences, and returns a list
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
		openAllApps(this)
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
	let apps = appDrawer.getElementsByClassName("shortcut-card-program-icon")
	console.log(apps);
}

function initializeDrawerElement() {
	let div = document.createElement("div");
	div.innerHTML += `
	<div class="shortcut-card-home">
		<div class="shortcut-card-icons">
			<div class="icon launch-button" id="launch"><i class="material-icons-round md-48">launch</i></div>
			<div class="icon edit-button" id="edit"><i class="material-icons-round md-48">edit</i></div>
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
		addApp(createIconElement(iconURL, appName), src, protocol, div);
	});
	return div;
}

function createIconElement(url, title = "") {
	return `<img class="shortcut-card-program-icon" src="${url}" title="${title}"/>`;
}

function addApp(icon, src, protocol, div) {
	div.innerHTML += `${icon}`;
	div.onclick = function () {
		openApp(src, protocol);
	};
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
