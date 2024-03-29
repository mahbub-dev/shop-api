const { createError } = require("../../utils.js");
const cartDB = require("./cartDB");

// module scaffholding
const cartService = {};

// create cart
cartService.create = async (data) => {
	try {
		return await cartDB.create(data);
	} catch (error) {
		throw error;
	}
};
//  delete cart
cartService.delete = async (userId, cartId) => {
	try {
		res = await cartDB.delete(userId, cartId);
		if (res !== null) {
			return res;
		} else {
			createError("not found", 401);
		}
	} catch (error) {
		throw error;
	}
};

module.exports = cartService;
