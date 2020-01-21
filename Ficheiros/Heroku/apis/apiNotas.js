// IMPORT SCHEMA
NotasSchema = require('../models/notasModel');









// Handle index actions
exports.index = function (req, res) {
    NotasSchema.get(function (err, notas) {
        if (err) {
        	res.send(err);
        }

        res.status(200).send(notas);
    });
};











// GET (SELECT) NOTA
exports.view = function (req, res) {
	NotasSchema.findById(req.params.id_nota, function (err, nota) {
		if (err) {
			res.send(err);
		}

		res.status(200).send(nota);
	});
};






// POST (INSERT) NOTA
exports.new = function (req, res) {
	var nota = new NotasSchema();

	nota.professor = req.body.professor;
	nota.disciplina = req.body.disciplina;
	nota.nota = req.body.nota;

	nota.save(function (err) {
		if (err) {
			res.json(err);
		}
		
		res.status(200).send("Nova nota adicionada com sucesso.");
	});
};




// PATCH (UPDATE) NOTA
exports.update = function (req, res) {
	NotasSchema.findById(req.params.id_nota, function (err, nota) {
		if (err) {
			res.send(err);
		}

		nota.professor = req.body.professor;
		nota.disciplina = req.body.disciplina;
		nota.nota = req.body.nota;

		nota.save(function (err) {
			if (err) {
				res.json(err);
			}
			res.status(200).send("Nota atualizada com sucesso.");
		});
	});
};



// DELETE NOTA
exports.delete = function (req, res) {
	NotasSchema.deleteOne({_id: req.params.id_nota}, function (err, nota) {
		if (err) {
			res.send(err);
		}

		res.status(200).send("A nota foi apagada com sucesso.");
	});
};