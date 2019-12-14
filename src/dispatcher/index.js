const FileCoder = require('./file-coder');
const RecipientUdpClient = require('./recipient-udp-client');
const Dispatcher = require('./dispatcher');
const { unlink } = require('fs');

process.send('Dispatcher started');

process.on('message', async (message) => {
	let receivedNewFile = (message && message.type === 'newFile');
	let storedFileName = message.fileName;

	if (receivedNewFile) {
		try {
			let fileCoder = new FileCoder(storedFileName);
			let encryptedFileName = await fileCoder.encryptFile();
	
			let dispatcherConfig = {
				encryptedFileName: encryptedFileName,
				recipientUdpClient: new RecipientUdpClient()
			};
			let dispatcher = new Dispatcher(dispatcherConfig);
			encryptedFileName = await dispatcher.sendPartedFile();
	
			deleteProcessedFiles([storedFileName, encryptedFileName]);
		} catch (error) {
			process.send(`Dispatcher error: ${error}`);
		}
	}
});

function deleteProcessedFiles(files) {
	files.forEach(file => {
		unlink(file, error => {
			if (error) throw new Error(error);
		});
	});
}