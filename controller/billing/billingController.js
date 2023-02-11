const Billing = require("../../models/Billing");
const response = require("../../utils");

// create billing
const AddBilling = async (req, res) => {
	let error = {};
	let success = {};
	try {
		const userId = req.user.id;
		const { billing } = req.body;
		let userBilling = await Billing.findOne({ userId });
		if (userBilling) {
			let itemIndex = userBilling.address.findIndex((item) => {
				if (
					item.email === billing.email ||
					item.phone === billing.phone
				)
					return true;
			});
			if (itemIndex > -1) {
				error.msg =
					"You have already a billing address with the given email or phone";
			} else {
				userBilling.address.push(billing);
				success = await userBilling.save();
			}
			response(error, success, res);
		} else {
			const newBilling = await Billing.create({
				userId,
				address: [billing],
			});
			success = newBilling;
			response(error, success, res);
		}
	} catch (err) {
		console.log(err);
		error.server = err;
		res.json({ error });
	}
};

// update user billing
const UpdateBilling = async (req, res) => {
	let error = {};
	let success = {};
	try {
		const userId = req.user.id;
		const { billing } = req.body;
		const { billingId } = req.params;
		let userBilling = await Billing.findOne({ userId });
		const userBillingId = JSON.stringify(
			userBilling.address[0]._id
		).replace(/"/gi, "");

		console.log(userBillingId);
		console.log(billingId);
		if (userBilling) {
			let itemIndex = userBilling.address.findIndex(
				(item) =>
					JSON.stringify(item._id).replace(/"/gi, "") === billingId
			);
			if (itemIndex > -1) {
				let item = userBilling.address[itemIndex];
				item.name = billing.name;
				item.email = billing.email;
				item.phone = billing.phone;
				item.address = billing.address;
				item.postcode = billing.postcode;
				userBilling.address[itemIndex] = item;
			}
		} else {
			error.msg = "not found";
		}
		success = await userBilling.save();
		response(error, success, res);
	} catch (err) {
		console.log(err);
		error.server = 'something went wrong';
		res.json({ error });
	}
};

// delete billing
const DeleteBilling = async (req, res) => {
	let error = {};
	let success = {};
	try {
		const userId = req.user.id;
		const { billingId } = req.params;
		let userBilling = await Billing.findOne({ userId });
		if (userBilling) {
			userBilling.address = userBilling.address.filter(
				(item) => JSON.stringify(item._id) !== `"${billingId}"`
			);
			success = await userBilling.save();
		} else {
			error.msg = "not found";
		}
		response(error, success, res);
	} catch (err) {
		console.log(err);
		error.server = err;
		res.json({ error });
	}
};
//get billing
const GetBilling = async (req, res) => {
	let error = {};
	let success = {};
	try {
		const userId = req.user.id;
		let userBilling = await Billing.findOne({ userId });
		userBilling ? (success = userBilling) : (error.msg = "not found");
		response(error, success, res);
	} catch (err) {
		console.log(err);
		error.server = err;
		res.json({ error });
	}
};

module.exports = { UpdateBilling, AddBilling, DeleteBilling, GetBilling };
