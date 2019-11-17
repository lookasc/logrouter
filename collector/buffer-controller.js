const { INGEST } = require('../config');
const Buffer = require('./buffer');
const { convertSizeStringToByteNumber } = require('../utils');

var BufferController = function () {
	this.activeBuffer = new Buffer();
	this.maxSize = convertSizeStringToByteNumber(INGEST.ACTIVE_BUFFER_MAX_SIZE);
	this.isChangingBuffer = false;
}

BufferController.prototype.write = function (data) {
	let shouldRolloverBuffer = (!this.isChangingBuffer && isBufferOverloaded.call(this));

	if (shouldRolloverBuffer) {
		this.isChangingBuffer = true;
		this.rolloverBuffer(() => {
			this.isChangingBuffer = false;
		});
	}

	this.activeBuffer.write(data);
}

BufferController.prototype.rolloverBuffer = function (callback) {
	let newBuffer = new Buffer();
	newBuffer.get().on('ready', () => {
		let lastBuffer = this.activeBuffer;
		this.activeBuffer = newBuffer;
		lastBuffer.close();
		callback();
	});
}

var isBufferOverloaded = function () {
	return (this.activeBuffer.size >= this.maxSize);
}

module.exports = BufferController;