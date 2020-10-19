// This is the renderer file for the Pomodoro Timer

var totalMins = 24;
var totalSecs = 59;
var startMins = 0;
var startSecs = 0;
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
		// account for the startup time of the interval
		countdown();
	} else {
		clearInterval(mainLoop);
	}
}

function countdown() {
	// TODO - make this not dependant on interval,
	// and depend on system time instead
	displayTime(totalMins, totalSecs);
	if (totalSecs==0&&totalMins==0) stopTimer();
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
	startSecs = 0;
	startMins = 0;
	changeTime(mins, secs);
	displayTime(totalMins, totalSecs);
}

function zeroPad(num) {
	if (num < 10) {
		return `0${num}`;
	} else {
		return `${num}`;
	}
}

// TODO - make it so that clicking start button twice
// does not mess up the timer
function startTimer() {
	controlCountdown(true);
	let startBtn = document.getElementById("start-button");
	startBtn.className = "mdc-button mdc-button--outlined";
	startBtn.disabled = true;

	let stopBtn = document.getElementById("stop-button");
	stopBtn.className = "mdc-button mdc-button--raised";
	stopBtn.disabled = false;

	startMins = totalMins;
	startSecs = totalSecs;
}

function stopTimer() {
	controlCountdown(false);
	let startBtn = document.getElementById("start-button");
	startBtn.className = "mdc-button mdc-button--raised";
	startBtn.disabled = false;

	let stopBtn = document.getElementById("stop-button");
	stopBtn.className = "mdc-button mdc-button--outlined";
	stopBtn.disabled = true;

	// frame.textContent = secsRunning;
	log(startMins - totalMins, startSecs - totalSecs);
}

function log(mins, secs) {
	if (mins < 0 || secs < 0) return
	secs += 1 // account for instant decrease at timer start
	let frame = document.getElementById("timer-log-frame")
	let s = "s"
	if (secs == 1) s = "" 
	frame.innerHTML += `<p>${mins} minutes ${secs} second${s}</p>`
}
