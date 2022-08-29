const router = require("express").Router();
const { verifyUser } = require("../controller/verifyToken");
const { signup, login, getLoginUser } = require("../controller/authController");

//REGISTER
router.post("/register", signup);
//LOGIN
router.post("/login", login);
//GET LOGIN USER

module.exports = router;
