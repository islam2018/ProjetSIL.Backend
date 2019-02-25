const express = require('express');
const router = express.Router();
const VersionService=require('../../../services/VersionService');
const OptionService=require('../../../services/OptionService');
const CouleurService=require('../../../services/CouleurService');
const versionService=new VersionService();
const optionService=new OptionService();
const couleurService=new CouleurService();


router.get('/:id', (req,res) => {
    versionService.getVersion(req.params.id).then(version=>{
        res.status(200).json({version});
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !",
        });
    });
});

router.put('/:id', (req,res) => {
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

router.delete('/:id', (req,res) => {
    versionService.deleteVersion(req.params.id).then( version => {
        res.status(200).json({
            msg:"Version supprimée !"
        });
    }).catch( error => {
        res.status(500).json({
            message: "Une erreur a éte produite !"
        });
    });
});

router.get('/:id/options', (req,res) => {
    optionService.getAllOptionsOfVersion(req.params.id).then(options => {
        res.status(200).json({options});
    }).catch( error => {
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.post('/:id/options', (req,res) => {
    versionService.findOption(req.body.CodeOption,req.params.id).then( option => {
        if ( option != null ) {
            res.status(409).json({
                message: "Option existante pour cette version !"
            });
        } else {
            versionService.addOption(req.body.CodeOption,req.params.id).then(option => {
                res.status(200).json(option);
            }).catch(error => {
                res.status(500).json({
                    message: "Une erreur a été produite !"
                });
            });
        }
    });

});

router.get('/:id/couleurs',(req,res)=>{
    couleurService.getAllCouleurs(req.params.id).then(options => {
        res.status(200).json({options});
    }).catch( error => {
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.post('/:id/couleurs',(req,res)=>{
    versionService.findCouleur(req.body.CodeCouleur,req.params.id).then( couleur => {
        if ( couleur != null ) {
            res.status(409).json({
                message: "Option existante pour ce modele"
            });
        } else {
            versionService.addCouleur(req.body.CodeCouleur,req.params.id).then( couleur => {
                res.status(200).json(couleur);
            }).catch(error => {
                res.status(500).json({
                    message: "Une erreur a été produite !"
                });
            })
        }
    });
});



router.get('/:id/lignetarif', (req,res) => {
    ligneTarifService.getLigneTarif(req.params.id,0).then(lignetarif=>{
        res.status(200).json({lignetarif});
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !",
        })
    });
});


router.put('/:id/lignetarif',(req,res) => {
    ligneTarifService.getLigneTarif(req.params.id,0).then(lignetarif => {
        if ( lignetarif == null ) {
            res.status(404).json({
                message: "Option inexistante"
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

router.delete('/:id/lignetarif',(req,res) => {
    ligneTarifService.deleteLigneTarif(req.params.id,0).then( lignetarif => {
        res.status(200).json(lignetarif);
    }).catch( error => {
        res.status(500).json({
            message: "Une erreur a éte produite !"
        });
    });
});




module.exports = router;
