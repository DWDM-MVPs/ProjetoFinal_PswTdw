// IMPORT SCHEMA
var schemaProdutos = require('./schemaProdutos');
var functions = require("../functions");
var log = functions.log;









// ✅ GET ALL PRODUTOS
exports.getAll = function (req, res) {
	log("r", "s", "getAll (GET - Produtos)");
	schemaProdutos.get(function (error, produtos) {
		if (error) {
			log("e", error);
			res.status(404).send(error);
		}
		log("s", "e", produtos);
		res.status(200).json(produtos).send();
	});
};



// ✅ GET PRODUTO BY NAME
exports.getByName = function (req, res) {
	log("r", "s", "getByName (GET - Produtos)")
	schemaProdutos.findOne({ name: req.body.name }, function (error, produto) {
		if (error) {
			log("e", "e", error);
			res.status(404).json(error).send();
		}
		log("s", "e", produto);
		res.status(200).json(produto).send();
	});
};



// ✅ ADD PRODUTO
exports.addProduto = function (req, res) {
	log("r", "s", "addProduto (POST - Produtos)");
	var novoProduto = new schemaProdutos({
		name: req.body.name,
		stock: req.body.stock,
		allergens: req.body.allergens,
		isActive: req.body.isActive,
	});

	novoProduto.save(function (error) {
		if (error) {
			log("e", "e", error);
			res.status(500).json(error).send();
		}
		log("c", "e", "Name: " + req.body.name + " | Stock: " + req.body.stock + " | Allergens: " + req.body.allergens + " | Is Active: " + req.body.isActive);
		res.status(201).send();
	});
};



// ❎ UPDATE PRODUTO
exports.updateProduto = function (req, res) {
	log("r", "s", "updateProduto (POST - Produtos)");

	schemaProdutos.findOne({ name: req.body.oldName }, function (error, produto) {
		if (error) {
			log("e", "e", error);
			res.status(500).json(error).send();
		}

		produto.name = req.body.name;
		produto.stock = req.body.stock;
		produto.allergens = req.body.allergens;
		produto.isActive = req.body.isActive;

		produto.save(function (error) {
			if (error) {
				log("e", "e", error);
				res.status(500).json(error).send();
			}

			res.status(204).send();
		})
	});
};



// ❎ UPDATE PRECO PRODUTO
exports.updatePreco = function (req, res) {

};



// ❎ UPDATE STOCK PRODUTO
exports.updateStock = function (req, res) {

};



// ❎ DELETE PRODUTO
exports.delete = function (req, res) {
	schemaProdutos.deleteOne({ _id: req.params.id_nota }, function (err, nota) {
		if (error) {
			res.send(error);
		}

		res.status(200).send("Produto apagado com sucesso.");
	});
};




//async function getProduct(req, res, next) {
//	let product;
//	try {
//		product = await schemaProdutos.findById(req.params.id)
//	}
//}