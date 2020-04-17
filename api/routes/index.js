const { Router } = require('express');

const { userController, userValidation } = require('../controllers/user');
const { verifyToken, checkIfAlreadyLogged } = require('../../config/middleware/request-control');

const router = new Router();

router.post(
	'/login/',
	userValidation,
	checkIfAlreadyLogged,
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
