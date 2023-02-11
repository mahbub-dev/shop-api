const { createError } = require("../../utils");
const Product = require("../../models/Product");

// module saffholding
const productDB = {};

// create product
productDB.create = async (data) => {
	try {
		const newProduct = new Product(data);
		await newProduct.save();
	} catch (error) {
		throw error;
	}
};

// update product
productDB.update = async (id, data) => {
	try {
		const success = await Product.findByIdAndUpdate(
			id,
			{
				$set: data,
			},
			{ new: true }
		);
		return success;
	} catch (error) {
		throw error;
	}
};

// get all product
productDB.getAll = async (qNew, qCategory) => {
	try {
		if (qNew) {
			return await Product.find().sort({ createdAt: -1 }).limit(1);
		} else if (qCategory) {
			return await Product.find({
				categories: {
					$in: [qCategory],
				},
			});
		} else {
			return await Product.find();
		}
	} catch (error) {
		throw error;
	}
};

// get search product
productDB.getSearch = async (data) => {
	try {
		return await Product.find({ title: { $regex: /${data}/i } });
	} catch (error) {
		throw error;
	}
};
// export module
module.exports = productDB;
