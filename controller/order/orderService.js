const { createError } = require("../../utils");
const  {createOrder}  = require("./orderDB");

// module scaffholding
const orderService = {};

//  create order
orderService.create = async (userId, productIds, billingId) => {
	try {
		const newOrder = new createOrder({ userId, productIds, billingId });
		// billing address
		const billingAddress = await newOrder.findBillingAddress();
		// cart lists
		let orderProducts = await newOrder.findCartList();
		// place order function
		let isOrderPlaced = true;
		orderProducts.forEach(async (item) => {
			// placing order
			let userOrder = await newOrder.placeOrder(item, billingAddress);
			// delete cart item after order place
			await newOrder.removeOrderItem(orderProducts._id);
			userOrder ? (isOrderPlaced = true) : (isOrderPlaced = false);
		});
		if (!isOrderPlaced) createError("order place failed", 500);
		return true;
	} catch (error) {
		throw error;
	}
};
module.exports = orderService;
