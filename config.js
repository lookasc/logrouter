module.exports = {
	UDP: {
		LISTEN_PORT: process.env.UDP_LISTEN_PORT || 67,
		REMOTE_PORT: process.env.UDP_REMOTE_PORT || 67,
		REMOTE_HOST: process.env.UDP_REMOTE_HOST || 'localhost'
	},
	STORE: {
		DIR: process.env.STORE_DIR || './data/'
	},
	INGEST: {
		ACTIVE_BUFFER_FILE_EXTENSION: 'active',
		ACTIVE_BUFFER_MAX_SIZE: process.env.ACTIVE_BUFFER_MAX_SIZE || '64k'
	},
	FLUSH: {

	}
}