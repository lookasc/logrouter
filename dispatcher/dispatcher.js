const { createReadStream, createWriteStream, rename } = require('fs');
const { createInterface } = require('readline');
const { ENCRYPT, FILES } = require('../config');
const crypto = require('crypto');

const key = crypto
	.createHash(ENCRYPT.PASSWORD_HASH_ALGHORITM)
	.update(ENCRYPT.PASSWORD)
	.digest();

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


class FileCoder {

	constructor(fileName) {
		this.inputFileName = fileName;
		this.encryptedFileName = `${this.inputFileName}.${FILES.ENCRYPTED_BUFFER_FILE_EXTENSION}`;
		this.encryptedFileStream = createWriteStream(this.encryptedFileName);
	}

	encryptFile() {
		let lineByLineReader = createInterface({
		input: createReadStream(this.inputFileName),
		crlfDelay: Infinity
		});

		lineByLineReader.on('line', (line) => {
			this.encryptedFileStream.write(`${this.encrypt(line)}\n`);
		});

		return new Promise((resolve, reject) => {
			lineByLineReader.on('close', () => {
				resolve(this.encryptedFileName);
			});
		});
	}

	encrypt(text) {
		const iv = crypto.randomBytes(16);
		let cipher = crypto.createCipheriv(ENCRYPT.ALGORITHM, Buffer.from(key), iv);
		let encrypted = cipher.update(text);
		encrypted = Buffer.concat([encrypted, cipher.final()]);
		return `${iv.toString('hex')}${encrypted.toString('hex')}`;
	}

}
