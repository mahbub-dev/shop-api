﻿const mongoose = require("mongoose");
const BillingSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
		address: { type: String, required: true },
		postcode: { type: String, required: true },
		isDefault: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Billing", BillingSchema);
