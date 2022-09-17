const router = require("express").Router();
const { verifyUser } = require("../controller/verifyToken");
const {
	userSignup,
	userLogin,
	adminLogin,
	adminSignup,
	getLoginUser,
} = require("../controller/authController");

//REGISTER
router.post("/register", userSignup);
//LOGIN
router.post("/login", userLogin);
//ADMIN LOGIN
router.post("/admin/login", adminLogin);
//ADMIN REGISTER
router.post("/admin/signup", adminSignup);

module.exports = router;
