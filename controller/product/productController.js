const { errorRespons, createError } = require("../../utils");
const productService = require("./productService");
const Product = require("../../models/Product");

//CREATE
const createPrdouct = async (req, res) => {
	try {
		const serviceRes = await productService.create(req.body);
		res.status(201).json(serviceRes);
	} catch (err) {
		errorRespons(res, err);
	}
};

//UPDATE
const updateProduct = async (req, res) => {
	try {
		const serivceRes = await productService.update(req.params.id, req.body);
		res.status(200).json(serivceRes);
	} catch (err) {
		errorRespons(res, err);
	}
};

//DELETE
const deleteProduct = async (req, res) => {
	try {
		const item = await Product.findByIdAndDelete(req.params.id);
		if (item) {
			res.status(200).json("product deleted");
		} else createError("item not deleted", 400);
	} catch (err) {
		errorRespons(res, err);
	}
};

//GET PRODUCT
const getProduct = async (req, res) => {
	try {
		const serviceRes = await Product.findById(req.params.id);
		if (serviceRes) {
			res.status(200).json(serviceRes);
		} else {
			createError("not found", 404);
		}
	} catch (err) {
		errorRespons(res, err);
	}
};

//GET ALL PRODUCTS
const getAllProduct = async (req, res) => {
	try {
		const qNew = req.query.new;
		const qCategory = req.query.category;
		const serviceRes = productService.getAll({ qNew, qCategory });
		res.status(200).json(serviceRes);
	} catch (err) {
		errorRespons(res, err);
	}
};

const getSearchProduct = async (req, res) => {
	try {
		const { keyword } = req.params;
		const serviceRes = await productService.getSearch(keyword);
		res.status(200).json(serviceRes);
	} catch (err) {
		errorRespons(res, err);
	}
};
module.exports = {
	createPrdouct,
	updateProduct,
	deleteProduct,
	getAllProduct,
	getSearchProduct,
	getProduct,
};
