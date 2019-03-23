const express = require('express');
const router = express.Router();
const UtilisateurFabricantService = require('../services/UtilisateurFabricantService');
const utilFabService = new UtilisateurFabricantService();
const CheckAccountAccesControl= require('../control/AccessControl').CheckAccountAccessControl;
const AdminAccesControl= require('../control/AccessControl').AdminAccessControl;

router.get('/',(req,res)=> {
    utilFabService.getAllUtilFab().then(users=>{
        res.status(200).json(users);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.post('/tokenVerif',CheckAccountAccesControl,(req,res)=>{
    res.status(200).json({message: "token valide"});
});

router.put('/:id', AdminAccesControl,(req,res) => {
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

module.exports = router;
