const CollectorServer = require('./collector-server');

class Collector {

	constructor() {
		console.log('Starting log collector');
		this.server = new CollectorServer();
	}

}

module.exports = Collector;