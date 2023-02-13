const { createError } = require("../../utils");
const Billing = require("../../models/Billing");

// module scaffholding
const billingDB = {};
// create billing
billingDB.create = async (data) => {
	try {
		return await Billing.create(data);
	} catch (error) {
		throw error;
	}
};

// update billing
billingDB.update = async (billingId, data) => {
	try {
		return await Billing.findByIdAndUpdate(
			billingId,
			{ $set: data },
			{ new: true }
		);
	} catch (error) {
		throw error;
	}
};
module.exports = billingDB;
