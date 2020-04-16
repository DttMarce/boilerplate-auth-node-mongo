require('dotenv').config();
const path = require('path');
const { merge } = require('lodash');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = process.env.NODE_ENV;
const envConfig = require(`./${env}.js`);

const rootPath = path.normalize(`${__dirname}/../..`);

const all = {
	env,
	root: rootPath,
	port: 3000,
	logger: {
		level: 'debug'
	},
	secretKeyJWT: 'secretKeyJWT'
};

const processEnv = {
	port: process.env.BACK_PORT,
	logger: {
		level: process.env.LOG_LEVEL
	}
};

const config = merge(all, envConfig, processEnv);

module.exports = config;
