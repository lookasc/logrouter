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

		return new Promise((resolve, reject) => {
			lineByLineReader.on('close', () => {
				// this.udpClient.close();
				resolve(this.encryptedFileName);
			});
		});
	}

}

module.exports = Dispatcher;