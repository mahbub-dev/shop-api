const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Billing = require("../models/Billing");
var mongoose = require("mongoose");
const response = require("../utils");

// Creating oreder
const createOrder = async (req, res) => {
	let success = {};
	let error = {};
	try {
		const userId = req.user.id;
		const orderProductId = req.params.id.split(",");
		const { BillingId } = req.body;
		const billing = await Billing.findOne({ userId });
		const selectedBilling = billing.address.filter(
			(i) => JSON.stringify(i._id).replace(/"/gi, "") === BillingId
		)[0];

		let cartList = await Cart.findOne({ userId });
		// find targeted product
		let orderProductIndex = [];
		orderProductId.forEach((i) => {
			const index = cartList.products.findIndex(
				(item) => JSON.stringify(item._id).replace(/"/gi, "") === i
			);
			orderProductIndex.push(index);
		});
		// place order function
		const placeOrder = async (itemId) => {
			let orderProducts = cartList.products[itemId];
			const productId = orderProducts._id;
			orderProducts._id = mongoose.Types.ObjectId();
			const address = selectedBilling;
			const status = "pending";
			orderProducts = {
				...orderProducts,
				productId,
				address,
				status,
			};
			orderProducts.createdAt = new Date().toLocaleString();
			orderProducts.updatedAt = new Date().toLocaleString();
			let userOrder = await Order.findOne({ userId });
			userOrder.orders.push(orderProducts);
			success = await userOrder.save();
			if (Object.keys(success).length > 0) {
				return true;
			} else return false;
		};


		const filteredCartList = cartList.products.filter(
			(i) =>
				!orderProductId.includes(
					JSON.stringify(i._id).replace(/"/gi, "")
				)
		);
		if (orderProductIndex.length > 0) {
			orderProductIndex.forEach((i) => {
				placeOrder(i);
			});
		}

		//delete ordered item from cart list
		cartList.products = filteredCartList;
		await cartList.save();
		response(error, success, res);
	} catch (err) {
		console.log(err);
		error.server = err;
		res.json({ error });
	}
};

//Get order
const getOrder = async (req, res) => {
	let error = {};
	let success = {};
	try {
		success = await Order.findOne({userId:req.user.id});
		response(error, success, res);
	} catch (err) {
		error.sever = "somthing went wrong";
		error.err = err;
		res.status(500).json({ error });
	}
};
module.exports = { createOrder, getOrder };
