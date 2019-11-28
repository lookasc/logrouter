const chai = require('chai');
const expect = chai.expect;
const Collector = require('../../src/collector');

describe('Collector class', () => {
	let collector;

	before(() => {
		collector = new Collector();
	});

	it('should create instance of Collector', () => {
		expect(collector).to.be.instanceOf(Collector);
	});

});
