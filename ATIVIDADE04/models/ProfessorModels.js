const mongoose = require('mongoose');

var ProfessorSchema = mongoose.Schema(
    {
        nome: { type: String, required: true, max: 150 },
        university: { type: String, required: true, max: 100 },
        degree: { type: String, required: true, max: 100 }
    }
);

var ProfessorModel = mongoose.model('estudantes', EstudanteSchema);