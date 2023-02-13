const Product = require("../../models/Product");
const { errorResponse } = require("../../utils.js");
const Cart = require("../../models/Cart");
const cartService = require("./cartService");

//CREATE
const createCart = async (req, res) => {
	try {
		const userId = req.user.id;
		// let productId = req.params.id;
		let { quantity, color, size, total_price, productId } = req.body;
		const serviceRes = await cartService.create({
			userId,
			productId,
			total_price,
			quantity,
			color,
			size,
		});
		res.status(201).json(serviceRes);
	} catch (err) {
		errorResponse(res, err);
	}
};

// DELETE ONE
const deleteCart = async (req, res) => {
	const userId = req.user.id;
	const { id } = req.params;
	try {
		const data = await cartService.delete(userId, id);
		res.status(201).json(data.productId);
	} catch (err) {
		errorResponse(res, err);
	}
};

//GET USER CART
const getCart = async (req, res) => {
	try {
		success = await Cart.find({ userId: req.user.id });
		res.status(200).json(success);
	} catch (err) {
		errorResponse(res, err);
	}
};

module.exports = { createCart, deleteCart, getCart };
