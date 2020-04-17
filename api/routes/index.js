const { Router } = require('express');

const { userController, userValidation } = require('../controllers/user');
const { verifyToken, checkIfAlreadyAuth } = require('../../config/middleware/request-control');

const router = new Router();

router.post(
	'/login/',
	userValidation,
	checkIfAlreadyAuth,
	userController.loginUser
);

router.post(
	'/logout/',
	userValidation,
	userController.loginUser
);

router.post(
	'/register/',
	userValidation,
	userController.registerUser
);

router.get(
	'/private/',
	verifyToken,
	userController.privateShoppingList
);

module.exports = router;
