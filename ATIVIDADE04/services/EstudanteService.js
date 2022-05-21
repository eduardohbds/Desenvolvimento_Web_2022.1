const EstudanteModel = require('../models/EstudanteModels');

class EstudanteService {
    static register(req, res) {
        console.log(req.params);
        EstudanteModel.create(req.body)
        .then(
            (estudante) => {
                res.status(201).json(estudante);
            }
        )
        .catch(
            (error)=>{
                res.status(500).json(error);
            }
        );
    }
    static list(req, res) {
        EstudanteModel.find()
        .then(
            (estudante) => {
                res.status(201).json(estudante);
            }
        )
        .catch(
            (error) => {
                res.status(500).json(error);
            }
        )
    }
    static update(req, res) {
        EstudanteModel.findByIdAndUpdate(req.params.id, req.body, { 'new': true })
        .then(
            (estudante) => {
                res.status(201).json(estudante);
            }
        )
        .catch(
            (error) => {
                res.status(500).json(error);
            }
        )
    }
    //retorna o estudante deletado
    static delete(req, res) {
        EstudanteModel.findByIdAndRemove(req.params.id)
        .then(
            (estudante) => {
                res.status(201).json(estudante);
            }
        );
    }
    //retorna um estudante
    static retrieve(req, res) {
        EstudanteModel.findById(req.params.id)
        .then(
            (estudante) => {
                res.status(201).json(estudante);
            }
        );
    }
    static retrieveByLogin(req, res) {
        EstudanteModel.find({ 'login': req.params.login }).then(
            (estudante) => {
                res.status(201).json(estudante);
            }
        );
    }
};

module.exports = EstudanteService;
