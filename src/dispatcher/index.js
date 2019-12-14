const FileCoder = require('./file-coder');
const RecipientUdpClient = require('./recipient-udp-client');
const Dispatcher = require('./dispatcher');
const { deleteFiles } = require('../utils');

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
			deleteFiles([storedFileName, encryptedFileName]);

		} catch (error) {
			process.send(`Dispatcher error: ${error}`);
		}
	}
});