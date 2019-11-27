const chai = require('chai');
const expect = chai.expect;
const { convertSizeStringToByteNumber } = require('../../src/utils');

describe('Utils', () => {
	
	describe('convertSizeStringToByteNumber', () => {
		
		it('should throw when called without argument', () => {
			expect(() => convertSizeStringToByteNumber()).to.throw('sizeString not supplied');
		});

		it('should throw when called with not allowed size-char', () => {
			expect(() => convertSizeStringToByteNumber('1q')).to.throw('Wrong size char supplied');
		});

		it('should not throw when called with "k" or "m" size-char', () => {
			expect(() => convertSizeStringToByteNumber('1k')).to.not.throw('Wrong size char supplied');
			expect(() => convertSizeStringToByteNumber('1m')).to.not.throw('Wrong size char supplied');
		});

		it('should throw when called with NaN instead of integer', () => {
			expect(() => convertSizeStringToByteNumber('qk')).to.throw('Size must be a number');
			expect(() => convertSizeStringToByteNumber('$m')).to.throw('Size must be a number');
		});

		it('should return 0 when "0k" is supplied in argument', () => {
			expect(convertSizeStringToByteNumber('0k')).to.equal(0);
		});

		it('should return 1024 when "1k" is supplied in argument', () => {
			expect(convertSizeStringToByteNumber('1k')).to.equal(1024);
		});

		it('should return 1048576 when "1m" is supplied in argument', () => {
			expect(convertSizeStringToByteNumber('1m')).to.equal(1048576);
		});

		it('should be case insensitive', () => {
			expect(convertSizeStringToByteNumber('1m')).to.equal(1048576);
			expect(convertSizeStringToByteNumber('1M')).to.equal(1048576);
		});

		it('should remove all whitespaces', () => {
			expect(convertSizeStringToByteNumber(' 1m')).to.equal(1048576);
			expect(convertSizeStringToByteNumber('1M ')).to.equal(1048576);
			expect(convertSizeStringToByteNumber(' 1  M ')).to.equal(1048576);
			expect(convertSizeStringToByteNumber('			1  m ')).to.equal(1048576);
		});
		
	});
	
});
