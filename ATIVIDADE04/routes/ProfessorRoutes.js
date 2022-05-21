const express = require('express');
var router = express.Router();
const ProfessorService = require('../services/ProfessorService');

router.get('/list', (req, res, next) => {
    ProfessorService.list(req,res);
});
router.post('/register', (req, res, next) => {
    ProfessorService.register(req,res);
});
router.put('/update/:id', (req, res, next) => {
    ProfessorService.update(req,res);
});
router.delete('/delete/:id', (req, res, next) => {
    ProfessorService.delete(req,res);
});
router.get('/retrieve/:id', (req, res, next) => {
    ProfessorService.retrieve(req,res);
});
// router.get('/retrieve/login/:login', function (req, res, next) {
//     EstudanteService.retrieveByLogin(req, res);
// });
module.exports = router;
