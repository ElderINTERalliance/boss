const url =
	"https://elderhs.myschoolapp.com/podium/feed/iCal.aspx?z=DHNXyPXuma0tTJX%2ble%2f18p%2fX5Eu1G0p0RXoK78NAIe4e3GH1vgNj0DzT8Ob7rbKHnMy2wmKLyv%2bg%2ffeuVoFb7g%3d%3d";
const ical = require("ical");
const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

load(url);

// modified from https://stackoverflow.com/questions/10642289/return-html-content-as-a-string-given-url-javascript-function
function load(theUrl) {
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			loadEvents(xmlhttp.responseText);
		}
	};
	xmlhttp.open("GET", theUrl, false);
	xmlhttp.send();
}

function loadEvents(data) {
	let events = ical.parseICS(data);
    // events.sort(

    // )
	Object.values(events).forEach((assignment) => {
		addToSchedule(assignment);
	});
}

function addToSchedule(data) {
	let assignment = document.createElement("div");
	let header = document.createElement("h3");
	let text = document.createElement("p");
	let due = document.createElement("p");

	header.textContent = data["summary"];

	if (data["description"]) {
		text.textContent = data["description"].replaceAll("&#160;", "");
	}

	due.textContent = data["start"];

	assignment.append(header);
	assignment.append(text);
	assignment.append(due);

	let frame = document.getElementById("schedule-content");
	frame.appendChild(assignment);
}
