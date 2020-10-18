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
		"Chrome":{
			"icon": "https://www.google.com/chrome/static/images/favicons/favicon-96x96.png",
			"src": "https://www.google.com",
			"protocol": "browser"
		},
	},
	"Study & Chill":{
		"Quizlet":{
			"icon": "https://quizlet.com/favicon.ico",
			"src": "https://quizlet.com/",
			"protocol": "browser"
		},
		"Spotify": {
			"icon": "https://www.scdn.co/i/_global/favicon.png",
			"src": "https://www.spotify.com/us/",
			"protocol": "browser"
		}
	},
	"Digital Labs":{
		"Zoom":{
			"icon": "https://images-na.ssl-images-amazon.com/images/I/61DZY6oW0PL.png",
			"src": "https://www.zoom.us",
			"protocol": "browser"
		},
		"Pearson": {
			"icon": "https://www.pearsonmylabandmastering.com/northamerica/assets/images/favicon/default/favicon.ico",
			"src": "https://www.pearsonmylabandmastering.com/northamerica/",
			"protocol": "browser"
		},
		"Pearson": {
			"icon": "https://www.pearsonmylabandmastering.com/northamerica/assets/images/favicon/default/favicon.ico",
			"src": "https://www.pearsonmylabandmastering.com/northamerica/",
			"protocol": "browser"
		}
	},
	"Spanish 3": {
		"Homework":{
			"icon": "https://bbk12e1-cdn.myschoolcdn.com/ftpimages/1145/logo/favicon.ico",
			"src": "https://elderhs.myschoolapp.com/app/student#studentmyday/assignment-center",
			"protocol": "browser"
		},
		"Duolingo":{
			"icon": "https://cdn.jim-nielsen.com/ios/512/duolingo-2019-01-02.png",
			"src": "https://www.duolingo.com/learn",
			"protocol": "browser"
		},
		"StudySpanish":{
			"icon": "https://studyspanish.com/favicon.ico",
			"src": "https://studyspanish.com/my-account",
			"protocol": "browser"
		},
		"VHL":{
			"icon": "https://www.vhlcentral.com/favicon-32x32.png",
			"src": "https://www.vhlcentral.com",
			"protocol": "browser"
		},
		"Quizlet":{
			"icon": "https://quizlet.com/favicon.ico",
			"src": "https://quizlet.com/",
			"protocol": "browser"
		},
		"Zoom":{
			"icon": "https://images-na.ssl-images-amazon.com/images/I/61DZY6oW0PL.png",
			"src": "https://www.zoom.us",
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
