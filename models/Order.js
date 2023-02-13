const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		billingId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Billing",
			required: true,
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Product",
		},
		status: { type: String, default: "pending" },
		size: { type: String, required: true },
		color: { type: String, required: true },
		quantity: { type: Number, required: true },
		price: { type: Number, required: true },
		total_price: { type: Number, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
