const { UDP } = require('../config');
const dgram = require('dgram');
const EventEmitter = require('events');

class RecipientUdpClient {

	constructor() {
		this.udpClient = dgram.createSocket('udp4');
		this.isInputClosed = false;
		this.event = new EventEmitter();
		this.messageCounter = 0;
	}

	send(message) {
		if (this.isInputClosed) return;

		this.messageCounter++;
		this.udpClient.send(message, 0, message.length, UDP.REMOTE_PORT, UDP.REMOTE_HOST, (err) => {
			if (err) process.send(err);
			if (--this.messageCounter === 0 && this.isInputClosed) {
				this.event.emit('allItemsSent');
			}
		});
	}

	close() {
		this.udpClient.close();
	}

	lockInput() {
		this.isInputClosed = true;
	}

	onAllItemsSent(callback) {
		this.event.on('allItemsSent', () => {
			this.close();
			callback();
		});
	}

}

module.exports = RecipientUdpClient;