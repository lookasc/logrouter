const { INGEST, STORE } = require('../config');
const { createWriteStream } = require('fs');

var Buffer = function () {
	this.size = 0;
	this.name = null;
	this.stream = null;
	createNewActiveBuffer.call(this);
}

Buffer.prototype.write = function (data) {
	this.size += data.length;
	console.log(this.size);
	this.stream.write(data + '\n');
}

Buffer.prototype.close = function () {
	this.stream.end(() => {
		console.log(`File buffer closed: ${this.name}`);
	});
}

Buffer.prototype.get = function () {
	return this.stream;
}

var createNewActiveBuffer = function () {
	let dir = STORE.DIR;
	this.name = `${dir}${getNewActiveBufferFileName()}`;
	this.stream = createWriteStream(this.name);
}

var getNewActiveBufferFileName = function () {
	let timestamp = Date.now();
	let random = Math.floor(Math.random()*10000000000000);
	let extension = INGEST.ACTIVE_BUFFER_FILE_EXTENSION;
	return `${timestamp}.${random}.${extension}`;
}

module.exports = Buffer;