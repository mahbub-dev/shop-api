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
cartDB.delete = async (userId, _id) => {
	try {
		if (_id === "all") {
			return await Cart.deleteMany({});
		}
		return await Cart.findOneAndDelete({
			$and: [{ $or: [{ _id }, { productId: _id }] }, { userId }],
		});
	} catch (error) {
		throw error;
	}
};
module.exports = cartDB;
