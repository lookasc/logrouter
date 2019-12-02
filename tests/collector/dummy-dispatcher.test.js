process.on('message', (message) => {

	if (message.type === 'newFile') {
		process.send(message.fileName);
	}

});