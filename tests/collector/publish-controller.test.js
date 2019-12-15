const chai = require('chai');
const expect = chai.expect;
const PublishController = require('../../src/collector/publish-controller');
const dummyDispatcherPath = './tests/collector/dummy-dispatcher.test.js';

describe('PublishController class', () => {
	let publishController;

	beforeEach(() => {
		publishController = new PublishController({
			dispatcherPath: dummyDispatcherPath
		});
	});

	it('should create instance of PublishController', () => {
		expect(publishController).to.be.instanceOf(PublishController);
	});

	it('should dispatch file', (done) => {
		let dummyFileName = 'qwerty';
		publishController.dispatcherProcess.on('message', (message) => {
			expect(message).to.equal(dummyFileName);
			done();
		});
		publishController.dispatch(dummyFileName);
	});

	it('should reinitialize dispatcher', (done) => {
		let pid = publishController.dispatcherProcess.pid;
		publishController.reinitializeDispatcherProcess();
		setTimeout(() => {
			expect(pid).to.not.equal(publishController.dispatcherProcess.pid);
			done();
		}, 20);
	});

	afterEach(() => {
		publishController.dispatcherProcess.kill('SIGINT');
	});

});

