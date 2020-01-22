// SCHEMA
var schemaUsers = require('./schemaUsers');
var functions = require("../functions");
var log = functions.log;
let jwt = require('jsonwebtoken');

// ROUTES
let apiUsers = require("express").Router();









// ✅ GET USER BY NAME
apiUsers.route("/users/get-user/by-name").post(function (req, res) {
	log("r", "s", "getByName (POST - Users)")

	schemaUsers.findOne({ name: req.body.name }, function (error, produto) {
		if (error) {
			log("e", "e", error);
			res.status(404).json(error).send();
		}

		log("s", "e", produto);
		res.status(200).json(produto).send();
	});
});



// ✅ UPDATE CARRINHO
apiUsers.route("/users/update-carrinho").post(function (req, res) {
	log("r", "s", "updateProduto (POST - Users)");

	schemaUsers.findOne({ name: req.body.name }, function (error, user) {
		if (error) {
			log("e", "e", error);
			res.status(500).json(error).send();
		}

		user.carrinho = req.body.carrinho;

		user.save(function (error) {
			if (error) {
				log("e", "e", error);
				res.status(500).json(error).send();
			}

			log("u", "e", "Carrinho: " + req.body.carrinho);
			res.status(204).send();
		})
	});
});



// ❎ LOGIN
apiUsers.route("/users/login").post(function (req, res) {
	log("l", "s", "login (POST - Users)");
	log("i", "", "Username: " + req.body.name + "\nPassword: " + req.body.password);

	schemaUsers.findOne({ name: req.body.name, password: req.body.password }, function (error, user) {
		if (error) {
			log("e", "e", error);
			res.status(500).json(error).send();
		}

		if (user) {
			log("i", "", "Encontrado um utilizador que corresponde ao Username e Password fornecidos.");
			var token = jwt.sign({ username: req.body.username }, "be",
				{
					expiresIn: '24h'
				}
			);
			log("l", "e", "Token criado: " + token);
		}
		else {
			log("l", "e", "Nenhum utilizador com a combinação de <name> e <password> foi encontrado.");
			res.status(200).send(null);
		}
	});
	// TODO: https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4S
});





// EXPORT API
module.exports = apiUsers;