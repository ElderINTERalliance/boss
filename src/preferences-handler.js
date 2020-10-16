// This makes sure BOSS-preferences.json exists in the default storage directory.
// We store data outside of the app directory to make sure it is not reset on updates.
const storage = require("electron-json-storage");

// `projectName` is referenced in app-drawer-renderer.js
const projectName = "BOSS-preferences";

const defaultSettings = { foo: "bar" };

function createFile() {
	storage.set(projectName, { foo: "bar" }, function (error) {
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
