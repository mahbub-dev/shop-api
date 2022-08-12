const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyAdmin, verifyUser } = require("./verifyToken");
const { response } = require("express");

//REGISTER

router.post("/register", async (req, res) => {
	const { username, email, password } = req.body.user;
	const salt = await bcrypt.genSalt(10);
	const newUser = new User({
		username,
		email,
		password,
	});
	newUser.password = await bcrypt.hash(password, salt);
	try {
		const savedUser = await newUser.save();
		res.status(201).json({ success: "signup successfull" });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

//LOGIN
router.post("/login", async (req, res) => {
	const { email, password } = req.body.user;
	try {
		const user = await User.findOne({
			email: email,
		});
		const match = await bcrypt.compare(password, user.password);
		if (!user) {
			res.status(401).json("Wrong User Name");
		} else if (!match) {
			res.status(401).json("Wrong Password");
		} else {
			const accessToken = jwt.sign(
				{
					id: user._id,
					isAdmin: user.isAdmin,
				},
				process.env.JWT_SEC,
				{ expiresIn: "2d" }
			);
			const { password, ...others } = user._doc;

			// res.status(200).json({
			// 	success: "login successfull",
			// 	...others,
			// 	accessToken,
			// });
			res.cookie("token", accessToken, {
				maxAge: 172800000,
				httpOnly: false,
				secure: true,
				sameSite: "none",
			})
				.status(200)
				.json(accessToken);
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});
router.get("/login/:id", verifyUser, async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById({ _id: id });
		res.status(200).json({ msg: "login successfull", user });
	} catch (e) {
		console.log(e);
		res.status(500).json("login failed");
	}
});
module.exports = router;
