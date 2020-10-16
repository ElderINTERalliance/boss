// This is the renderer file for functions related
// to the App Drawer

// const app = require("electron");
const preferences = require("./preferences-handler");

// We are going to want to store all user data farther down the system path

const storage = require("electron-json-storage");

function openInBrowser(url) {
	console.log(storage.getDefaultDataPath());
}
