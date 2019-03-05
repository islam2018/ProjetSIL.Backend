const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const serializer=require('sequelize-values')();
const UtilFabAccesControl= require('../control/AccessControl').UtilFabAccessControl;
const AutoMobAccesControl= require('../control/AccessControl').AutomobAccessControl;
const ModeleService=require('../services/ModeleService');
const MarqueService=require('../services/MarqueService');
const VersionService=require('../services/VersionService');
const OptionService=require('../services/OptionService');
const UtilisateurFabricantService=require('../services/UtilisateurFabricantService');
const modeleService=new ModeleService();
const marqueService=new MarqueService();
const utilFabService=new UtilisateurFabricantService();
const versionService=new VersionService();
const optionService=new OptionService();


router.get('/',(req,res)=>{
    marqueService.getAllMarques().then(marques=>{
        res.status(200).json(marques);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"+error
        });
    });
});


router.post('/',UtilFabAccesControl,(req,res)=>{
   marqueService.getMarqueParNom(req.body.NomMarque).then(m=>{
        if (m!=null) {
            res.status(409).json({
                message:"Cette marque existe deja !"
            });
        } else {
                marqueService.createMarque(req.body).then(marque=>{
                res.status(200).json(marque);
            }).catch(error=>{
                res.status(500).json({
                    message:"Une erreur a été produite !"
                });
            });

        }
    }).catch (e=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.get('/:id',(req,res)=>{
    marqueService.getMarque(req.params.id).then(marque=>{
        res.status(200).json(marque);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.put('/:id',UtilFabAccesControl,(req,res)=>{
    marqueService.getMarque(req.params.id).then(marque=>{
        if (marque!=null) {
            marqueService.updateMarque(req.body,req.params.id).then(resu=>{
                if (resu) {
                    marqueService.getMarque(req.params.id).then(m=>{
                        res.status(200).json(m);
                    }).catch(err=>{
                        res.status(500).json({
                            message:"Une erreur a été produite !"
                        });
                    });
                }else {
                    res.status(500).json({
                        message:"Une erreur a été produite !"
                    });
                }
            }).catch(error=>{
                res.status(500).json({
                    message:"Une erreur a été produite !"
                });
            });
        } else {
            res.status(404).json({
                message:"Marque non trouvée !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.delete('/:id',UtilFabAccesControl, (req,res) => {
   marqueService.deleteMarque(req.params.id).then(result=>{
        if (result) {
            res.status(200).json({
                message:"Marque supprimée !"
            });
        }else {
            res.status(500).json({
                message:"Une erreur a été produite !"
            });
        }
    });
});

router.get('/:id/modeles', (req, res) => {

    modeleService.getAllModeles(req.params.id).then(modeles=>{
        res.status(200).json(modeles);
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !"+error,
        })
    });
});

router.post('/:id/modeles',UtilFabAccesControl,(req,res) => {
    modeleService.getModeleParNom(req.body.NomModele).then( modele => {
        if ( modele != null ) {
            res.status(409).json({
                message: "Modèle existant"
            });
        } else {
            modeleService.createModele(req.body,req.params.id).then(modele => {
                res.status(200).json(modele);
            }).catch(error => {
                res.status(500).json({
                    message: "Une erreur a été produite !"
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Une erreur a été produite !"
        });
    });
});

router.get('/:id/utilfab', (req,res) => {
    utilFabService.getAllUtilFabForMarque(req.params.id).then(users=>{
        res.status(200).json(users);
    }).catch (error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.post('/:id/utilfab', (req,res) => {
    bcrypt.hash(req.body.Mdp,null,null,(err,hash)=>{
        if (err) {
            res.status(500).json({
                message: "Une erreur a été produite !"
            });
        } else {

            utilFabService.getUtilFabParMail(req.body.Mail).then(utilfabr=>{
                if (utilfabr!=null) {
                    res.status(409).json({
                        message:"Adresse mail existante !"
                    });
                } else {
                    req.body.Mdp=hash;
                    utilFabService.createUtilFab(req.body,req.params.id).then(utilfab=>{
                        res.status(200).json(utilfab);
                    }).catch(e=>{
                        res.status(500).json({
                            message:"Une erreur a été produite !"
                        });
                    });
                }
            });
        }

    });
});



module.exports = router;
