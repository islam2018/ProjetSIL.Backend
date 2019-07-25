const express= require('express');
const router= express.Router();
const serializer=require('sequelize-values')();

const UtilFabAccesControl= require('../../control/AccessControl').UtilFabAccessControl;
const AutoMobAccesControl= require('../../control/AccessControl').AutomobAccessControl;
const ModeleService=require('../../services/ModeleService');
const VersionService=require('../../services/VersionService');
const OptionService=require('../../services/OptionService');
const CouleurService=require('../../services/CouleurService');
const modeleService=new ModeleService();
const versionService=new VersionService();
const optionService=new OptionService();
const couleurService=new CouleurService();
const pusher = require('../../config/secret').PUSHER;


router.get('/:id',(req,res)=>{
    modeleService.getModele(req.params.id).then(modele=>{
        res.status(200).json(modele);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"+error
        });
    });
});

router.put('/:id',UtilFabAccesControl,(req,res)=>{
    modeleService.getModele(req.params.id).then(modele=>{
        if (modele!=null) {
            modeleService.updateModele(req.body,req.params.id).then(resu=>{
                if (resu) {
                    modeleService.getModele(req.params.id).then(m=>{
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
                message:"Modele non trouvée !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});


router.delete('/:id', UtilFabAccesControl,(req,res) => {
    modeleService.deleteModele(req.params.id).then(result=>{
        if (result) {
            res.status(200).json({
                message:"Modele supprimé !"
            });
        }else {
            res.status(500).json({
                message:"Une erreur a été produite !"
            });
        }
    });
});


router.get('/:id/versions', (req,res) => {


        versionService.getAllVersion(req.params.id).then(versions => {
            res.status(200).json(versions);
        }).catch(error => {
            res.status(500).json({
                message: "Une erreur a été produite !" + error,
            })
        });

});


router.post('/:id/versions', UtilFabAccesControl, (req,res) => {
    versionService.getVersionParNom(req.body.NomVersion).then( version => {
        if ( version != null ) {
            res.status(409).json({
                message: "Version existante"
            });
        } else {
            versionService.createVersion(req.body,req.params.id).then(version => {
                versionService.getVersion(version.CodeVersion).then(v=>{
                    pusher.trigger('version-channel'+req.params.id,'newVersion',v);
                    res.status(200).json(v);
                }).catch(e=>{
                    res.status(500).json({
                        message:"Une erreur a été produite !"
                    });
                });
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


router.get('/:id/options', (req,res) => {
    optionService.getAllOptionsOfModele(req.params.id).then(options => {
        res.status(200).json(options);
    }).catch( error => {
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.post('/:id/options',UtilFabAccesControl, (req,res) => {
    optionService.findOptionofModele(req.body.CodeOption,req.params.id).then( option => {
        if ( option != null ) {
            res.status(409).json({
                message: "Option existante pour ce modele !"
            });
        } else {
            optionService.getOption(req.body.CodeOption).then(option => {
                if ( option == null ) {
                    optionService.createOption(req.body).then(opt=>{
                        optionService.addOptionforModele(req.body.CodeOption,req.params.id).then(option => {
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
                    optionService.addOptionforModele(req.body.CodeOption,req.params.id).then(option => {
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
    optionService.removeOptionofModele(req.params.id2,req.params.id1).then(result=>{
        if (result) {
            res.status(200).json({
                message:"Option supprimé de ce modèle !"
            });
        }else {
            res.status(500).json({
                message:"Une erreur a été produite !"
            });
        }
    });
});

/**COULEURS**/
router.get('/:id/couleurs', (req,res) => {
    couleurService.getAllCouleursOfModele(req.params.id).then(couleurs => {
        res.status(200).json(couleurs);
    }).catch( error => {
        res.status(500).json({
            message:"Une erreur a été produite !"+error
        });
    });
});

router.post('/:id/couleurs',UtilFabAccesControl, (req,res) => {
    couleurService.findCouleurofModele(req.body.CodeCouleur,req.params.id).then( couleur => {
        if ( couleur != null ) {
            res.status(409).json({
                message: "Couleur existante pour ce modele !"
            });
        } else {
            couleurService.getCouleur(req.body.CodeCouleur).then(couleur => {
                if ( couleur == null ) {
                   couleurService.createCouleur(req.body).then(coul=>{
                        couleurService.addCouleurforModele(req.body.CodeCouleur,req.params.id).then(couleur => {
                            res.status(200).json(couleur);
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
                    couleurService.addCouleurforModele(req.body.CodeCouleur,req.params.id).then(couleur => {
                        res.status(200).json(couleur);
                    }).catch(error => {
                        res.status(500).json({
                            message: "Une erreur a été produite !"
                        });
                    });
                }
            }).catch(er=>{
                res.status(500).json({
                    message: "Une erreur a été produite !"
                });
            });;
        }
    }).catch(er=>{
        res.status(500).json({
            message: "Une erreur a été produite !"
        });
    });

});


router.delete('/:id1/couleurs/:id2', UtilFabAccesControl,(req,res) => {
    couleurService.removeCouleurofModele(req.params.id2,req.params.id1).then(result=>{
        if (result) {
            res.status(200).json({
                message:"Couleur supprimé de ce modèle !"
            });
        }else {
            res.status(500).json({
                message:"Une erreur a été produite !"
            });
        }
    });
});

module.exports = router;
