const express = require('express');
const router = express.Router();
const SuivieService = require('../../services/SuivieService');
const suivieService = new SuivieService();


router.post('/:id',(req,res)=>{
    suivieService.getSuivieModele(req.body.idAutomobiliste,req.params.id).then(m=>{
        if (m==null) {
            suivieService.ajouterSuivieModele(req.body.idAutomobiliste,req.params.id).then(suivie=>{
                res.status(200).json(suivie);
            }).catch (error=>{
                res.status(500).json({
                    message: "Une erreur a été produite !"+error
                });
            });
        } else {
            res.status(409).json({
                message: "Modele deja suivie !"
            });
        }
    }).catch(e=>{
        res.status(500).json({
            message: "Une erreur a été produite !"+error
        });
    });

});




module.exports = router;
