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
cartService.delete = async (userId, productId) => {
	try {
		return await cartDB.delete(userId, productId);
	} catch (error) {
		throw error;
	}
};

module.exports = cartService;
