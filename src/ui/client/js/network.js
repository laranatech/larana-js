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
	responseListeners.forEach((l) => {
		l.applyResponse(data);
	});
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

function connect(endpoint) {
	ws = new WebSocket(endpoint);

	ws.onerror = function (_) {
		endpoint = endpoint.replace("wss://", "ws://");
		ws.close();
		connect(endpoint);
	};
	ws.onmessage = function (e) {
		getMessage(e);
	};
	ws.onopen = function (_) {
		sendMessage({ event: 'open' });
	};
}

document.addEventListener('DOMContentLoaded', function () {
	onPageLoad();

	var initialResponse = JSON.parse('%INITIAL_RESPONSE%');

	applyResponse(initialResponse);

	var host = location.host;
	var protocol = "ws://";
	if (this.location.protocol == "https:") {
		protocol = "wss://";
	}
	var endpoint = protocol + host + "/ws";

	if (WS_PATH !== 'null' && WS_PATH !== null) {
		endpoint = WS_PATH;
	}

	connect(endpoint);
});
