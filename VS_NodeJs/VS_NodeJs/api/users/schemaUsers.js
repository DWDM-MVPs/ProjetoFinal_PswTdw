var mongoose = require('mongoose');

// SETUP
var SchemaUsers = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	balance: {
		type: Number,
		default: 0,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	carrinho: {
		type: Array,
	},
	history: {
		type: Array,
	}
});

// EXPORT
var Users = module.exports = mongoose.model('users', SchemaUsers);

module.exports.get = function (callback, limit) {
	Users.find(callback).limit(limit);
}