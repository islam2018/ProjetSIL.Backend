const express = require('express');
const router = express.Router();
const SuivieService = require('../../services/SuivieService');
const suivieService = new SuivieService();


router.post('/:id',(req,res)=>{
    suivieService.ajouterSuivieModele(req.body.idAutomobiliste,req.params.id).then(suivie=>{
       res.status(200).json(suivie);
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !"
        })
    });
});

router.delete('/:id',(req,res)=>{
    suivieService.supprimerSuivieModele(req.body.idAutomobiliste,req.params.id).then(suivie=>{
        res.status(200).json({
          message:"Suivie supprimé !"
        });
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !"+error
        })
    });
});


module.exports = router;
