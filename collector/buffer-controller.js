const { FILES } = require('../config');
const Buffer = require('./buffer');
const indexGenerator = require('ulid').monotonicFactory();

class BufferController {

	constructor() {
		console.log('Creating new file buffer controller')
		this.activeBuffer = new Buffer(indexGenerator);
		this.exchangingBufferNow = false;
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
				oldBuffer.close();
				this.exchangingBufferNow = false;
			});
	}

}

module.exports = BufferController;