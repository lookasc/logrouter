const FileCoder = require('./file-coder');
const Dispatcher = require('./dispatcher');
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
				return new Dispatcher(encryptedFileName).sendPartedFile();
			})
			.then(encryptedFileName => {
				process.send(`Dispatching of ${encryptedFileName} finished`)
			});

	}
}





