var ENDPOINT = '%WS_PATH%';
var SESSION_ID = '%SESSION_ID%';

var ws = null;

var resizeTimeout = null;
var eventTimeout = null;

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

function delayMessage(data) {
	clearTimeout(eventTimeout);
	eventTimeout = setTimeout(function() {
		sendMessage(data);
	}, 100);
}

function connect() {
	ws = new WebSocket(ENDPOINT);
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
