const { errorResponse, createError } = require("../../utils");
const orderService = require("./orderService");
const Order = require("../../models/Order");
// Creating oreder
const createOrder = async (req, res) => {
	try {
		const userId = req.user.id;
		// receive an array of cart ids
		const { orderCartItemsId, billingId } = req.body;
		const data = await orderService.create(
			userId,
			orderCartItemsId,
			billingId
		);
		res.status(201).json(data);
	} catch (err) {
		response.errorResponse(res, err);
	}
};

//Get order
const getOrder = async (req, res) => {
	try {
		let response = await orderService.getOrder(req.user.id);
		res.status(200).json(response);
	} catch (err) {
		errorResponse(res, err);
	}
};

// validate order
const validateOrder = async (req, res) => {
	try {
		const { id, createdAt } = req.params;
		// console.log(id)
		await orderService.validateOrder(id, createdAt);
		res.status(200).json({ validate: "true" });
	} catch (error) {
		errorResponse(res, error);
	}
};
module.exports = { createOrder, getOrder, validateOrder };
