const User = require("../../models/User");
const { createError } = require("../../utils");

// Module scaffolding
const authDB = {};

// register authdb
authDB.signup = async (data) => {
	try {
		const isUserExist = await User.findOne({
			$or: [{ email: data.email }, { phone: data.phone }],
		});
		if (isUserExist) {
			return { isExist: true, res: isUserExist };
		} else {
			const newUser = new User(data);
			const savedUser = await newUser.save();
			const { password, ...rest } = savedUser._doc;
			return { isExist: false, res: rest };
		}
	} catch (error) {
		throw error;
	}
};

// login authDb
authDB.login = async (username) => {
	try {
		const user = await User.findOne({
			$or: [{ phone: username }, { email: username }],
		});
		return user;
	} catch (error) {
		throw error;
	}
};
// export module
module.exports = authDB;
