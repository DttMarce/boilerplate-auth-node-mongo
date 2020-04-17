const jwt = require('jsonwebtoken');

const config = require('../environment');
const logger = require('../../utils/logger');

exports.verifyToken = async (req, res, next) => {
	try {
		if(!req.headers.authorization){
			return res.status(401).send('Unauthorized Request');
		}

		let token = req.headers.authorization.split(' ')[1];

		if (token === null) {
			return res.status(401).send('Unauthorized Request');
		}

		const payload = await jwt.verify(token, config.secretKeyJWT);
		if (!payload) {
			return res.status(401).send('Unauthorized Request');
		}

		req.userId = payload._id;

		next();
	} catch(err) {
		logger.error(err);
		return res.status(401).send('Unauthorized Request');
	}
};

exports.checkIfAlreadyLogged = (req, res, next) => {
	try {
		if (req.headers.authorization) {
			return res.status(204).send('This user is already logged');
		}

		next();
	} catch (error) {
		logger.error(error);
	}
}
