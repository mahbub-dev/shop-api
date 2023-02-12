const { createError } = require("../../utils");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Billing = require("../../models/Billing");

// module scaffholding
//  create order
class createOrder {
	constructor(userId, productIds, billingId) {
		this.userId = userId;
		this.productIds = productIds;
		this.billingId = billingId;
	}
	// find billing address
	async findBillingAddress() {
		try {
			return await Billing.findOne({
				userId: this.userId,
				"address._id": this.billingId,
			});
		} catch (error) {
			throw error;
		}
	}

	// find cart list
	async findCartList() {
		try {
			return await Cart.findOne({
				userId: this.userId,
				products: { $in: this.productIds },
			});
		} catch (error) {
			throw error;
		}
	}

	// get order list
	async placeOrder({ product, address }) {
		try {
			return await Order.create({
				userId: this.userId,
				orders: [{ product, address }],
			});
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
module.exports = { createOrder };
