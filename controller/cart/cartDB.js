const Cart = require("../../models/Cart");
const { createError } = require("../../utils.js");

// module scaffholding
const cartDB = {};
// create cart
cartDB.create = async (data) => {
	try {
		const cart = await Cart.findOne({
			$and: [{ userId: data.userId }, { productId: data.productId }],
		});
		if (cart) {
			return cart;
		} else return await Cart.create(data);
	} catch (error) {
		throw error;
	}
};

//  delete cart
cartDB.delete = async (userId, productId) => {
	try {
		return await Cart.findOneAndDelete({
			$and: [{ productId }, { userId }],
		});
	} catch (error) {
		throw error;
	}
};
module.exports = cartDB;
