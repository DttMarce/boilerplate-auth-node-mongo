const { Router } = require('express');

const { userController, userValidation } = require('../controllers/user');

const router = new Router();

router.post(
	'/login/',
	userValidation,
	userController.loginUser
);

router.post(
	'/register/',
	userValidation,
	userController.registerUser
);

// router.get(
// 	'/tasks/',
// 	architectController.removeArchitect
// );
// router.get(
// 	'/private-tasks/',
// 	architectController.removeArchitect
// );

module.exports = router;
