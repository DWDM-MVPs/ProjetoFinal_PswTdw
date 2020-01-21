// IMPORT SCHEMA
UtilizadoresSchema = require('../models/utilizadoresModel');









// Handle index actions
exports.index = function (req, res) {
	UtilizadoresSchema.get(function (err, utilizadores) {
		if (err) {
			res.send(err);
		}

		res.status(200).send(utilizadores);
	});
};











// GET (SELECT) UTILIZADOR
exports.view = function (req, res) {
	UtilizadoresSchema.findById(req.params.id_utilizador, function (err, utilizador) {
		if (err) {
			res.send(err);
		}

		res.status(200).send(utilizador);
	});
};






// POST (INSERT) UTILIZADOR
exports.new = function (req, res) {
	var utilizador = new UtilizadoresSchema();

	utilizador.numeroAluno = req.body.numeroAluno;
	utilizador.nome = req.body.nome;
	utilizador.cidadeNatal = req.body.cidadeNatal;
	utilizador.email = req.body.email;
	utilizador.nascimento = req.body.nascimento;

	utilizador.save(function (err) {
		if (err) {
			res.json(err);
		}
		
		res.status(200).send("Novo utilizador adicionado com sucesso.");
	});
};




// PATCH (UPDATE) UTILIZADOR
exports.update = function (req, res) {
	UtilizadoresSchema.findById(req.params.id_utilizador, function (err, utilizador) {
		if (err) {
			res.send(err);
		}

		utilizador.numeroAluno = req.body.numeroAluno;
		utilizador.nome = req.body.nome;
		utilizador.cidadeNatal = req.body.cidadeNatal;
		utilizador.email = req.body.email;
		utilizador.nascimento = req.body.nascimento;

		utilizador.save(function (err) {
			if (err) {
				res.json(err);
			}
			res.status(200).send("Utilizador atualizado com sucesso.");
		});
	});
};



// DELETE UTILIZADOR
exports.delete = function (req, res) {
	UtilizadoresSchema.deleteOne({_id: req.params.id_utilizador}, function (err, utilizador) {
		if (err) {
			res.send(err);
		}

		res.status(200).send("O utilizador foi apagado com sucesso.");
	});
};