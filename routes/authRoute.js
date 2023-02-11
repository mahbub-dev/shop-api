const router = require("express").Router();
const { verifyUser } = require("../controller/verifyToken");
const {
	userSignup,
	userLogin,
} = require("../controller/auth/authController");

//REGISTER
router.post("/register", userSignup);
//LOGIN
router.post("/login", userLogin);

//ADMIN REGISTER
router.post(
	"/admin/signup",
	(req, res, next) => {
		req.isAdmin = true;
		next();
	},
	userSignup
);

module.exports = router;
