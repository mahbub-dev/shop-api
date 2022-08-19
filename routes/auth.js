const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyAdmin, verifyUser } = require("./verifyToken");
const {
	signupValidator,
	loginValidator,
} = require("../controller/authController");

//REGISTER
router.post("/register", signupValidator, async (req, res) => {
	try {
		const { name, email, password, phone, location } = req.body.user;
		const salt = await bcrypt.genSalt(10);
		const newUser = new User({
			name,
			email,
			phone,
			shipping: location,
			password,
		});
		newUser.password = await bcrypt.hash(password, salt);
		await newUser.save();
		res.status(201).json({ success: { msg: "Signup Successfull" } });
	} catch (err) {
		console.log(err);
		res.status(500).json("internal server error");
	}
});

//LOGIN
router.post("/login", loginValidator, async (req, res) => {
	const plainPassword = req.body.user.password;
	const { email, password } = req.validUser;
	try {
		const match = await bcrypt.compare(plainPassword, password);
		let err = {};
		let success = {};
		if (!match) {
			err.password = `Password doesn't match`;
			res.json({ error: err });
		} else {
			success.msg = "Login successful";
			const accessToken = jwt.sign(
				{
					id: req.validUser._id,
					isAdmin: req.validUser.isAdmin,
				},
				process.env.JWT_SEC,
				{ expiresIn: "2d" }
			);
			accessToken && (success.token = accessToken);
			success.user = req.validUser;
			res.status(200).json({ success });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json("internal server error");
	}
});

router.get("/login/user/:id", verifyUser, async (req, res) => {
	try {
		let success = {};
		const { id } = req.params;
		console.log(id);
		const user = await User.findOne({ _id: id });
		success.user = user;
		res.json({ success });
	} catch (e) {
		console.log(e);
		res.status(500).json("internal server error");
	}
});
module.exports = router;
