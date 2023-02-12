const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
		total_price: { type: Number, required: true },
		quantity: { type: Number, required },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
