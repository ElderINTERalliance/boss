// This is the renderer file for functions related
// to the App Drawer

// const app = require("electron");
const preferences = require("./preferences-handler");
const storage = require("electron-json-storage");
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
// This is run at script load
let drawer = document.getElementById("app-drawer");
drawer.append(createIcons());

// O(2n) complexity
function createIcons(data) {
	data = getUserPreferences();
	var list = document.createElement("ul");
	Object.values(data).forEach((drawer) => {
		Object.keys(drawer).forEach((appName) => {
			let app = drawer[appName];
			let iconURL = app["icon"];
			let src = app["src"];
			let protocol = app["protocol"];
			addApp(createIconElement(iconURL, appName), src, protocol, list);
		});
	});
	return list;
}

function createIconElement(url, title = "") {
	return `<img class="shortcut-card-program-icon" src="${url}" title="${title}"/>`;
}

function addApp(content, src, protocol, list) {
	list.innerHTML += `<li> ${content} </li>`;
	list.onclick = function () {
		openApp(src, protocol);
	};
}

function openApp(src, protocol) {
	console.log(src);
	console.log(protocol);
}
