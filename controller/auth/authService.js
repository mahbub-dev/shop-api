const { createError } = require("../../utils");
const authBD = require("./authDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Module scaffolding
const authService = {};

// register authservice
authService.signup = async (signupData) => {
	try {
		const { phone, email, password, name, isAdmin } = signupData;
		if (phone && email && password && name) {
			const salt = await bcrypt.genSalt(10);
			const { password, ...rest } = signupData;
			rest.password = await bcrypt.hash(password, salt);
			isAdmin && (rest.isAdmin = isAdmin);
			// sending for database process
			const dbRes = await authBD.signup(rest);
			if (dbRes.isExist) {
				let errorSms = {};
				dbRes.res.email === email &&
					(errorSms.email = "email registered");
				dbRes.res.phone === phone &&
					(errorSms.phone = "phone registered");
				if (Object.keys(errorSms).length > 0) {
					createError(JSON.stringify(errorSms), 400);
				}
			} else {
				return dbRes.res;
			}
		} else {
			createError("invalid input", 400);
		}
	} catch (error) {
		throw error;
	}
};

// login authservice
authService.login = async (data) => {
	try {
		const { username, password } = data;
		if (username && password) {
			const user = await authBD.login(username);
			if (user) {
				const { password, _id, isAdmin } = user;
				const match = await bcrypt.compare(data.password, password);
				if (match) {
					const accessToken = jwt.sign(
						{ id: _id, isAdmin },
						process.env.JWT_SEC,
						{ expiresIn: "2d" }
					);
					const { password, ...rest } = user._doc;
					rest.token = accessToken;
					return rest;
				} else {
					createError("password doesn't match", 401);
				}
			} else {
				createError("user not found", 404);
			}
		} else {
			createError("invalid input", 400);
		}
	} catch (error) {
		throw error;
	}
};
// export module
module.exports = authService;
