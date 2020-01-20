var mongoose = require('mongoose');

// SETUP
var SchemaCarrinhos = mongoose.Schema({
	_id: {
		type: Number,
		required: true,
		unique: true,
		alias: 'id',
	},
	utilizador: {
		type: String,
		unique: true,
		required: true,
	},
	produtos: [{
		idProduto: {
			type: Number,
			required: true,
		},
		quantidade: {
			type: Number,
			required: true,
		},
	}],
});

// EXPORT
var Carrinhos = module.exports = mongoose.model('carrinhos', SchemaCarrinhos);

module.exports.get = function (callback, limit) {
	Carrinhos.find(callback).limit(limit);
}