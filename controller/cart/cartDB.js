const Cart = require("../../models/Cart");
const { createError } = require("../../utils.js");

// module scaffholding
const cartDB = {};
// create cart
cartDB.create = async (data) => {
	try {
		return await Cart.create(data);
	} catch (error) {
		throw error;
	}
};

//  delete cart
cartBD.delete = async (userId, productId) => {
	try {
		const deletecart = await Cart.findByIdAndDelete(productId);
        return true
	} catch (error) {
		throw error;
	}
};
module.exports = cartDB;
