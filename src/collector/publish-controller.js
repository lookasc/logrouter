const { fork } = require('child_process');

class PublishController {

	constructor(config) {
		this.dispatcherPath = config.dispatcherPath;
		this.dispatcherProcess = this.initializeDispatcherProcess(this.dispatcherPath);  
	}

	initializeDispatcherProcess(DISPATCHER_PATH) {
		let dispatcher = fork(DISPATCHER_PATH);
		dispatcher.on('message', (message) => {
			console.log(message);
		});

		dispatcher.on('close', this.reinitializeDispatcherProcess);
		dispatcher.on('disconnect', this.reinitializeDispatcherProcess);
		dispatcher.on('error', this.reinitializeDispatcherProcess);
		dispatcher.on('exit', this.reinitializeDispatcherProcess);

		return dispatcher;
	}

	reinitializeDispatcherProcess() {
		if (!!this.dispatcherProcess && !this.dispatcherProcess.killed) {
			this.dispatcherProcess.kill('SIGINT');
			this.dispatcherProcess = this.initializeDispatcherProcess(this.dispatcherPath);  
		}
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