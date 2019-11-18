require('dotenv').config();
const Collector = require('./collector/collector');

new Collector().start();
