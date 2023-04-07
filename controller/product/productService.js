const { createError } = require("../../utils");
const productDB = require("./productDB");
// module saffholding
const productService = {};

// create product
productService.create = async (prodData) => {
	try {
		const res = await productDB.create(prodData);
		if (res) {
			return res;
		} else createError("something went wrong", 400);
	} catch (error) {
		throw error;
	}
};

// update product
productService.update = async (id, data) => {
	try {
		return await productDB.update(id, data);
	} catch (error) {
		throw error;
	}
};

// get all product
productService.getAll = async (category) => {
	try {
		return await productDB.getAll(category?.qNew, category?.qCategory);
	} catch (error) {
		throw error;
	}
};
// get search product
productService.getSearch = async (data) => {
	try {
		const res = await productDB.getSearch(data);
		if (res.length > 0) {
			return res;
		} else {
			createError("no result found", 404);
		}
	} catch (error) {
		throw error;
	}
};

// export module
module.exports = productService;
