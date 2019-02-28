const express= require('express');
const router= express.Router();
const UtilFabAccesControl= require('../../../../control/AccessControl').UtilFabAccessControl;
const AutoMobAccesControl= require('../../../../control/AccessControl').AutomobAccessControl;
const LigneTarifService=require('../../../../services/LigneTarifService');
const CouleurService=require('../../../../services/CouleurService');
const couleurService=new CouleurService();
const ligneTarifService=new LigneTarifService();


router.get('/:id', (req,res) => {
    couleurService.getCouleur(req.params.id).then(couleur => {
        res.status(200).json(couleur);
    }).catch (error => {
        res.status(500).json({
            message: "Une erreur a été produite !",
        })
    });
});

router.put('/:id',UtilFabAccesControl, (req,res) => {
    couleurService.getCouleur(req.params.id).then(couleur => {
        if ( couleur == null ) {
            res.status(409).json({
                message: "Couleur inexistante"
            });
        } else {
            couleurService.updateCouleur(req.body,req.params.id).then( resu=> {
                if (resu) {
                    couleurService.getCouleur(req.params.id).then(coul=>{
                        res.status(200).json(coul);
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
    couleurService.deleteCouleur(req.params.id).then( re => {
        res.status(200).json({
            msg:"Couleur supprimée !"
        });
    }).catch( error => {
        res.status(500).json({
            message: "Une erreur a éte produite !"
        });
    });
});

router.get('/:id/lignetarif', (req,res) => {
    ligneTarifService.getLigneTarif(req.params.id,1).then(lignetarif=>{
        res.status(200).json(lignetarif);
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !",
        })
    });
});

router.put('/:id/lignetarif', UtilFabAccesControl,(req,res) => {
    ligneTarifService.getLigneTarif(req.params.id,1).then(lignetarif => {
        if ( lignetarif == null ) {
            res.status(404).json({
                message: "Couleur inexistante !"
            });
        } else {
            ligneTarifService.updateLigneTarif(req.body,req.params.id,1).then(resu => {
                if (resu) {
                    ligneTarifService.getLigneTarif(req.params.id,1).then(ligneT=>{
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

router.delete('/:id/lignetarif',UtilFabAccesControl, (req,res) => {
    ligneTarifService.deleteLigneTarif(req.params.id,1).then( lignetarif => {
        res.status(200).json(lignetarif);
    }).catch( error => {
        res.status(500).json({
            message: "Une erreur a éte produite !"
        });
    });
});


module.exports = router;
