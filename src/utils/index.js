const dns = require('dns');
const { unlink } = require('fs');

function deleteFiles(files) {
	files.forEach(file => {
		unlink(file, error => {
			if (error) throw new Error(error);
		});
	});
}

function resolveHostname(hostname) {
	return new Promise((resolve, reject) => {
		dns.lookup(hostname, (error, address) => {
			if (error) reject(error);
			resolve(address);
		});
	});
}

module.exports = {
	deleteFiles,
	resolveHostname
};

