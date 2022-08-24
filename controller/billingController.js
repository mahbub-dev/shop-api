const Billing = require("../models/Billing");
const response = (error, success, res) => {
	Object.keys(error).length > 0 ? res.json({ error }) : res.json({ success });
};

// create billing
const AddBilling = async (req, res) => {
	let error = {};
	let success = {};
	try {
		const { userId } = req.params;
		const { billing } = req.body;
		let userBilling = await Billing.findOne({ userId });
		if (userBilling) {
			let itemIndex = userBilling.billings.findIndex((item) => {
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
				userBilling.billings.push(billing);
				success = await userBilling.save();
				userBilling.currentBillingId = success._id;
				success = await userBilling.save();
			}
			response(error, success, res);
		} else {
			const newBilling = await Billing.create({
				userId,
				billings: [billing],
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
		const { userId } = req.params;
		const { billing } = req.body;
		const billingId = `"${billing._id}"`;
		let userBilling = await Billing.findOne({ userId });
		if (userBilling) {
			let itemIndex = userBilling.billings.findIndex((item) => {
				if (JSON.stringify(item._id) === billingId) return true;
			});
			if (itemIndex > -1) {
				let item = userBilling.billings[itemIndex];
				item.name = billing.name;
				item.email = billing.email;
				item.phone = billing.phone;
				item.address = billing.address;
				item.postcode = billing.postcode;
				userBilling.billings[itemIndex] = item;
			}
		} else {
			error.msg = "not found";
		}
		success = await userBilling.save();
		response(error, success, res);
	} catch (err) {
		console.log(err);
		error.server = err;
		res.json({ error });
	}
};

// delete billing
const DeleteBilling = async (req, res) => {
	let error = {};
	let success = {};
	try {
		const { userId } = req.params;
		const id = req.body.email;
		let userBilling = await Billing.findOne({ userId });
		if (userBilling) {
			userBilling.billings = userBilling.billings.filter(
				(item) => JSON.stringify(item._id) !== `"${id}"`
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
		const { userId } = req.params;
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
