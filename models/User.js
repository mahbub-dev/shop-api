const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		phone: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		billing: [
			{
				name: { type: String, required: true },
				country: { type: String, required: true },
				state: { type: String, required: true },
				district: { type: String, required: true },
				subdistrict: { type: String, required: true },
				postcode: { type: String, required: true },
				address: { type: String, required: true },
				email:{type:String,}
			},
			{ default: {} },
		],
		img: {
			type: String,
			default:
				"https://simg.nicepng.com/png/small/128-1280406_view-user-icon-png-user-circle-icon-png.png",
		},
		isAdmin: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
