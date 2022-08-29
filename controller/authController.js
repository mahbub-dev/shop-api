const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../utils");
// register controller
const signup = async (req, res) => {
	try {
		let error = {};
		let success = {};
		const { phone, email, password, name } = req.body.user;
		const users = await User.find({
			$or: [{ email: email }, { phone: phone }],
		});
		const user = users[0];
		if (user) {
			user.email === email &&
				(error.email = "This email has already been registered!");
			user.phone === phone &&
				(error.phone = "This email has already been registered!");
		} else {
			const salt = await bcrypt.genSalt(10);
			const newUser = new User({
				name,
				email,
				phone,
				password,
			});
			newUser.password = await bcrypt.hash(password, salt);
			success = await newUser.save();
		}
		response(error, success, res);
	} catch (err) {
		console.log(err);
		error.server = err;
		res.json({ error });
	}
};

// login validator
const login = async (req, res) => {
	try {
		let error = {};
		let success = {};
		const { username } = req.body.user;
		const users = await User.find({
			$or: [{ phone: username }, { email: username }],
		});
		const user = users[0];
		if (!user) {
			error.username = "This email or phone is not registered";
		} else {
			const plainPassword = req.body.user.password;
			const { password, _id, isAdmin } = user;
			const match = await bcrypt.compare(plainPassword, password);
			if (!match) {
				error.password = `Password doesn't match`;
			} else {
				const accessToken = jwt.sign(
					{
						id: _id,
						isAdmin,
					},
					process.env.JWT_SEC,
					{ expiresIn: "2d" }
				);
				accessToken && (success.token = accessToken);
				success.user = user;
			}
		}
		response(error, success, res);
	} catch (err) {
		console.log(err);
		error.server = err;
		res.json({ error });
	}
};

module.exports = { signup, login };
