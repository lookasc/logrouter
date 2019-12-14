const { unlink } = require('fs');

function deleteFiles(files) {
	files.forEach(file => {
		unlink(file, error => {
			if (error) throw new Error(error);
		});
	});
}

module.exports = {
	deleteFiles
};