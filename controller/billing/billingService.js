const { createError } = require("../../utils");
const billingDB = require("./billingDB");
// module scaffholding
const billingService = {};
// create billing
billingService.create = async (userId, billing) => {
	try {
		const { name, email, phone, postcode, address } = billing;
		return await billingDB.create({
			userId,
			name,
			email,
			phone,
			postcode,
			address,
		});
	} catch (error) {
		throw error;
	}
};
// update billing  
billingService.update = async(billingId,data)=>{
	try {
		const res = await billingDB.update(billingId,data)
		if(res){
			return res
		}else createError('something went wrong',500)
	} catch (error) {
		throw error
	}
}

module.exports = billingService;
