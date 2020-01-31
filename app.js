require('dotenv').config();
const { FileBuffer } = require('filebuffer');
const DISPATCHER_PATH = './src/dispatcher';
const PublishController = require('./src/collector/publish-controller');
const CollectorServer = require('./src/collector/collector-server');
const { FILES } = require('./config');

console.log(`Starting logrouter with process PID=${process.pid}`);

var publishController = new PublishController({
	dispatcherPath: DISPATCHER_PATH
});

var bufferController = new FileBuffer({
	activeBufferMaxSize: FILES.ACTIVE_BUFFER_MAX_SIZE,
	activeBufferMaxAge: FILES.ACTIVE_BUFFER_MAX_AGE,
	allowTimeRollover: true
});

bufferController.on('bufferExchange', e => {
	publishController.dispatch(e.fileName);
});

new CollectorServer({
	bufferController: bufferController
});
