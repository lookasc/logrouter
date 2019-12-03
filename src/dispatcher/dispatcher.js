const { createReadStream } = require('fs');
const { createInterface } = require('readline');

class Dispatcher {

	constructor(config) {
		this.encryptedFileName = config.encryptedFileName;
		this.udpClient = config.recipientUdpClient;
	}

	sendPartedFile() {
		let lineByLineReader = createInterface({
			input: createReadStream(this.encryptedFileName),
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
				resolve(this.encryptedFileName);
			});
		});
	}

}

module.exports = Dispatcher;