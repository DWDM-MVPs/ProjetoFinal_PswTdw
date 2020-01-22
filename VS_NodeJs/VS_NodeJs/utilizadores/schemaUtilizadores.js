var mongoose = require('mongoose');

// SETUP
var SchemaUtilizadores = mongoose.Schema({
	nome: {
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
var Utilizadores = module.exports = mongoose.model('utilizadores', SchemaUtilizadores);

module.exports.get = function (callback, limit) {
	Utilizadores.find(callback).limit(limit);
}