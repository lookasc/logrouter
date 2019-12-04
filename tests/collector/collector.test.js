const chai = require('chai');
const expect = chai.expect;
const Collector = require('../../src/collector/collector');

const dummyServer = {
	thisIsServerObj: true 
};

describe('Collector class', () => {
	let collector;

	before(() => {
		collector = new Collector({ 
			server: dummyServer 
		});
	});

	it('should create instance of Collector', () => {
		expect(collector).to.be.instanceOf(Collector);
	});

	it('should have server field', () => {
		expect(collector.server).to.include.keys(['thisIsServerObj']);
		expect(collector.server.thisIsServerObj).to.be.true;
	});

});
