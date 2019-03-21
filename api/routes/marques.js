const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const cryptojs = require('crypto-js');
const serializer=require('sequelize-values')();
const jwt = require('jsonwebtoken');
const JWT_CONFIG=require('../config/secret').JWT_CONFIG;
const send = require('../control/mailSender').send;
const checkAccountURL = require('../config/check_account_url');
const AdminAccesControl= require('../control/AccessControl').AdminAccessControl;
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


router.post('/',AdminAccesControl,(req,res)=>{
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

router.put('/:id',AdminAccesControl,(req,res)=>{
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

router.delete('/:id',AdminAccesControl, (req,res) => {
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

    if (req.body.idAutomobiliste != null) {
        modeleService.getAllModelesPourAutomob(req.params.id,req.body.idAutomobiliste).then(modeles => {
            res.status(200).json(modeles);
        }).catch(error => {
            res.status(500).json({
                message: "Une erreur a été produite !" + error,
            })
        });
    } else {
        modeleService.getAllModeles(req.params.id).then(modeles => {
            res.status(200).json(modeles);
        }).catch(error => {
            res.status(500).json({
                message: "Une erreur a été produite !" + error,
            })
        });
    }
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
            message:"Une erreur a été produite !"+error
        });
    });
});

router.post('/:id/utilfab',AdminAccesControl, (req,res) => {
    bcrypt.hash(req.body.Mdp,null,null,(err,hash)=>{
        if (err) {
            res.status(500).json({
                message: "Une erreur a été produite ! 0" +err
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
                        const token = jwt.sign({
                            Id: utilfab.IdUserF,
                            Mail: utilfab.Mail,
                            Fabricant: utilfab.Fabricant,
                            Valide: utilfab.Valide,
                            Bloque: utilfab.Bloque
                        }, JWT_CONFIG.CHECK_KEY, {expiresIn: JWT_CONFIG.expiresIn},);
                        //https://www.c-sharpcorner.com/article/aes-encryptiondecryption-with-angular-7/
                        console.log("*****"+utilfab.IdUserF);
                        console.log("*******"+token);
                        const encryptedId = cryptojs.enc.Base64.stringify(cryptojs.enc.Utf8.parse(utilfab.IdUserF));
                        const encryptedToken = cryptojs.enc.Base64.stringify(cryptojs.enc.Utf8.parse(token));
                        const content = [{
                            IdUserF: utilfab.IdUserF,
                            Nom: utilfab.Nom,
                            Prenom: utilfab.Prenom,
                            Mail: utilfab.Mail,
                            Lien: checkAccountURL+encryptedId+'/'+encryptedToken
                        }];

                        send('ModeleVerification',content).then(()=>{
                            console.log(content);
                            res.status(200).json(utilfab);
                        }).catch(error=>{
                            utilFabService.deleteUtilFab(utilfab.IdUserF).then(()=>{
                                res.status(500).json({
                                    message:"Une erreur a été produite !" +error
                                })
                            });

                        });

                    }).catch(e=>{
                        res.status(500).json({
                            message:"Une erreur a été produite !2" +e
                        });
                    });
                }
            });
        }

    });
});



module.exports = router;
