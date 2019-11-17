const dgram = require('dgram');
const BufferController = require('./buffer-controller');

var Collector = function (config) {
	this.PORT = config.PORT;
}

Collector.prototype.start = function () {
	console.log('Starting new Collector');

	this.ingestData = new BufferController();
	this.server = dgram.createSocket('udp4');

	this.server.on('listening', function () {
		var address = this.server.address();
		console.log('Logrouter listen on UDP ' + address.address + ':' + address.port);
	}.bind(this));

	this.server.on('message', function (message, remote) {
		console.log(JSON.stringify(JSON.parse(message.toString()), null, 2));
		this.ingestData.write(message);
	}.bind(this));

	this.server.bind(this.PORT);
}

module.exports = Collector;