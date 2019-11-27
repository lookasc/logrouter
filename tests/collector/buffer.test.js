const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const Buffer = require('../../src/collector/buffer');
const indexGenerator = require('ulid').monotonicFactory();

describe('Buffer class', () => {
	let buffer;
	let dummyData = 'dummyData';

	beforeEach(() => {
		buffer = new Buffer(indexGenerator);
	});

	it('should create instance od Buffer', () => {
		expect(buffer).to.be.instanceOf(Buffer);
	});
	
	it('should have onReady event working', (done) => {
		expect(buffer.stream.pending).to.be.true;
		buffer.waitUntilReady()
			.then(() => {
				expect(buffer.stream.pending).to.be.false;
				done();
			});
	});

	it('should create file in ./data', (done) => {
		buffer.waitUntilReady()
			.then(() => {
				expect(fs.existsSync(buffer.name)).to.be.true;
				done();
			});
	});

	it('should have lenght of 0', () => {
		expect(buffer.size).to.equal(0);
	});

	it('should return false from isOverloaded method', () => {
		expect(buffer.isOverloaded()).to.be.false;
	});

	it('should increase size and write data to stream after write() method', (done) => {
		buffer.write(dummyData);
		expect(buffer.size).to.equal(dummyData.length);
		setTimeout(() => {
			expect(buffer.stream.bytesWritten).to.equal((dummyData + '\n').length);
			done();
		}, 10);
	});

	it('should return true from isOverloaded method', () => {
		buffer.write(dummyData);
		buffer.maxSize = 8;
		expect(buffer.isOverloaded()).to.be.true;
	});

	it('should close stream after close() method', (done) => {
		buffer.stream.on('close', () => {
			expect('should be there').to.exist;
			done();
		});
		buffer.close(() => {});
	});

	it('should resolve with new name after deactivate() method', (done) => {
		buffer.deactivate()
			.then(newName => {
				expect(newName.includes('active')).to.be.false;
				expect(newName.includes('stored')).to.be.true;
				done();
			});
	});

});
