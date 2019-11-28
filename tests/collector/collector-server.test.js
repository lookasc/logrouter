const chai = require('chai');
const expect = chai.expect;
const CollectorServer = require('../../src/collector/collector-server');
const { FILES } = require('../../config');
const { convertSizeStringToByteNumber } = require('../../src/utils');

describe('CollectorServer', () => {
	let collectorServer;
	let dummyData = 'dummyData';

	beforeEach(() => {
		collectorServer = new CollectorServer();
	});

	it('should create instance of CollectorServer', () => {
		expect(collectorServer).to.be.instanceOf(CollectorServer);
	});

});
