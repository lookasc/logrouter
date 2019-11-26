const RecipientUdpClient = require('./recipient-udp-client');
const { createReadStream, createWriteStream } = require('fs');
const { createInterface } = require('readline');

class Dispatcher {

	constructor(encryptedFileName) {
		this.encryptedFileName = encryptedFileName;
		this.udpClient = new RecipientUdpClient();
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
			this.udpClient.isSendingLocked = true;
		});

		return new Promise((resolve, reject) => {
			this.udpClient.event.on('allItemsSent', () => {
				this.udpClient.close();
				resolve(this.encryptedFileName);
			});
		});
	}

}

module.exports = Dispatcher;