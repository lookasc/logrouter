const chai = require('chai');
const expect = chai.expect;
const BufferController = require('../../src/collector/buffer-controller');

describe('BufferController', () => {
	let bufferController;

	beforeEach(() => {
		bufferController = new BufferController();
	});

	it('should create instance od BufferController', () => {
		expect(bufferController).to.be.instanceOf(BufferController);
	});

});
