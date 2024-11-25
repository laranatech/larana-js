/* eslint-disable */

var SESSION_ID = '%SESSION_ID%';
var WS_PATH = '%WS_PATH';

var ws = null;

var resizeTimeout = null;
var eventTimeout = null;

function throttle(mainFunction, delay) {
	let timerFlag = null;

	return (...args) => {
		if (timerFlag !== null) {
			return
		}
		mainFunction(...args);
		timerFlag = setTimeout(() => {
			timerFlag = null;
		}, delay);
	};
}

function getMessage(e) {
	var data = JSON.parse(e.data);
	applyResponse(data);
}

function sendMessage(data) {
	ws.send(JSON.stringify({
		data: data,
		w: window.innerWidth,
		h: window.innerHeight,
		sessionId: SESSION_ID,
	}));
}

// function delayMessage(data) {
// 	clearTimeout(eventTimeout);
// 	eventTimeout = setTimeout(function() {
// 		sendMessage(data);
// 	}, 100);
// }

const throttleMessage = throttle(sendMessage, 100);

function connect() {
	var host = location.host;
	var endpoint = "ws://" + host;

	if (WS_PATH !== 'null' || WS_PATH !== null) {
		endpoint = WS_PATH;
	}

	ws = new WebSocket(endpoint);
	ws.onmessage = function (e) {
		getMessage(e);
	};
	ws.onopen = function (e) {
		ws.send(JSON.stringify({
			data: {
				event: 'open',
			},
			w: window.innerWidth,
			h: window.innerHeight,
			sessionId: SESSION_ID,
		}));
	};
}

document.addEventListener('DOMContentLoaded', function () {
	onPageLoad();

	var initialResponse = JSON.parse('%INITIAL_RESPONSE%');

	applyResponse(initialResponse);
	connect();
});
