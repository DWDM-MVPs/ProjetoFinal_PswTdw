var mongoose = require('mongoose');

// SETUP
var SchemaProdutos = mongoose.Schema({
				name: {
								type: String,
								unique: true,
								required: true,
				},
				stock: {
								type: Number,
								required: true,
				},
				price: {
								type: Number,
								required: true,
				},
				allergens: {
								type: Boolean,
								required: false,
				},
				isActive: {
								type: Boolean,
								default: true,
				},
});

// EXPORT
var Produtos = module.exports = mongoose.model('produtos', SchemaProdutos);

module.exports.get = function (callback, limit)
{
				Produtos.find(callback).limit(limit);
}