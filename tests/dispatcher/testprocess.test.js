const { writeFileSync, existsSync } = require('fs');
const { FILES } = require('../../config');

process.on('message', (message) => {

	if (message === 'createAndSendTestFile') {
		let fileName = FILES.DIR + (Math.floor(Math.random()*1000000)) + '.' + FILES.ENCRYPTED_BUFFER_FILE_EXTENSION;
		let dummyData = 'dummyData\ndummyData\ndummyData\ndummyData\n';
		writeFileSync(fileName, dummyData);
		process.send(fileName);
	}

});