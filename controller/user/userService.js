const { createError } = require("../../utils");
const userDB = require("./userDB");

// module scaffholding
const userService = {};

// update user
userService.update = async (userId,updateData) => {
	try {
		const res = await userDB.update(userId,updateData);
		if (res) {
			return res;
		} else {
			createError("something went wrong", 400);
		}
	} catch (error) {
		throw error;
	}
};

//delete user
userService.delete = async (id) => {
	try {
		return await userDB.delete(id);
	} catch (error) {
		throw error;
	}
};

// get login user
userService.getLogin = async (id) => {
	try {
		const res = await userDB.getLogin(id);
		const { password, ...rest } = res._doc;
		return rest;
	} catch (error) {
		throw error;
	}
};

// get all user
userService.getAll = async (query) => {
	try {
		return await userDB.getAll(query);
	} catch (error) {
		throw error;
	}
};
module.exports = userService;
