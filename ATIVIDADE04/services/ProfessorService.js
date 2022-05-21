const ProfessorModel = require('../models/ProfessorModels');
class ProfessorService {
    static register(req,res){
        ProfessorModel.create(req.body).ProfessorModel
        .then(
            (professor) => {
                res.status(201).json(professor);
            }
        )
        .catch(
            (error) => {
                res.status(500).json(error);
            }
        );
    }

    static list(req, res) {
        ProfessorModel.find()
            .then(
                (professor) => {
                    res.status(201).json(professor);
                }
            )
            .catch(
                (error) => {
                    res.status(500).json(error);
                }
            )
    }
    static update(req, res) {
        ProfessorModel.findByIdAndUpdate(req.params.id, req.body, { 'new': true })
            .then(
                (professor) => {
                    res.status(201).json(professor);
                }
            )
            .catch(
                (error) => {
                    res.status(500).json(error);
                }
            )
    }
    //retorna o professor deletado
    static delete(req, res) {
        ProfessorModel.findByIdAndRemove(req.params.id)
            .then(
                (professor) => {
                    res.status(201).json(professor);
                }
            );
    }
    //retorna um professor
    static retrieve(req, res) {
        ProfessorModel.findById(req.params.id)
            .then(
                (professor) => {
                    res.status(201).json(professor);
                }
            );
    }
    static retrieveByLogin(req, res) {
        ProfessorModel.find({ 'login': req.params.login }).then(
            (professor) => {
                res.status(201).json(professor);
            }
        );
    }
};
module.exports = ProfessorService;