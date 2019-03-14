const express = require('express');
const router = express.Router();
const SuivieService = require('../../services/SuivieService');
const suivieService = new SuivieService();


router.post('/:id',(req,res)=>{
    suivieService.getSuivieVersion(req.body.idAutomobiliste, req.params.id).then (r=>{
        if (r==null) {
            suivieService.ajouterSuivieVersion(req.body.idAutomobiliste,req.params.id).then(suivie=>{
                res.status(200).json(suivie);
            }).catch (error=>{
                res.status(500).json({
                    message: "Une erreur a été produite !"
                })
            });
        }
        else {
            res.status(409).json({
                message: "Version deja suivie !"
            });
        }
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !"
        })
    });

});

router.delete('/:id',(req,res)=> {
    suivieService.getSuivieVersion(req.body.idAutomobiliste, req.params.id).then(r => {
        if (r != null) {
            suivieService.supprimerSuivieVersion(req.body.idAutomobiliste, req.params.id).then(suivie => {
                res.status(200).json({
                    message: "Suivie supprimé !"
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Une erreur a été produite !"
                })
            });
        } else {
            res.status(404).json({
                message: "Version non suivie !"
            });
        }
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !"
        })
    });
});


module.exports = router;
