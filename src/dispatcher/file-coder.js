const { ENCRYPT, FILES } = require('../../config');
const { createReadStream, createWriteStream } = require('fs');
const { createInterface } = require('readline');
const crypto = require('crypto');

const ENCRYPT_KEY = crypto
	.createHash(ENCRYPT.PASSWORD_HASH_ALGHORITM)
	.update(ENCRYPT.PASSWORD)
	.digest();

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

		return new Promise(resolve => {
			lineByLineReader.on('close', () => {
				resolve(this.encryptedFileName);
			});
		});
	}

	encrypt(text) {
		const iv = crypto.randomBytes(16);
		let cipher = crypto.createCipheriv(ENCRYPT.ALGORITHM, Buffer.from(ENCRYPT_KEY), iv);
		let encrypted = cipher.update(text);
		encrypted = Buffer.concat([encrypted, cipher.final()]);
		return `${iv.toString('hex')}${encrypted.toString('hex')}`;
	}

}

module.exports = FileCoder;