// IMPORT SCHEMA
var schemaProdutos = require('./schemaProdutos');









// ❎ GET ALL PRODUTOS
exports.getAll = function (req, res) {
	schemaProdutos.get(function (err, produtos) {
		if (error) {
			res.status(404).send(error);
		}

		res.status(200).send(produtos);
	});
};



// ❎ GET PRODUTO BY NAME
exports.getByName = function (req, res) {
	schemaProdutos.findById(req.params.id_nota, function (err, produtos) {
		if (error) {
			res.status(404).send(error);
		}

		res.status(200).send(produtos);
	});
};



// ✅ ADD PRODUTO
exports.addProduto = function (req, res) {
	console.log("[REQUEST]: addProduto (POST)");
	var novoProduto = new schemaProdutos({
		name: req.body.name,
		stock: req.body.stock,
		allergens: req.body.allergens,
		isActive: req.body.isActive,
	});


	novoProduto.save(function (error) {
		if (error) {
			console.log("[ERRO] " + error);
			res.status(500).send("erro");
		}
		console.log("[PRODUTO +] Name: " + req.body.name + " | Stock: " + req.body.stock + " | Allergens: " + req.body.isActive + ".");
		res.status(201).send();
	});
};



// ❎ UPDATE PRODUTO
exports.update = function (req, res) {
	schemaProdutos.findById(req.params.id_nota, function (error, product) {
		if (error) {
			res.send(error);
		}

		product.name = req.body.name;
		product.disciplina = req.body.disciplina;
		product.nota = req.body.nota;

		product.save(function (error) {
			if (error) {
				res.json(error);
			}
			res.status(204).send();
		});
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