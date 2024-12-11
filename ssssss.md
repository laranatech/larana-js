# Existing subsystems

1. Router
2. SessionManager -> Sessioner
3. Renderer
4. (Networker)
5. (Pager)
6. (Filer)

# Lifecycle

1. [CLIENT] User opens `/article/:slug/`
2. [SERVER] Handles request
- resolves route [Router]
- resolve session [Sessioner]
- creates page [ServerCore]
- renders page [Renderer]
- creating client code (including rendered page) [Renderer]
- sending client code to client [Networker]
3. [CLIENT] recieves response
- recieving client code [ClientCore]
- [NEW] add subsystem listeners
- initializing canvas [Renderer]
- patching image [Renderer]
- adding event listeners [Networker?]
- connecting to websockets [Networker]

4 [CLIENT-SERVER] 
- [SERVER2CLIENT] sending rendering data [Renderer]
- [SERVER2CLIENT] sending routing event [Router]
- [SERVER2CLIENT] localStorage [SessionManager]
- [SERVER2CLIENT] listen for new message [Networker?]
- [CLIENT2SERVER] sending new event [click/scroll/etc]

# Server code



# Client code

```js

%SUBSYSTEM_CLASSES%

class ClientCore {
	subsystems = [
		%SUBSYSTEM_CLASSES_CONSTUCT%
	];

	networker = new Networker();

	init() {
		this.networker.init(this);
		subsystems.forEach((s) => {
			s.init(this);
		});
	}
}

class Networker {
	name = 'Networker';

	messageHandlers = [];
	eventListeners = [];

	init(core) {
		connectToWebSocket();
		messageHandlers.push();
	}

	handleMessage(message) {
		messageHandlers.forEach((listen) => {
			listen(this, message);
		});
	}

	addMessageHandlers() {}
	removerMessageHandlers() {}

	addEventListener() {}
	removeEventListener() {}
}

class BaseSubsystem {}

class Router extends BaseSubsystem {
	name = 'Router';
	core = null;

	init(core) {
		this.core = core;

		this.networker.addMessageHandlers(this.handleMessage);
		this.networker.addEventListener('click', handleLinkClick);
	}

	handleLinkClick() {}

	handleMessage(message) {
		const m = {
			sender: 'router',
			data: {},
		};

		if (message.sender !== 'router') {
			return;
		}

		if (message.data.type === 'push') {
			location.push(message.data.url);
			this.core.sendMessageToSubsystem(this.name, {...});
		}

		///
	}
}

class Renderer extends BaseSubsystem {
	name = 'Renderer'
	handleMessage(message) {
		const m = {
			sender: 'router',
			data: {}
		}

		if (message.sender !== 'renderer') {
			return;
		}

		if (message.data.type === 'image') {
			ctx.drawImage(...)
		}

		///
	}
}


document.addEventListener('DOMContentLoaded', () => {
	const core = new ClientCore();

	core.init();
	// subsystems.forEach((s) => {

	// });
});


```
