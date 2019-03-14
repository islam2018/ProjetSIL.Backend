const express= require('express');
const router= express.Router();
const serializer=require('sequelize-values')();

const UtilFabAccesControl= require('../../control/AccessControl').UtilFabAccessControl;
const AutoMobAccesControl= require('../../control/AccessControl').AutomobAccessControl;
const ModeleService=require('../../services/ModeleService');
const VersionService=require('../../services/VersionService');
const OptionService=require('../../services/OptionService');
const modeleService=new ModeleService();
const versionService=new VersionService();
const optionService=new OptionService();


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

    if (req.body.idAutomobiliste!=null) {
        versionService.getAllVersionPourAutomobiliste(req.params.id,req.body.idAutomobiliste).then(versions => {
            res.status(200).json(versions);
        }).catch(error => {
            res.status(500).json({
                message: "Une erreur a été produite !" + error,
            })
        });
    }else {
        versionService.getAllVersion(req.params.id).then(versions => {
            res.status(200).json(versions);
        }).catch(error => {
            res.status(500).json({
                message: "Une erreur a été produite !" + error,
            })
        });
    }
});


router.post('/:id/versions', UtilFabAccesControl, (req,res) => {
    versionService.getVersionParNom(req.body.NomVersion).then( version => {
        if ( version != null ) {
            res.status(409).json({
                message: "Version existante"
            });
        } else {
            versionService.createVersion(req.body,req.params.id).then(version => {
                res.status(200).json(version);
            }).catch(error => {
                res.status(500).json({
                    message: "Une erreur a été produite !"
                });
            });
        }
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
                    optionService.createOption(req.body,req.params.id).then(opt=>{
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


router.delete('/:id/options', UtilFabAccesControl,(req,res) => {
    optionService.removeOptionofModele(req.body.CodeOption,req.params.id).then(result=>{
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

module.exports = router;
