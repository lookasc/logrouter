const chai = require('chai');
const expect = chai.expect;
const PublishController = require('../../src/collector/publish-controller');
const dummyDispatcherPath = './tests/collector/dummy-dispatcher.test.js';

describe('PublishController class', () => {
	let publishController;

	before(() => {
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

	after(() => {
		publishController.dispatcherProcess.kill('SIGINT');
	});

});

