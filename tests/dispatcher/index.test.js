const chai = require('chai');
const expect = chai.expect;
const { fork } = require('child_process');
const { existsSync } = require('fs');

describe('Whole dispatcher test', () => {
	let dispatcher;
	let testFileName;

	before(() => {
		let fileName = FILES.DIR + (Math.floor(Math.random()*1000000)) + '.' + FILES.ENCRYPTED_BUFFER_FILE_EXTENSION;
		let dummyData = 'dummyData\ndummyData\ndummyData\ndummyData\n';
		writeFileSync(fileName, dummyData);
		dispatcher = fork('./src/dispatcher');
	});

	// beforeEach((done) => {
	// 	testProcess.send('createAndSendTestFile');
	// 	setTimeout(() => {
	// 		done();
	// 	}, 500);
	// });

	it('should create test file', () => {
		expect(existsSync(testFileName)).to.be.true;
	});

	it('should delete processed file after dispatch', () => {
		expect(existsSync(testFileName)).to.be.true;
	});


	
	after(() => {
		dispatcher.kill('SIGINT');
	});

});