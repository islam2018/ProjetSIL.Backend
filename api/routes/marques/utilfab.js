const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const UtilFabAccesControl= require('../../control/AccessControl').UtilFabAccessControl;
const AdminAccesControl= require('../../control/AccessControl').AdminAccessControl;
const UtilisateurFabricantService=require('../../services/UtilisateurFabricantService');
const utilFabService=new UtilisateurFabricantService();




router.get('/:id', (req,res) => {
    utilFabService.getUtilFab(req.params.id).then(user=>{
        res.status(200).json({user});
    }).catch (error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"+error
        })
    });
});

router.put('/:id', UtilFabAccesControl,(req,res) => {
    utilFabService.getUtilFab(req.params.id).then(utilfab=>{
        if (utilfab!=null) {
            utilFabService.updateUtilFab(req.body,req.params.id).then(resu=>{
                if (resu) {
                    utilFabService.getUtilFab(req.params.id).then(userf=>{
                        res.status(200).json(userf);
                    }).catch(error=>{
                        res.status(500).json({
                            message:"Une erreur a été produite !"
                        });
                    });
                } else {
                    res.status(500).json({
                        message:"Une erreur a été produite !"
                    });
                }
            }).catch(error=>{
                res.status(500).json({
                    message:"Une erreur a été produite !"
                });
            });
        }
    }).catch(err=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.put('/:id/mdp',UtilFabAccesControl, (req,res) => {
    utilFabService.getUtilFab(req.params.id).then(utilfab=>{
        if (utilfab!=null) {
            bcrypt.hash(req.body.Mdp,10,(err,hash)=>{
                if (err) {
                    res.status(500).json({
                        message:"Une erreur a été produite !"
                    })
                } else {
                    req.body.Mdp=hash;
                    utilFabService.updateMdpForUtilFab(req.body,req.params.id).then(resu => {
                        if (resu) {
                            utilFabService.getUtilFab(req.params.id).then(userf=>{
                                res.status(200).json(userf);
                            }).catch(error=>{
                                res.status(500).json({
                                    message:"Une erreur a été produite !"
                                });
                            });
                        } else {
                            res.status(500).json({
                                message:"Une erreur a été produite !"
                            });
                        }
                    }).catch(error => {
                        res.status(500).json({
                            message: "Une erreur a été produite !"
                        });
                    });
                }
            });
        }
    }).catch(err=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.delete('/:id',AdminAccesControl,(req,res) => {
    utilFabService.deleteUtilFab(req.params.id).then(result=>{
        if (result) {
            res.status(200).json({
                message:"Utilisateur supprimé !"
            });
        }else {
            res.status(500).json({
                message:"Une erreur a été produite !"
            });
        }
    });
});


module.exports = router;
