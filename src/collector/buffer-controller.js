const Buffer = require('./buffer');
const indexGenerator = require('ulid').monotonicFactory();
const { FILES } = require('../../config');

class BufferController {

	constructor(config) {
		console.log('Creating new file buffer controller');
		this.activeBuffer = new Buffer(indexGenerator);
		this.exchangingBufferNow = false;
		this.publishController = config.publishController;

		setInterval(() => {
			if (this.activeBuffer.size) this.rolloverBuffer();
		}, FILES.ACTIVE_BUFFER_MAX_AGE * 1000);
	}

	write(data) {
		let shouldRolloverBuffer = (!this.exchangingBufferNow && this.activeBuffer.isOverloaded());
		if (shouldRolloverBuffer) {
			this.rolloverBuffer();
		}
		this.activeBuffer.write(data);
	}

	rolloverBuffer() {
		this.exchangingBufferNow = true;
		let newBuffer = new Buffer(indexGenerator);
		newBuffer
			.waitUntilReady()
			.then(() => {
				let oldBuffer = this.activeBuffer;
				this.activeBuffer = newBuffer;
				oldBuffer.close(storedBufferName => {
					this.publishController.dispatch(storedBufferName);
				});
				this.exchangingBufferNow = false;
			});
	}

}

module.exports = BufferController;