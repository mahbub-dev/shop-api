const { createError } = require("../../utils");
const { createOrder, getOrder } = require("./orderDB");

// module scaffholding
const orderService = {};

//  create order
orderService.create = async (userId, orderCartItemsId, billingId) => {
	try {
		// console.log(orderCartItemsId);
		const newOrder = new createOrder(userId, orderCartItemsId, billingId);
		// cart lists
		let orderCartList = await newOrder.findCartList();
		// place order function
		let isOrderPlaced = true;
		let placement = {};
		const orders = orderCartList.map(async (item) => {
			try {
				placement = await newOrder.placeOrder(item);
				await newOrder.removeOrderItem(item._id);
				return placement;
			} catch (error) {
				return error;
			}
		});
		if (!orders.length) createError("order place failed", 500);
		return orders[0];
	} catch (error) {
		throw error;
	}
};
// get orders
orderService.getOrder = async (userId) => {
	try {
		const order = await getOrder(userId);
		return order;
	} catch (error) {
		throw error;
	}
};
// validate orders
orderService.validateOrder = async (id, createdAt) => {
	try {
		const newOrder = new createOrder(null, null, null);
		const validate = await newOrder.validateOrder(id, createdAt);
		const validationTime = new Date(validate.createdAt);
	
		if (validationTime.getTime() + 60000 > new Date().getTime()) {
			return true;
		} else createError("validation failed", 400);
	} catch (error) {
		throw error;
	}
};
module.exports = orderService;
