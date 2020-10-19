// This makes sure BOSS-preferences.json exists in the default storage directory.
// We store data outside of the app directory to make sure it is not reset on updates.
const storage = require("electron-json-storage");

// `projectName` is referenced in app-drawer-renderer.js
const projectName = "BOSS-preferences";

// This is the json that will populate the automatically created file
const defaultSettings = {
    "Web Design": {
        "color": "purple",
        "programs": [
            {
                "Spotify": {
                    "src": "https://play.spotify.com/",
                    "protocol": "browser"
                }
            },
            {
                "VS Code": {
                    "icon": "https://code.visualstudio.com/favicon.ico",
                    "src": "C:/Users/Kevin Long/AppData/Local/Programs/Microsoft VS Code/Code.exe",
                    "protocol": "program"
                }
            },
            {
                "Figma": {
                    "icon": "https://icons.duckduckgo.com/ip3/www.figma.com.ico",
                    "src": "C:/Users/Kevin Long/AppData/Local/Figma/Figma.exe",
                    "protocol": "program"
                }
            },
            {
                "Slack": {
                    "icon": "https://icons.duckduckgo.com/ip3/www.slack.com.ico",
                    "src": "C:/Users/Kevin Long/AppData/Local/slack/slack.exe",
                    "protocol": "program"
                }
            },
            {
                "Github": {
                    "src": "https://github.com",
                    "protocol": "browser"
                }
            },
            {
                "Chrome": {
                    "icon": "https://www.google.com/chrome/static/images/favicons/favicon-96x96.png",
                    "src": "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
                    "protocol": "program"
                }
            }
        ]
    },
    "Study & Chill": {
        "color": "blue",
        "programs": [
            {
                "Quizlet": {
                    "src": "https://quizlet.com/",
                    "protocol": "browser"
                }
            },
            {
                "Spotify": {
                    "src": "https://www.spotify.com/us/",
                    "protocol": "browser"
                }
            }
        ]
    },
    "Digital Labs": {
        "color": "yellow",
        "programs": [
            {
                "Zoom": {
                    "src": "https://www.zoom.us",
                    "protocol": "browser"
                }
            },
            {
                "Pearson": {
                    "src": "https://www.pearsonmylabandmastering.com/northamerica/",
                    "protocol": "browser"
                }
            },
            {
                "Pearson": {
                    "src": "https://www.pearsonmylabandmastering.com/northamerica/",
                    "protocol": "browser"
                }
            }
        ]
    },
    "Spanish 3": {
        "color": "red",
        "programs": [
            {
                "Homework": {
                    "src": "https://elderhs.myschoolapp.com/app/student#studentmyday/assignment-center",
                    "protocol": "browser"
                }
            },
            {
                "Duolingo": {
                    "src": "https://www.duolingo.com/learn",
                    "protocol": "browser"
                }
            },
            {
                "StudySpanish": {
                    "src": "https://studyspanish.com/my-account",
                    "protocol": "browser"
                }
            },
            {
                "VHL": {
                    "src": "https://www.vhlcentral.com",
                    "protocol": "browser"
                }
            },
            {
                "Quizlet": {
                    "src": "https://quizlet.com/",
                    "protocol": "browser"
                }
            },
            {
                "Zoom": {
                    "src": "https://www.zoom.us",
                    "protocol": "browser"
                }
            }
        ]
    },
    "Spanish 4": {
        "color": "green",
        "programs": [
            {
                "Excel": {
                    "icon": "https://c1-odc-15.cdn.office.net/start/s/161341441000_resources/favicon_excel.ico",
                    "src": "C:/Program Files/Microsoft Office/root/Office16/EXCEL.EXE",
                    "protocol": "program"
                }
            },
            {
                "Duolingo": {
                    "src": "https://www.duolingo.com/learn",
                    "protocol": "browser"
                }
            },
            {
                "StudySpanish": {
                    "src": "https://studyspanish.com/my-account",
                    "protocol": "browser"
                }
            },
            {
                "VHL": {
                    "src": "https://www.vhlcentral.com",
                    "protocol": "browser"
                }
            },
            {
                "Quizlet": {
                    "src": "https://quizlet.com/",
                    "protocol": "browser"
                }
            },
            {
                "Zoom": {
                    "src": "https://www.zoom.us",
                    "protocol": "browser"
                }
            }
        ]
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
