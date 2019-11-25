const CollectorServer = require('./collector-server');

class Collector {

	constructor() {	}

	start() {
		console.log('Starting log collector');
		this.server = new CollectorServer(this.ingestDataBuffer);
	}

}

module.exports = Collector;