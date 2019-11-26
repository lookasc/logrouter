const { UDP } = require('../config');
const dgram = require('dgram');
const EventEmitter = require('events');

class RecipientUdpClient {

	constructor() {
		this.udpClient = dgram.createSocket('udp4');
		this.isSendingLocked = false;
		this.event = new EventEmitter();
		this.messageCounter = 0;
	}

	send(message) {
		this.messageCounter++;
		this.udpClient.send(message, 0, message.length, UDP.REMOTE_PORT, UDP.REMOTE_HOST, (err) => {
			if (err) process.send(err);
			if (--this.messageCounter === 0) {
				this.event.emit('allItemsSent');
			};
		});
	}

	close() {
		this.udpClient.close();
	}

}

module.exports = RecipientUdpClient;