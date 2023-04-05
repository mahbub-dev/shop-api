const { errorResponse, createError } = require("../../utils");
const orderService = require("./orderService");
const Order = require("../../models/Order");
// Creating oreder
const createOrder = async (req, res) => {
	try {
		const userId = req.user.id;
		// receive an array of cart ids
		const { orderCartItemsId, billingId } = req.body;
		await orderService.create(userId, orderCartItemsId, billingId);
		res.status(201).json("Order placement successfull");
	} catch (err) {
		response.errorResponse(res, err);
	}
};

//Get order
const getOrder = async (req, res) => {
	try {
		success = await Order.find({ userId: req.user.id })
			.populate("productId", " _id title img desc")
			.populate("billingId", "");
		if (success.length) {
			res.status(200).json(success);
		} else createError("product not found", 404);
	} catch (err) {
		errorResponse(res, err);
	}
};
module.exports = { createOrder, getOrder };
