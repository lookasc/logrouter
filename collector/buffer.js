const { FILES } = require('../config');
const { createWriteStream, rename } = require('fs');
const { convertSizeStringToByteNumber } = require('../utils');

class Buffer {

	constructor(generateULID) {
		let timestamp = Date.now();
		let ulid = generateULID(timestamp);
		let extension = FILES.ACTIVE_BUFFER_FILE_EXTENSION;

		this.size = 0;
		this.maxSize = convertSizeStringToByteNumber(FILES.ACTIVE_BUFFER_MAX_SIZE);
		this.name = `${FILES.DIR}${timestamp}.${ulid}.${extension}`;
		this.stream = createWriteStream(this.name);
	}

	write(data) {
		this.size += data.length;
		this.stream.write(data + '\n');
	}

	close(callback) {
		this.stream.end(() => {
			this.deactivate()
				.then(callback);
		});
	}

	deactivate() {
		return new Promise(resolve => {
			let strToReplace = new RegExp(FILES.ACTIVE_BUFFER_FILE_EXTENSION, 'g');
			let oldName = `${this.name}`;
			let newName = oldName.replace(strToReplace, FILES.INACTIVE_BUFFER_FILE_EXTENSION);
			rename(oldName, newName, (err) => {
				if (err) throw new Error(err);
				resolve(newName);
			});
		});
	}

	isOverloaded() {
		return (this.size >= this.maxSize);
	}

	waitUntilReady() {
		return new Promise(resolve => {
			this.stream.on('ready', () => resolve());
		});
	}
	
}

module.exports = Buffer;