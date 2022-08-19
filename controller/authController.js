const User = require("../models/User");

// register controller
const signupValidator = async (req, res, next) => {
	try {
		let err = {};
		const { phone, email } = req.body.user;
		const users = await User.find({
			$or: [{ email: email }, { phone: phone }],
		});
		const user = users[0];
		if (user) {
			user.email === email && (err.email = "Email must be unique");
			user.phone === phone && (err.phone = "Phone must be unique");
			res.json({ error: err })
		} else {
			next();
		}
	} catch (error) {
		console.log(error);
		res.status(500).json("internal server error");
	}
};

// login validator
const loginValidator = async (req, res, next) => {
	try {
		let err = {};
		const { username } = req.body.user;
		const users = await User.find({
			$or: [{ phone: username }, { email: username }],
		});
		const user = users[0];
		if (!user) {
			err.username = "This email or phone is not registered";
			res.json({ error: err }).end();
		} else {
			req.validUser = user;
			next();
		}
	} catch (error) {
		console.error(error);
		res.status(500).json("internal server error");
	}
};

module.exports = { signupValidator, loginValidator };
