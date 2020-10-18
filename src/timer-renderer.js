// This is the renderer file for the Pomodoro Timer

var totalMins = 24;
var totalSecs = 59;
var mainLoop;

function displayTime(mins, secs) {
	if (secs < 0) return;
	let frame = document.getElementById("timer-frame");
	frame.innerText = `${zeroPad(mins)}:${zeroPad(secs)}`;
}

function controlCountdown(state) {
	if (state) {
		// This modifies a variable declared at
		// the top of this script.
		mainLoop = setInterval(countdown, 1000);
	} else {
		clearInterval(mainLoop);
	}
}

function countdown() {
    // TODO - make this not dependant on interval,
    // and depend on system time instead
	displayTime(totalMins, totalSecs);
	changeTime(0, -1);
}

function changeTime(mins, secs) {
	if (totalSecs < 0) {
		totalMins -= 1;
		totalSecs += 59;
		displayTime(totalMins, totalSecs);
	} else if (totalSecs > 60) {
		totalMins += 1;
		totalSecs -= 60;
		displayTime(totalMins, totalSecs);
	} else {
		totalMins += mins;
		totalSecs += secs;
	}
}

function setTime(mins, secs) {
	totalMins = 0;
	totalSecs = 0;
	changeTime(mins, secs);
}

function zeroPad(num) {
	if (num < 10) {
		return `0${num}`;
	} else {
		return `${num}`;
	}
}
