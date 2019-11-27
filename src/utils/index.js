var convertSizeStringToByteNumber = function (inputString) {
	let ALLOWED_CHARS = ['k', 'm'];
	if (!inputString) throw new Error('sizeString not supplied');

	let sizeString = inputString.replace(/ /g, '');

	let sizeChar = sizeString[sizeString.length - 1].toLowerCase();
	if (!ALLOWED_CHARS.includes(sizeChar)) throw new Error('Wrong size char supplied');

	let sizeNumber = Number(sizeString.slice(0, sizeString.length - 1));
	if (isNaN(sizeNumber)) throw new Error('Size must be a number');

	let multiplier = 1024;
	if (sizeChar === 'k') multiplier = 1024;
	else multiplier = 1048576;

	let size = sizeNumber * multiplier;
	return size;
};

module.exports = {
	convertSizeStringToByteNumber
};