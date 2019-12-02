const { fork } = require('child_process');

class PublishController {

	constructor(config) {
		this.dispatcherProcess = this.initializeDispatcherProcess(config.dispatcherPath);  
	}

	initializeDispatcherProcess(DISPATCHER_PATH) {
		let dispatcher = fork(DISPATCHER_PATH);
		dispatcher.on('message', (message) => {
			console.log(message);
		});
		return dispatcher;
	}

	dispatch(fileName) {
		let message = {
			type: 'newFile',
			fileName: fileName
		};
		this.dispatcherProcess.send(message);
	}

}

module.exports = PublishController;