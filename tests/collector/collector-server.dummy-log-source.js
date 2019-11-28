const { UDP } = require('../../config');
const dgram = require('dgram');

var udpClient = dgram.createSocket('udp4');

process.on('message', (message) => {

	if (message.command === 'sendDummyLog') {
		udpClient.send(message.content, 0, message.content.length, UDP.REMOTE_PORT, UDP.REMOTE_HOST, (err) => {
			if (err) throw new Error(err);
		});
	}

	if (message.command === 'close') {
		udpClient.close(() => {
			process.exit(0);
		});
	}

});

