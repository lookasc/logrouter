const BufferController = require('./buffer-controller');
const CollectorServer = require('./collector-server');

class Collector {

	constructor() {	}

	start() {
		console.log('Starting log collector');
		this.ingestDataBuffer = new BufferController();
		this.server = new CollectorServer(this.ingestDataBuffer);
	}

}

module.exports = Collector;