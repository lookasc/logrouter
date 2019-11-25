const { createReadStream, createWriteStream, rename } = require('fs');
const readline = require('readline');
const { ENCRYPT } = require('../config');
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.createHash('sha256').update(ENCRYPT.PASSWORD).digest();

process.send('Dispatcher started');

process.on('message', (message) => {
	parseMessage(message);
});

function parseMessage(message) {
	if (!message || !message.type) return;

	if (message.type === 'newFile') {
		encryptFile(message.fileName);
	}
}

function encryptFile(fileName) {
	let rl = readline.createInterface({
		input: createReadStream(fileName),
		crlfDelay: Infinity
	});

	let writeStream = createWriteStream(fileName + '.encrypted');
	
	rl.on('line', (line) => {
		writeStream.write(`${JSON.stringify(encrypt(line))}\n`);
	});

}

function encrypt(text) {
	const iv = crypto.randomBytes(16);
	let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
 }




