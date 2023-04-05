const { createError } = require("../../utils");
const { createOrder } = require("./orderDB");

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
		orderCartList.forEach(async (item) => {
			// placing order
			let placement = await newOrder.placeOrder(item);
			// delete cart item after order place
			if (placement) {
				await newOrder.removeOrderItem(item._id);
				isOrderPlaced = true;
			} else isOrderPlaced = false;
		});
		if (!isOrderPlaced) createError("order place failed", 500);
		return true;
	} catch (error) {
		throw error;
	}
};
module.exports = orderService;
