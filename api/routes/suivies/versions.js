const express = require('express');
const router = express.Router();
const SuivieService = require('../../services/SuivieService');
const suivieService = new SuivieService();
const VersionService = require('../../services/VersionService');
const versionService = new VersionService();


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

router.get('',(req,res)=>{
    let automobilste = req.query.automobiliste;
    let page =req.query.page;
    versionService.getAllVersionsSuivies(automobilste,page).then(versions=>{
        res.status(200).json(versions);
    }).catch(er=>{
       res.status(500).json({
           message:'Une erreur s\'est produite'+er
       });
    });
});




module.exports = router;
