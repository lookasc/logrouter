const { fork } = require('child_process');
const DISPATCHER_PATH = './dispatcher/dispatcher';

class PublishController {

	constructor() {
		this.dispatcherProcess = this.initializeDispatcherProcess();  
	}

	initializeDispatcherProcess() {
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
		}
		this.dispatcherProcess.send(message);
	}

}

module.exports = PublishController;