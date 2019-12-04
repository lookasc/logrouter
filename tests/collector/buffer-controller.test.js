const chai = require('chai');
const expect = chai.expect;
const BufferController = require('../../src/collector/buffer-controller');
const { FILES } = require('../../config');
const { convertSizeStringToByteNumber } = require('../../src/utils');

const dummyPublishController = {
	dispatch: (fileName) => console.log(`BufferController's dispatched the file ${fileName}`)
};

describe('BufferController class', () => {
	let bufferController;
	let dummyData = 'dummyData';

	beforeEach(() => {
		bufferController = new BufferController({
			publishController: dummyPublishController
		});
	});

	it('should create instance of BufferController', () => {
		expect(bufferController).to.be.instanceOf(BufferController);
	});

	it('should write data to buffer', () => {
		bufferController.write(dummyData);
		expect(bufferController.activeBuffer.size).to.equal(dummyData.length);
	});

	it('should rollover buffer when overloaded', (done) => {
		let byte = 'd';
		let bufferNameSnapshot = bufferController.activeBuffer.name;
		let maxSize = convertSizeStringToByteNumber(FILES.ACTIVE_BUFFER_MAX_SIZE);
		var data = new Array(maxSize + 1).join(byte);
		bufferController.write(data);
		expect(bufferController.activeBuffer.size).to.equal(maxSize);
		bufferController.write('should cause rollover event');
		setTimeout(() => {
			expect(bufferController.activeBuffer.size).to.equal(0);
			expect(bufferController.activeBuffer.name).to.not.equal(bufferNameSnapshot);
			done();
		}, 5);
	});

	it('should rollover buffer when max age exceeded & size > 0', (done) => {
		let bufferNameSnapshot = bufferController.activeBuffer.name;
		bufferController.write(dummyData);
		expect(bufferController.activeBuffer.size).to.equal(dummyData.length);
		setTimeout(() => {
			expect(bufferController.activeBuffer.size).to.equal(0);
			expect(bufferController.activeBuffer.name).to.not.equal(bufferNameSnapshot);
			done();
		}, FILES.ACTIVE_BUFFER_MAX_AGE * 1000 + 10);
	});

	it('should not rollover buffer when max age exceeded & size == 0', (done) => {
		let bufferNameSnapshot = bufferController.activeBuffer.name;
		expect(bufferController.activeBuffer.size).to.equal(0);
		setTimeout(() => {
			expect(bufferController.activeBuffer.size).to.equal(0);
			expect(bufferController.activeBuffer.name).to.equal(bufferNameSnapshot);
			done();
		}, FILES.ACTIVE_BUFFER_MAX_AGE * 1000 + 10);
	});

});
