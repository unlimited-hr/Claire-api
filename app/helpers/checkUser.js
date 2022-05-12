const res = require('express/lib/response');
const verify = require('./verify-jwt.js')

module.exports = async (req, user_id) => {
	try {
		const bearer_header = req.get("Authorization");
		const token = bearer_header.slice(7);
		const {payload, protectedHeader} = await verify(token);
		
		const token_uid = payload.user.id;

		return (token_uid == user_id);
	} catch(e) {
		return false;
	}
}
