const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const billingRoute = require("./routes/billingRouter");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute")
const orderRoute = require("./routes/orderRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
mongoose
	.connect(process.env.MONGO_URI, (err) => {
		if (err) throw err;
		console.log("DB Connection Successfull!");
	})
	.catch((err) => {
		console.log(err);
	});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/billings", billingRoute);

app.listen(process.env.PORT || 5000, () => {
	console.log(`Backend server is running! ${process.env.PORT || 5000}`);
});
