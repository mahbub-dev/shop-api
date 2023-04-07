const { errorResponse, createError } = require("../../utils");
const billingService = require("./billingService");
const Billing = require("../../models/Billing");

// create billing
const AddBilling = async (req, res) => {
	try {
		const userId = req.user.id;
		const { billing } = req.body;
		const serviceRes = await billingService.create(userId, billing);
		res.status(201).json(serviceRes);
	} catch (err) {
		errorResponse(res, err);
	}
};

// update user billing
const UpdateBilling = async (req, res) => {
	try {
		const userId = req.user.id;
		const data = req.body.billing;
		const { billingId } = req.params;
		const serviceRes = await billingService.update(billingId, data);
		res.status(200).json(serviceRes);
	} catch (err) {
		errorResponse(res, err);
	}
};

// delete billing
const DeleteBilling = async (req, res) => {
	try {
		const { billingId } = req.params;
		let deleteBillings = await Billing.findByIdAndDelete(billingId);
		deleteBillings
			? res.status(204)
			: createError("something went wrong", 500);
	} catch (err) {
		errorResponse(res, err);
	}
};
//get billing
const GetBilling = async (req, res) => {
	try {
		let userBilling = await Billing.find({ _id: req.user.id });
		userBilling
			? res.status(200).json(userBilling)
			: createError("something went wrong", 400);
	} catch (err) {
		errorResponse(res, err);
	}
};

module.exports = { UpdateBilling, AddBilling, DeleteBilling, GetBilling };
