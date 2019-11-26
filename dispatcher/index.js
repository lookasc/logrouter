const FileCoder = require('./file-coder');
const Dispatcher = require('./dispatcher');
const { unlink } = require('fs');

process.send('Dispatcher started');

process.on('message', (message) => {
	let receivedNewFile = (message && message.type === 'newFile');
	let storedFileName = message.fileName;

	if (receivedNewFile) {
		new FileCoder(storedFileName)
			.encryptFile()
			.then(encryptedFileName => {
				return new Dispatcher(encryptedFileName).sendPartedFile();
			})
			.then(encryptedFileName => {
				deleteProcessedFiles([storedFileName, encryptedFileName]);
			})
			.catch(error => {
				process.send(`Dispatcher error: ${error}`);
			});
	}
});

function deleteProcessedFiles(files) {
	files.forEach(file => {
		unlink(file, error => {
			if (error) throw new Error(error);
		});
	});
}