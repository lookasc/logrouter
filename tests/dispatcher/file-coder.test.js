const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const { FILES } = require('../../config');
const FileCoder = require('../../src/dispatcher/file-coder');

describe('FileCoder class', () => {
	let fileCoder;
	let dummyData = 'dummyData';
	let dummyName;

	beforeEach(() => {
		dummyName = FILES.DIR + (Math.floor(Math.random()*1000000)) + '.' + FILES.INACTIVE_BUFFER_FILE_EXTENSION;
		fs.writeFileSync(dummyName, dummyData);
		fileCoder = new FileCoder(dummyName);
	});

	it('should create instance od FileCoder', () => {
		expect(fileCoder).to.be.instanceOf(FileCoder);
	});

	it('should create "encryptedFileName" file on drive', () => {
		expect(fs.existsSync(fileCoder.encryptedFileName)).to.be.true;
	});

	it('should resolve with encryptedFileName', (done) => {
		fileCoder.encryptFile()
			.then(fileName => {
				expect(fileName).to.equal(fileCoder.encryptedFileName);
				done();
			});
	});

	it('should never output two the same output for one input string', () => {
		let encryptedString1 = fileCoder.encrypt(dummyData);
		let encryptedString2 = fileCoder.encrypt(dummyData);
		expect(encryptedString1).to.not.equal(encryptedString2);
	});

});