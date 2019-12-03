const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const { FILES } = require('../../config');
const Dispatcher = require('../../src/dispatcher/dispatcher');

const dummyUdpClient = {
	sentLines: 0,
	isLocked: false,
	send: function (line) {
		this.sentLines++;
	},
	lockInput: function () {
		this.isLocked = true;
	},
	onAllItemsSent: function (callback) {
		setTimeout(() => {
			callback();
		}, 5);
	}
};

describe('Dispatcher class', () => {
	let dispatcher;
	let dummyData = 'dummyData\ndummyData';
	let dummyName;

	beforeEach(() => {
		dummyName = FILES.DIR + (Math.floor(Math.random()*1000000)) + '.' + FILES.ENCRYPTED_BUFFER_FILE_EXTENSION;
		fs.writeFileSync(dummyName, dummyData);

		dispatcher = new Dispatcher({
			encryptedFileName: dummyName,
			recipientUdpClient: dummyUdpClient
		});
	});

	it('should create instance od FileCoder', () => {
		expect(dispatcher).to.be.instanceOf(Dispatcher);
	});

	it('should send 2 lines of data and resolve with file name', (done) => {
		dispatcher.sendPartedFile()
			.then((encryptedFileName) => {
				expect(encryptedFileName).to.equal(dummyName);
				expect(dispatcher.udpClient.sentLines).to.equal(2);
				expect(dispatcher.udpClient.isLocked).to.be.true;
				done();
			});
	});

});