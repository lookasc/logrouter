const chai = require('chai');
const expect = chai.expect;
const { FILES } = require('../../config');
const { fork } = require('child_process');
const { existsSync, writeFileSync } = require('fs');

describe('Whole dispatcher test', () => {
	let dispatcher;
	let testFileName;
	let dummyData = 'dummyData\ndummyData\ndummyData\ndummyData\n';

	before(() => {
		testFileName = FILES.DIR + (Math.floor(Math.random()*1000000)) + '.' + FILES.ENCRYPTED_BUFFER_FILE_EXTENSION;
		writeFileSync(testFileName, dummyData);
		dispatcher = fork('./src/dispatcher');
	});

	it('should create test file', () => {
		setTimeout(() => {
			expect(existsSync(testFileName)).to.be.true;
		}, 50);
	});

	it('should delete processed file after dispatch', () => {
		dispatcher.send(testFileName);
		setTimeout(() => {
			expect(existsSync(testFileName)).to.be.false;
		}, 500);
	});

	after(() => {
		dispatcher.kill('SIGINT');
	});

});