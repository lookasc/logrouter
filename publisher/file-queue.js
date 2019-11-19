class FileQueue {

	constructor() {
		this.fileList = [];
	}

	add(fileName) {
		this.fileList.push(fileName);
	}

	get() {
		// get first element or undefined if not exist
		return this.fileList.shift();
	}

	length() {
		return this.fileList.length;
	}

}

module.exports = FileQueue;