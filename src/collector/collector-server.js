const { UDP } = require('../../config');
const dgram = require('dgram');


class CollectorServer {

	constructor(config) {
		console.log('Starting log collector server');
		this.server = dgram.createSocket('udp4');
		this.ingestDataBuffer = config.bufferController;

		this.server.on('listening', () => {
			let address = this.server.address();
			console.log('Collector server started and listen on UDP ' + address.address + ':' + address.port);
		});

		this.server.on('message', message => {
			this.ingestDataBuffer.write(message);
		});

		this.server.bind(UDP.LISTEN_PORT);
	}

}

module.exports = CollectorServer;