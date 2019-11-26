module.exports = {
	UDP: {
		LISTEN_PORT: process.env.UDP_LISTEN_PORT || 67,
		REMOTE_PORT: process.env.UDP_REMOTE_PORT || 67,
		REMOTE_HOST: process.env.UDP_REMOTE_HOST || 'localhost'
	},
	FILES: {
		DIR: process.env.STORE_DIR || './data/',
		ACTIVE_BUFFER_FILE_EXTENSION: 'active',
		INACTIVE_BUFFER_FILE_EXTENSION: 'stored',
		ENCRYPTED_BUFFER_FILE_EXTENSION: 'encrypted',
		ACTIVE_BUFFER_MAX_SIZE: process.env.ACTIVE_BUFFER_MAX_SIZE || '64k'
	},
	ENCRYPT: {
		ENABLED: process.env.ENCRYPT_DATA || true,
		PASSWORD: process.env.ENCRYPT_PASSWORD || 'testPass',
		PASSWORD_HASH_ALGHORITM: 'sha256',
		ALGORITHM: 'aes-256-cbc',
	}
};