const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		products: [
			{
				productId: String,
				quantity: { type: Number, default: 1 },
				categories: Array,
				color: Array,
				img: Array,
				desc: String,
				title: String,
				price: Number,
				total_price: Number,
			},
		],
		active: {
			type: Boolean,
			default: true,
		},
		modifiedOn: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
