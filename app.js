require('dotenv').config();
const { FileBuffer } = require('filebuffer');
const DISPATCHER_PATH = './src/dispatcher';
const PublishController = require('./src/collector/publish-controller');
const CollectorServer = require('./src/collector/collector-server');
const Collector = require('./src/collector/collector');

var publishController = new PublishController({
	dispatcherPath: DISPATCHER_PATH
});

var bufferController = new FileBuffer({
	activeBufferMaxSize: '1M',
	allowTimeRollover: false
});

bufferController.on('bufferExchange', e => {
	publishController.dispatch(e.fileName);
});

var collectorServer = new CollectorServer({
	bufferController: bufferController
});

new Collector({
	server: collectorServer
});
