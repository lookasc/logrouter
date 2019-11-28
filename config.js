const config = {
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
		ACTIVE_BUFFER_MAX_SIZE: process.env.ACTIVE_BUFFER_MAX_SIZE || '32k',
		ACTIVE_BUFFER_MAX_AGE: process.env.ACTIVE_BUFFER_MAX_AGE || 60
	},
	ENCRYPT: {
		ENABLED: process.env.ENCRYPT_DATA || true,
		PASSWORD: process.env.ENCRYPT_PASSWORD || 'testPass',
		PASSWORD_HASH_ALGHORITM: 'sha256',
		ALGORITHM: 'aes-256-cbc',
	}
};

const configForTests = {
	UDP: {
		LISTEN_PORT: process.env.UDP_LISTEN_PORT || 12345,
		REMOTE_PORT: process.env.UDP_REMOTE_PORT || 12345,
		REMOTE_HOST: process.env.UDP_REMOTE_HOST || 'localhost'
	},
	FILES: {
		DIR: process.env.STORE_DIR || './data/',
		ACTIVE_BUFFER_FILE_EXTENSION: 'active',
		INACTIVE_BUFFER_FILE_EXTENSION: 'stored',
		ENCRYPTED_BUFFER_FILE_EXTENSION: 'encrypted',
		ACTIVE_BUFFER_MAX_SIZE: process.env.ACTIVE_BUFFER_MAX_SIZE || '1k',
		ACTIVE_BUFFER_MAX_AGE: process.env.ACTIVE_BUFFER_MAX_AGE || 1
	},
	ENCRYPT: {
		ENABLED: process.env.ENCRYPT_DATA || true,
		PASSWORD: process.env.ENCRYPT_PASSWORD || 'testPass',
		PASSWORD_HASH_ALGHORITM: 'sha256',
		ALGORITHM: 'aes-256-cbc',
	}
};

module.exports = (process.env.NODE_ENV === 'test') ? configForTests : config;