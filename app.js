require('dotenv').config();
const DISPATCHER_PATH = './src/dispatcher/';
const PublishController = require('./publish-controller');
const BufferController = require('./buffer-controller');
const CollectorServer = require('./collector-server');
const Collector = require('./src/collector');

var publishController = new PublishController({
	dispatherPath: DISPATCHER_PATH
});

var bufferController = new BufferController({
	publishController: publishController
});

var collectorServer = new CollectorServer({
	bufferController: bufferController
});

new Collector({
	server: collectorServer
});
