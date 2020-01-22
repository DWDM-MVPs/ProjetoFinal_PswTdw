// SCHEMA
var schemaUtilizadores = require('./schemaUsers');
var functions = require("../functions");
var log = functions.log;

// ROUTES
let apiUsers = require("express").Router();









// ✅ GET USER BY NAME
apiUsers.route("/users/get-user/by-name").post(function (req, res) {
	log("r", "s", "getByName (GET - Users)")

	schemaUtilizadores.findOne({ name: req.body.name }, function (error, produto) {
		if (error) {
			log("e", "e", error);
			res.status(404).json(error).send();
		}

		log("s", "e", produto);
		res.status(200).json(produto).send();
	});
});




// ❎ UPDATE CARRINHO
apiUsers.route("/users/update-produto").patch(function (req, res) {
	log("r", "s", "updateProduto (POST - Users)");

	schemaUtilizadores.findOne({ name: req.body.oldName }, function (error, produto) {
		if (error) {
			log("e", "e", error);
			res.status(500).json(error).send();
		}

		var pre = produto;
		produto.name = req.body.name;
		produto.stock = req.body.stock;
		produto.price = req.body.price;
		produto.allergens = req.body.allergens;
		produto.isActive = req.body.isActive;

		produto.save(function (error) {
			if (error) {
				log("e", "e", error);
				res.status(500).json(error).send();
			}

			log("u", "e", "Produto: " + req.body.oldName + "\nNome: " + req.body.name + " (" + req.body.oldName + ")\nStock: " + req.body.stock + " (" + pre.stock + ")\nPrice: " + req.body.price + " (" + pre.price + ")\nAllergens: " + req.body.allergens + " (" + pre.allergens + ")\nIs Active: " + req.body.isActive + " (" + pre.isActive + ")");
			res.status(204).send();
		})
	});
});



// ❎ LOGIN
apiUsers.route("/users/login").post(function (req, res) {
	log("l", "s", "login (POST - Users)");

	// TODO: https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4S
});





// EXPORT API
module.exports = apiUsers;