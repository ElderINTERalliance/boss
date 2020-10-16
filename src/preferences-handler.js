// This makes sure BOSS-preferences.json exists in the default storage directory.
// We store data outside of the app directory to make sure it is not reset on updates.
const storage = require("electron-json-storage");

// `projectName` is referenced in app-drawer-renderer.js
const projectName = "BOSS-preferences";

// This is the json that will populate the automatically created file
const defaultSettings = {
	"Default-Name": {
		"Figma": {
			"icon": "https://www.scdn.co/i/_global/favicon.png",
			"src": "https://example.com",
			"protocol": "browser"
		},
		"VSCode":{
			"icon": "https://code.visualstudio.com/favicon.ico",
			"src": "https://example.com",
			"protocol": "browser"
		}
	}
};

function createFile() {
	storage.set(projectName, defaultSettings, function (error) {
		if (error) throw error;
	});
}

function setUp() {
	storage.has(projectName, function (error, hasKey) {
		if (error) throw error;

		// If there is no preferences file, create it
		if (!hasKey) {
			createFile();
		}
	});
}

module.exports = { setUp, projectName };
