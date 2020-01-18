var mongoose = require('mongoose');

// SETUP
var schemaUtilizadores = mongoose.Schema({
	_id: {
		type: String,
		required: true,
		unique: true,
		alias: 'nome',
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	carrinho: [
		{
			ID_Produto: {
				type: Number,
			},
		},
	],
	historico: [
		{
			ID_Produto: {
				type: Number,
			}
		}
	],
});

// EXPORT
var Utilizadores = module.exports = mongoose.model('utilizadores', notasSchema);

module.exports.get = function (callback, limit) {
	Utilizadores.find(callback).limit(limit);
}