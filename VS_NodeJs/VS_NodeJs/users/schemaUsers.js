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
	isAdmin: {
		type: Boolean,
		default: false,
	},
	carrinho: [{
		idProduto: {
			type: Number,
		},
	}],
	historico: [{
		idProduto: {
			type: Number,
		}
	}],
});

// EXPORT
var Users = module.exports = mongoose.model('users', SchemaUsers);

module.exports.get = function (callback, limit) {
	Users.find(callback).limit(limit);
}