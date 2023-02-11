const Cart = require("../../models/Cart");
const User = require("../../models/User");
const Product = require("../../models/Product");
const response = require("../../utils.js");

//CREATE
const createCart = async (req, res) => {
	let error = {};
	let success = {};
	try {
		const userId = req.user.id;
		let _id = req.params.id;
		let { quantity, color, size } = req.body;
		let cartItem = await Product.findById(_id);
		let total_price = quantity * cartItem.price;
		if (cartItem) {
			cartItem = {
				...cartItem._doc,
				quantity,
				total_price,
			};
			color && (cartItem.color = color), size && (cartItem.size = size);
			let cart = await Cart.findOne({ userId });
			if (cart) {
				//cart exists for user
				let itemIndex = cart.products.findIndex(
					(p) => JSON.stringify(p._id).replace(/"/gi, "") === _id
				);
				if (itemIndex > -1) {
					//product exists in the cart, update the quantity
					cart.products[itemIndex] = cartItem;
				} else {
					//product does not exists in cart, add new item
					cart.products.push(cartItem);
				}
				success = await cart.save();
			} else {
				//no cart for user, create new cart
				success = await Cart.create({
					userId,
					products: cartItem,
				});
			}
		} else {
			error = "product item not found";
		}

		response(error, success, res);
	} catch (err) {
		console.log(err);
		error.server = "something went wrong";
		res.json({ error });
	}
};

// DELETE ONE
const deleteCart = async (req, res) => {
	const userId = req.user.id;
	const { id } = req.params;
	let error = {};
	let success = {};
	try {
		let cart = await Cart.findOne({ userId });
		//product exists in the cart, update the quantity
		const filterItem = cart.products.filter(
			(i) => JSON.stringify(i._id).replace(/"/gi, "") !== id
		);
		cart.products = id === "0" ? [] : filterItem;
		success = await cart.save();
		response(error, success, res);
	} catch (err) {
		console.log(err);
		error.server = "something went wrong";
		res.json({ error });
	}
};

//GET USER CART
const getCart = async (req, res) => {
	let success = {};
	let error = {};
	try {
		success = await Cart.findOne({ userId: req.user.id });
		response(error, success, res);
	} catch (err) {
		console.log(err);
		error.server = " something went wrong";
		res.json({ error });
	}
};

module.exports = { createCart, deleteCart, getCart };
