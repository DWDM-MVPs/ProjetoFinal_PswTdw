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
		});
	});
});



// ✅ LOGIN
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
			var token = jwt.sign({ username: req.body.username }, "milkenm@purediamond.tk",
				{
					expiresIn: '1h'
				}
			);

			log("l", "e", "Token criado: " + token);
			res.status(200).send(token);
		}
		else {
			log("l", "e", "Nenhum utilizador com a combinação de <name> e <password> foi encontrado.");
			res.status(401).send(null);
		}
	});
});



// ❎ CLOSE CARRINHO
apiUsers.route("/users/close-carrinho/:token").post(function (req, res) {
	log("r", "s", "Fechar carrinho: " + req.body.name);

	schemaUsers.findOne({ name: req.body.name }, function (error, user) {
		jwt.verify(req.params.token, "milkenm@purediamond.tk", (error, decoded) => {
			if (error) {
				log("i", "e", "Token inválido: " + req.params.token + "\n" + error);
				res.status(401).send(null);
			}

			var carrinho = user.carrinho;

			for (var i = 0; i < carrinho.length; i++) {
				var obj = carrinho[i];
				console.log(carrinho.name);
			}
			
			var obj = JSON.parse(user.historico);
			obj['historico'].push(user.carrinho);
			jsonStr = JSON.stringify(obj);
			user.historico = jsonStr;
			user.carrinho = null;

			user.save(function (error) {
				if (error) {
					log("e", "e", error);
					res.status(500).json(error).send();
				}

				log("u", "e", "Histórico: " + user.historico);
				res.status(204).send();
			});
		});
	});
});





// EXPORT API
module.exports = apiUsers;