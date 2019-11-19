const FileQueue = require('./file-queue');

class PublishController {

	constructor() {
		this.files = new FileQueue();
		// new thread ?
	}

	enqueueFile(fileName) {
		this.files.add(fileName);
	}

}

module.exports = new PublishController();