const express = require('express');
const router = express.Router();
const UtilFabAccesControl= require('../../../control/AccessControl').UtilFabAccessControl;
const AutoMobAccesControl= require('../../../control/AccessControl').AutomobAccessControl;
const VersionService=require('../../../services/VersionService');
const OptionService=require('../../../services/OptionService');
const CouleurService=require('../../../services/CouleurService');
const LigneTarifService=require('../../../services/LigneTarifService');
const versionService=new VersionService();
const optionService=new OptionService();
const couleurService=new CouleurService();
const ligneTarifService=new LigneTarifService();


router.get('/:id', (req,res) => {
    versionService.getVersion(req.params.id).then(version=>{
        res.status(200).json(version);
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !",
        });
    });
});

router.put('/:id',UtilFabAccesControl, (req,res) => {
    versionService.getVersion(req.params.id).then(version => {
        if ( version == null ) {
            res.status(404).json({
                message: "Version inexistante"
            });
        } else {
            versionService.updateVersion(req.body,req.params.id).then( resu => {
                if (resu) {
                    versionService.getVersion(req.params.id).then(ver=>{
                        res.status(200).json(ver);
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
            }).catch( error => {
                res.status(500).json({
                    message: "Une erreur a éte produite !"
                });
            });
        }
    });
});

router.delete('/:id',UtilFabAccesControl, (req,res) => {
    versionService.deleteVersion(req.params.id).then( version => {
        res.status(200).json({
            message:"Version supprimée !"
        });
    }).catch( error => {
        res.status(500).json({
            message: "Une erreur a éte produite !"
        });
    });
});

router.get('/:id/options', (req,res) => {
    optionService.getAllOptionsOfVersion(req.params.id).then(options => {
        res.status(200).json(options);
    }).catch( error => {
        res.status(500).json({
            message:"Une erreur a été produite !"+error
        });
    });
});

router.post('/:id/options',UtilFabAccesControl, (req,res) => {
    optionService.findOptionofVersion(req.body.CodeOption,req.params.id).then( option => {
        if ( option != null ) {
            res.status(409).json({
                message: "Option existante pour cette version !"
            });
        } else {
            optionService.getOption(req.body.CodeOption).then(option => {
                if ( option == null ) {
                    optionService.createOption(req.body,req.params.id).then(opt=>{
                        optionService.addOptionforVersion(req.body.CodeOption,req.params.id).then(option => {
                            res.status(200).json(option);
                        }).catch(error => {
                            res.status(500).json({
                                message: "Une erreur a été produite !"
                            });
                        });
                    }).catch(er=>{
                        res.status(500).json({
                            message: "Une erreur a été produite !"
                        });
                    });
                } else {
                    optionService.addOptionforVersion(req.body.CodeOption,req.params.id).then(option => {
                        res.status(200).json(option);
                    }).catch(error => {
                        res.status(500).json({
                            message: "Une erreur a été produite !"
                        });
                    });
                }
            });
        }
    });

});

router.delete('/:id1/options/:id2', UtilFabAccesControl,(req,res) => {
    optionService.removeOptionofVersion(req.params.id2,req.params.id1).then(result=>{
        if (result) {
            res.status(200).json({
                message:"Option supprimé de cette version !"
            });
        }else {
            res.status(500).json({
                message:"Une erreur a été produite !"
            });
        }
    });
});

router.get('/:id/couleurs',(req,res)=>{
    couleurService.getAllCouleurs(req.params.id).then(couleurs => {
        res.status(200).json(couleurs);
    }).catch( error => {
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.post('/:id/couleurs',UtilFabAccesControl,(req,res)=>{
    versionService.findCouleur(req.body.CodeCouleur,req.params.id).then( couleur => {
        if ( couleur != null ) {
            res.status(409).json({
                message: "couleur existante pour ce modele"
            });
        } else {
            couleurService.createCouleur(req.body.CodeCouleur,req.body.NomCouleur).then( couleur => {
                versionService.addCouleur(couleur,req.params.id).then( () => {
                    res.status(200).json(couleur);
                }).catch(error => {
                    res.status(500).json({
                        message: "Une erreur a été produite !"
                    });
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Une erreur a été produite !"
                });
            });
        }
    });
});



router.get('/:id/lignetarif', (req,res) => {
    ligneTarifService.getLigneTarif(req.params.id,0).then(lignetarif=>{
        res.status(200).json(lignetarif);
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !",
        })
    });
});


router.put('/:id/lignetarif',UtilFabAccesControl,(req,res) => {
    ligneTarifService.getLigneTarif(req.params.id,0).then(lignetarif => {
        if ( lignetarif == null ) {
            res.status(404).json({
                message: "lignetarif inexistante"
            });
        } else {
            ligneTarifService.updateLigneTarif(req.body,req.params.id,0).then( resu => {
                if (resu) {
                    ligneTarifService.getLigneTarif(req.params.id,0).then(ligneT=>{
                        res.status(200).json(ligneT);
                    }).catch(err=>{
                        res.status(500).json({
                            message:"Une erreur a été produite !"
                        });
                    });
                } else {
                    res.status(500).json({
                        message:"Une erreur a été produite !"
                    });
                }
            }).catch( error => {
                res.status(500).json({
                    message: "Une erreur a éte produite !"
                });
            });
        }
    });
});

router.delete('/:id/lignetarif',UtilFabAccesControl,(req,res) => {
    ligneTarifService.deleteLigneTarif(req.params.id,0).then( lignetarif => {
        res.status(200).json(lignetarif);
    }).catch( error => {
        res.status(500).json({
            message: "Une erreur a éte produite !"
        });
    });
});




module.exports = router;
