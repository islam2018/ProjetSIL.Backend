const express = require('express');
const router = express.Router();
const AnnonceService=require('../services/AnnonceService');
const MarqueService=require('../services/MarqueService');
const ModeleService=require('../services/ModeleService');
const VersionService=require('../services/VersionService');
const annonceService=new AnnonceService();
const marqueService=new MarqueService();
const modeleService=new ModeleService();
const versionService=new VersionService();

router.get('/:id/annonces',(req,res)=>{
    annonceService.getAllAnnoncesOfAutomobiliste(req.params.id).then(annonces => {
        res.status(200).json(annonces);
    }).catch (err=>{
        res.status(500).json({
            message:'Une erreur a été produite'
        });
    });
});

router.get('/:idAutomob/marques/:CodeMarque/modeles',(req,res)=> {
    modeleService.getAllModelesPourAutomob(req.params.CodeMarque,req.params.idAutomob).then(modeles=>{
        res.status(200).json(modeles)
    }).catch (error=>{
        res.status(500).json({
            message: 'Une erreur s\'est produite !'
        })
    });
});

router.get('/:idAutomob/marques/modeles/:CodeModele',(req,res)=> {
    modeleService.getModelePourAutomob(req.params.CodeModele,req.params.idAutomob).then(modeles=>{
        res.status(200).json(modeles)
    }).catch (error=>{
        res.status(500).json({
            message: 'Une erreur s\'est produite !'
        })
    });
});
router.get('/:idAutomob/marques/modeles/:CodeModele/versions',(req,res)=> {
    versionService.getAllVersionsPourAutomobiliste(req.params.CodeModele,req.params.idAutomob).then(versions=>{
        res.status(200).json(versions)
    }).catch (error=>{
        res.status(500).json({
            message: 'Une erreur s\'est produite !'
        })
    });
});
router.get('/:idAutomob/marques/modeles/versions/:CodeVersion',(req,res)=> {
    versionService.getVersionPourAutomobiliste(req.params.CodeVersion,req.params.idAutomob).then(versions=>{
        res.status(200).json(versions)
    }).catch (error=>{
        res.status(500).json({
            message: 'Une erreur s\'est produite !'
        })
    });
});


router.delete('/automobiliste/:idAutomob/modeles/:CodeModele',(req,res)=>{
    suivieService.supprimerSuivieModele(req.body.idAutomob,req.params.CodeModele).then(suivie=>{
        res.status(200).json({
            message:"Suivie supprimé !"
        });
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !"+error
        })
    });
});

router.delete('/automobiliste/:idAutomob/modeles/:CodeVersion',(req,res)=> {
    suivieService.getSuivieVersion(req.body.idAutomob, req.params.CodeVersion).then(r => {
        if (r != null) {
            suivieService.supprimerSuivieVersion(req.body.idAutomob, req.params.CodeVersion).then(suivie => {
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
