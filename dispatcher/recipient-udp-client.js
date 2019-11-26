const { UDP } = require('../config');
const dgram = require('dgram');

class RecipientUdpClient {

	constructor() {
		this.udpClient = dgram.createSocket('udp4');
	}

	send(message) {
		this.udpClient.send(message, 0, message.length, UDP.REMOTE_PORT, UDP.REMOTE_HOST, (err) => {
			if (err) process.send(err);
		});
	}

	close() {
		this.udpClient.close();
	}

}

module.exports = RecipientUdpClient;