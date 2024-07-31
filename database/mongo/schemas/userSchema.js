const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		default: null
	},
    email : {
        type : String,
        default : null
    },
	password: {
		type: String,
		default: null
	},
	createdAt: {
        type: Date,
        default: Date.now()
    },
}, { collection: "users" });
module.exports = mongoose.model('users', userSchema);