const { createReadStream } = require('fs');
const { createInterface } = require('readline');

class Dispatcher {

	constructor(config) {
		this.fileToDispatch = config.fileToDispatch;
		this.udpClient = config.recipientUdpClient;
	}

	sendPartedFile() {
		let lineByLineReader = createInterface({
			input: createReadStream(this.fileToDispatch),
			crlfDelay: Infinity
		});

		lineByLineReader.on('line', (line) => {
			this.udpClient.send(line);
		});

		lineByLineReader.on('close', () => {
			this.udpClient.lockInput();
		});

		return new Promise(resolve => {
			this.udpClient.onAllItemsSent(() => {
				resolve(this.fileToDispatch);
			});
		});
	}

}

module.exports = Dispatcher;