const FileCoder = require('./file-coder');

process.send('Dispatcher started');

process.on('message', (message) => {
	parseMessage(message);
});

function parseMessage(message) {
	if (!message || !message.type) return;

	if (message.type === 'newFile') {
		new FileCoder(message.fileName)
			.encryptFile()
			.then(encryptedFileName => {
				process.send(`Encrypting of ${encryptedFileName} finished`);
			});
	}
}


