var mongoose = require('mongoose');

// SETUP
var schemaProdutos = mongoose.Schema({
	_id: {
		type: Number,
		required: true,
		unique: true,
		alias: 'id',
	},
	nome: {
		type: String,
		required:true,
	},
	stock: {
		type: Number,
		default: 0,
	},
	allergens: {
		type: String,
		required: false,
	},
	isActive: {
		type: Boolean,
		default: true,
	},
});

// EXPORT
var Produtos = module.exports = mongoose.model('produtos', notasSchema);

module.exports.get = function (callback, limit) {
	Produtos.find(callback).limit(limit);
}