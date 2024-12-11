class ClientApp {
	subsystems = [];

	networker = null;

	init(networker) {
		this.networker = networker;
		networker.init(this);

		for (var i = 0; i < this.subsystems.length; i++) {
			var s = this.subsystems[i];
			s.init(this);
		}
	}

	sendMessage(message) {
		this.networker.sendMessage(message);
	}
}
