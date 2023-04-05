const { createError } = require("../../utils");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Billing = require("../../models/Billing");

// module scaffholding
//  create order
class createOrder {
	constructor(userId, orderCartItemsId, billingId) {
		this.userId = userId;
		this.orderCartItemsId = orderCartItemsId;
		this.billingId = billingId;
	}
	// find cart list
	async findCartList() {
		try {
			return await Cart.find({
				// userId: this.userId,
				_id: { $in: this.orderCartItemsId },
			});
		} catch (error) {
			throw error;
		}
	}
	// get order list
	async placeOrder(product) {
		try {
			const { size, color, total_price, quantity, productId } = product;
			const order = Order({
				userId: this.userId,
				billingId: this.billingId,
				productId,
				size,
				quantity,
				total_price,
				color,
				price: total_price / quantity,
			});
			return await order.save();
		} catch (error) {
			throw error;
		}
	}

	async validateOrder(_id, createdAt) {
		try {
			const res = await Order.findOne({ $and: [{ _id }, { createdAt }] });
			!res && createError("product not found", 404);
			return res;
		} catch (error) {
			throw error;
		}
	}
	// async remove order item from cartlist
	async removeOrderItem(id) {
		try {
			return await Cart.findByIdAndDelete(id);
		} catch (error) {
			throw error;
		}
	}
}
// get order
async function getOrder(userId) {
	try {
		let success = await Order.find({ userId })
			.populate("productId", " _id title img desc")
			.populate("billingId", "");
		if (success.length) {
			return success;
		} else createError('data not found',404)
	} catch (error) {
		throw error;
	}
}
module.exports = { createOrder, getOrder };
