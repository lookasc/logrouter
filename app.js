require('dotenv').config();
const Collector = require('./collector/collector');

const collector = new Collector().start();
