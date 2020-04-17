const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../../../config/environment')
const User = require('../../models/user');

exports.registerUser = async function (req, res) {
	const reqData = req.body;

	let user = new User();

	user.name = reqData.name;
	user.email = reqData.email;
	user.password = bcrypt.hashSync(reqData.password);

	await user.save(async (err, userSaved) => {
		if (err) {
			if (err.code == 11000) {
				return res.status(209).send('Email already exists');
			}

			return res.status(500).send({error: `Internal Server Error: ${err}`});
		}

		const token = jwt.sign(
			{_id: userSaved._id},
			config.secretKeyJWT,
			{expiresIn: 24*60*60}
		);

		res.status(200).send({userToken: token});
	});
};

exports.loginUser = async function (req, res) {
	const reqData = req.body;

	try {
		await User.findOne({
			email: reqData.email
		}, (err, userFounded) => {
			if (err) {
				return res.status(500).send('Server error');
			}

			if(!userFounded) {
				return res.status(404).send({message: 'User is not on the bbdd'})
			}

			const resultPassword = bcrypt.compareSync(reqData.password, userFounded.password);

			if(resultPassword) {
				const token = jwt.sign(
					{_id: userFounded._id},
					config.secretKeyJWT,
					{expiresIn: 24*60*60}
				);

				res.status(200).send({userToken: token});
			}

			return res.status(404).send({message: 'User is not on the bbdd'})
		});
	} catch (error) {
		logger.error(error);
	}
};

exports.privateShoppingList = function (req, res) {
	return res.status(200).send({message: 'This is the private shopping-list'});
};
