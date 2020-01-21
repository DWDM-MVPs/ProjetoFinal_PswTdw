var mongoose = require('mongoose');

// SETUP
var notasSchema = mongoose.Schema({
    _id: {
        type: Number,
        required: true,
        unique: true,
        alias: 'codigo',
    },
    professor: {
        type: String,
        required: true,
    },
    disciplina: {
        type: String,
        required: true,
    },
    nota: {
        type: Number,
        required: true,
        min: 0,
        max: 20,
    },
}, {
    _id: false,
});

// EXPORT
var Notas = module.exports = mongoose.model('notas', notasSchema);
module.exports.get = function (callback, limit) {
    Notas.find(callback).limit(limit);
}