var mongoose = require('mongoose');

// SETUP
var utilizadoresSchema = mongoose.Schema({
    _id: {
        type: Number,
        required: true,
        unique: true,
        alias: 'numeroAluno',
    },
    nome: {
        type: String,
        required: true,
    },
    cidadeNatal: {
        type: String,
    },
    email:{
        type: String,
        required: true,
    },
    nascimento:{
        type: Date,
        required: true,
    },
});

// EXPORT
var Utilizadores = module.exports = mongoose.model('utilizadores', utilizadoresSchema);
module.exports.get = function (callback, limit) {
    Utilizadores.find(callback).limit(limit);
}