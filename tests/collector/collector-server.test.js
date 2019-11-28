const chai = require('chai');
const expect = chai.expect;
const CollectorServer = require('../../src/collector/collector-server');
const { fork } = require('child_process');

describe('CollectorServer', () => {
	let collectorServer;
	let dummyLogSource;
	let dummyData = 'dummyData';

	before(() => {
		dummyLogSource = fork('./tests/collector/collector-server.dummy-log-source');
		collectorServer = new CollectorServer();
	});

	it('should create instance of CollectorServer', () => {
		expect(collectorServer).to.be.instanceOf(CollectorServer);
	});

	it('should have buffer empty', () => {
		expect(collectorServer.ingestDataBuffer.activeBuffer.size).to.equal(0);
	});

	it('should read data through UDP and save to buffer', (done) => {
		dummyLogSource.send({
			command: 'sendDummyLog',
			content: dummyData
		});
		setTimeout(() => {
			expect(collectorServer.ingestDataBuffer.activeBuffer.size).to.equal(dummyData.length);
			done();
		}, 500);
	});

	after(() => {
		dummyLogSource.send({ command: 'close' });
	});

});