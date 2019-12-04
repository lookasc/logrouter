const chai = require('chai');
const expect = chai.expect;
const RecipientUdpClient = require('../../src/dispatcher/recipient-udp-client');

describe('RecipientUdpClient class', () => {
	let recipientUdpClient;
	let dummyData = 'dummyData';

	beforeEach(() => {
		recipientUdpClient = new RecipientUdpClient();
	});

	it('should create instance od RecipientUdpClient', () => {
		expect(recipientUdpClient).to.be.instanceOf(RecipientUdpClient);
	});

	it('should have messageCounter=0 & isInputClosed=false', () => {
		expect(recipientUdpClient.messageCounter).to.equal(0);
		expect(recipientUdpClient.isInputClosed).to.be.false;
	});

	it('should lock input', () => {
		expect(recipientUdpClient.isInputClosed).to.be.false;
		recipientUdpClient.lockInput();
		expect(recipientUdpClient.isInputClosed).to.be.true;
	});

	it('should send message to server and emit allItemsSent event', (done) => {
		recipientUdpClient.onAllItemsSent(() => {
			expect(recipientUdpClient.messageCounter).to.equal(0);
			done();
		});
		recipientUdpClient.send(dummyData);
		expect(recipientUdpClient.messageCounter).to.equal(1);
		recipientUdpClient.lockInput();
	});

	it('should not allow to send message when input is closed', () => {
		expect(recipientUdpClient.messageCounter).to.equal(0);
		recipientUdpClient.send(dummyData);
		expect(recipientUdpClient.messageCounter).to.equal(1);
		recipientUdpClient.lockInput();
		recipientUdpClient.send(dummyData);
		expect(recipientUdpClient.messageCounter).to.be.lessThan(2);
	});

});