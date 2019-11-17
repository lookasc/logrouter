require('dotenv').config();
const { UDP } = require('./config');
// const { createWriteStream } = require('fs');
// const dgram = require('dgram');
// const udpServer = dgram.createSocket('udp4');

const Collector = require('./collector/collector');

// var getNewActiveFileName = function () {
// 	return `${Date.now()}.active`;
// }

// var ingestData = createWriteStream(`./data/${getNewActiveFileName()}`);

var configData = {
	PORT: UDP.LISTEN_PORT
}

var collector = new Collector(configData).start();

// udpServer.on('listening', function () {
// 	var address = udpServer.address();
// 	console.log('Logrouter listen on UDP ' + address.address + ':' + address.port);
// });

// udpServer.on('message', function (message, remote) {
// 	console.log(JSON.stringify(JSON.parse(message.toString()), null, 2));
// 	ingestData.write(`${message}\n`);
// });

// udpServer.bind(UDP.LISTEN_PORT);


