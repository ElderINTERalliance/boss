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
var loaded = false;

function loadOnClick() {
	if (!loaded)
	load(url);
}

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
	loaded = true;
}

function loadEvents(data) {
	// let date1 = new Date("Mon Aug 24 2020 00:00:00 GMT-0400 (Eastern Daylight Time)")
	// let date2 = new Date("Mon Aug 24 2020 00:00:00 GMT-0400 (Eastern Daylight Time)")
	// console.log(date1.getTime());

	let events = ical.parseICS(data);
    var parsedList = [];

    // take string data and get important parts
	Object.values(events).forEach((assignment) => {
		let parsed = {};
		parsed.start = assignment["start"];
		parsed.summary = assignment["summary"];
		parsed.description = assignment["description"];
		parsedList.push(parsed);
    });
    
    // Sort by date
	parsedList.sort((a, b) => {
		// Turn your strings into dates, and then subtract them
		// to get a value that is either negative, positive, or zero.
		return new Date(b.start) - new Date(a.start);
    });

	Object.values(parsedList).forEach((assignment) => {
		addToSchedule(assignment);
    });

	// console.log(parsedList);
}

// This is trash code but I don't have much time left
function addToSchedule(data) {
	let assignment = document.createElement("div");
	let header = document.createElement("h3");
	let text = document.createElement("p");
	let due = document.createElement("p");
    due.className = "duedate";
    assignment.className = "assignment"

	header.textContent = data["summary"];

	if (data["description"]) {
		text.textContent = data["description"].replaceAll("&#160;", "");
	}

	if (data["start"]) {
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		let time = new Date(Date.parse(data["start"]));
		due.textContent = "Due: " + time.toLocaleDateString("en", options);
	}

	assignment.append(header);
	assignment.append(text);
	assignment.append(due);

	let frame = document.getElementById("schedule-content");
	frame.appendChild(assignment);
}
