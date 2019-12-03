const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const { FILES } = require('../../config');
const Dispatcher = require('../../src/dispatcher/dispatcher');

const dummyUdpClient = {};

describe('Dispatcher class', () => {
	let dispatcher;
	let dummyData = 'dummyData';
	let dummyName;

	beforeEach(() => {
		dummyName = FILES.DIR + (Math.floor(Math.random()*1000000)) + '.' + FILES.INACTIVE_BUFFER_FILE_EXTENSION;
		fs.writeFileSync(dummyName, dummyData);

		dispatcher = new Dispatcher({
			encryptedFileName: dummyName,
			recipientUdpClient: dummyUdpClient
		});
	});

	it('should create instance od FileCoder', () => {
		expect(dispatcher).to.be.instanceOf(Dispatcher);
	});

});