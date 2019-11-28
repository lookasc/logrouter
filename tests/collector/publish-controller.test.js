const chai = require('chai');
const expect = chai.expect;
const PublishController = require('../../src/collector/publish-controller');

describe('PublishController class', () => {
	let publishController;

	beforeEach(() => {
		publishController = new PublishController();
	});

	it('should create instance of PublishController', () => {
		expect(publishController).to.be.instanceOf(PublishController);
	});

});