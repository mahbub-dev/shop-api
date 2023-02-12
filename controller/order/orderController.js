var mongoose = require("mongoose");
const response = require("../../utils");
const orderService = require("./orderService");

// Creating oreder
const createOrder = async (req, res) => {
	try {
		const userId = req.user.id;
		const orderProductId = req.params.id.split(",");
		await orderService.create(userId, orderProductId, req.body);
		res.status(201).json("order placement successfull");
	} catch (err) {
		response.errorResponse(res, err);
	}
};

//Get order
const getOrder = async (req, res) => {
	let error = {};
	let success = {};

	try {
		success = await Order.findOne({ userId: req.user.id });
		response(error, success, res);
	} catch (err) {
		error.sever = "somthing went wrong";
		error.err = err;
		res.status(500).json({ error });
	}
};
module.exports = { createOrder, getOrder };
