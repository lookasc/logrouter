const FileCoder = require('./file-coder');
const RecipientUdpClient = require('./recipient-udp-client');
const Dispatcher = require('./dispatcher');
const { deleteFiles, resolveHostname } = require('../utils');
const { UDP, ENCRYPT } = require('../../config');

process.send(`Dispatcher: Starting with process PID=${process.pid}...`);

resolveHostname(UDP.REMOTE_HOST)
	.then(setIpAddress)
	.then(registerMessageEventHandler)
	.catch(sendErrorToMainProcess);

function setIpAddress (ipAddress) {
	UDP.REMOTE_HOST_IP = ipAddress;
	process.send(`Dispatcher: Found IP for hostname '${UDP.REMOTE_HOST}' - ${ipAddress}. That's all logs destination address.`);
}

function registerMessageEventHandler () {
	process.on('message', async (message) => {
		let receivedNewFile = (message && message.type === 'newFile');
		let storedFileName = message.fileName;

		if (receivedNewFile) {
			try {
				let fileCoder, encryptedFileName;
				let createdFiles = [storedFileName];
				// encrypting
				if (ENCRYPT.ENABLED === 'true') {
					fileCoder = new FileCoder(storedFileName);
					encryptedFileName = await fileCoder.encryptFile();
					createdFiles.push(encryptedFileName);
				}
				// dispatching
				let dispatcherConfig = {
					fileToDispatch: !!encryptedFileName ? encryptedFileName : storedFileName,
					recipientUdpClient: new RecipientUdpClient()
				};
				let dispatcher = new Dispatcher(dispatcherConfig);
				await dispatcher.sendPartedFile();
				// cleaning
				deleteFiles(createdFiles);
			} catch (error) {
				sendErrorToMainProcess(error);
			}
		}
	});
	process.send('Dispatcher: Ready.');
}

function sendErrorToMainProcess (error) {
	process.send(`Dispatcher error: ${error}`);
}