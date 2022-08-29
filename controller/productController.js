const Product = require("../models/Product");
const response = require("../utils");

//CREATE
const createPrdouct = async (req, res) => {
	let error = {};
	let success = {};
	try {
		const newProduct = new Product(req.body);
		success = await newProduct.save();
		response(error, success, res);
	} catch (err) {
		console.log(err);
		error.server = "something went wrong";
		res.json({ error });
	}
};
//UPDATE
const updateProduct = async (req, res) => {
	let error = {};
	let success = {};
	try {
		const success = await Product.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		response(error, success, res);
	} catch (err) {
		console.log(err);
		error.server = "something went wrong";
		res.json({ error });
	}
};

//DELETE
const deleteProduct = async (req, res) => {
	let error = {};
	let success = {};
	try {
		await Product.findByIdAndDelete(req.params.id);
		success = "Product has been deleted...";
		response(error, success, res);
	} catch (err) {
		console.log(err);
		error.server = "someting went wrong";
		res.json({ error });
	}
};

//GET PRODUCT
const getProduct = async (req, res) => {
	let error = {};
	let success = {};
	try {
		success = await Product.findById(req.params.id);
		response(error, success, res);
	} catch (err) {
		console.log(err);
		error.server = "something went wrong";
		res.json({ error });
	}
};

//GET ALL PRODUCTS
const getAllProduct = async (req, res) => {
	const qNew = req.query.new;
	const qCategory = req.query.category;
	let error = {};
	let success = {};
	try {
		if (qNew) {
			success = await Product.find().sort({ createdAt: -1 }).limit(1);
		} else if (qCategory) {
			success = await Product.find({
				categories: {
					$in: [qCategory],
				},
			});
		} else {
			success = await Product.find();
		}
		response(error, success, res);
	} catch (err) {
		console.log(err);
		error.server = "something went wrong";
		json({ error });
	}
};

module.exports = {
	createPrdouct,
	updateProduct,
	deleteProduct,
	getAllProduct,
	getProduct,
};
