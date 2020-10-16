// This makes sure BOSS-preferences.json exists in the default storage directory.
// We store data outside of the app directory to make sure it is not reset on updates.
const storage = require("electron-json-storage");

// `projectName` is referenced in app-drawer-renderer.js
const projectName = "BOSS-preferences";

// This is the json that will populate the automatically created file
const defaultSettings = {
	"Web Design": {
		"Spotify": {
			"icon": "https://www.scdn.co/i/_global/favicon.png",
			"src": "https://www.spotify.com/us/",
			"protocol": "browser"
		},
		"VSCode":{
			"icon": "https://code.visualstudio.com/favicon.ico",
			"src": "https://example.com",
			"protocol": "browser"
		},
		"Figma":{
			"icon": "https://static.figma.com/app/icon/1/favicon.png",
			"src": "https://www.figma.com",
			"protocol": "browser"
		},
		"Slack":{
			"icon": "https://a.slack-edge.com/80588/marketing/img/meta/favicon-32.png",
			"src": "https://slack.com",
			"protocol": "browser"
		},
		"Github":{
			"icon": "https://github.githubassets.com/pinned-octocat.svg",
			"src": "https://github.com",
			"protocol": "browser"
		},
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
