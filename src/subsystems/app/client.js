class ClientApp {
	name = 'Base';

	app = null;

	_init(app) {
		this.app = app;

		app.addMessageHanler(this._handleMessage);

		var listeners = this.getEventListeners();
		for (var i = 0; i < listeners.length; i++) {
			var l = listeners[i];
			app.addEventListener(l.event, l.callback);
		}
	}

	getEventListeners() {
		return [];
	}

	_handleMessage(message) {
		if (message.target != this.name) {
			return;
		}
		this.handleMessage(message);
	}

	handleMessage(message) {}

	sendMessage(message) {
		this._sendMessage(message);
	}

	_sendMessage(message) {
		if (!message.target) {
			message.target = this.name;
		}
		this.app.sendMessage(message);
	}
}
