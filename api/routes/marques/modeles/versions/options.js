const express= require('express');
const router= express.Router();
const UtilFabAccesControl= require('../../../../control/AccessControl').UtilFabAccessControl;
const AutoMobAccesControl= require('../../../../control/AccessControl').AutomobAccessControl;
const LigneTarifService=require('../../../../services/LigneTarifService');
const OptionService=require('../../../../services/OptionService');
const optionService=new OptionService();
const ligneTarifService=new LigneTarifService();



router.get('/:id', (req,res) => {
    optionService.getOption(req.params.id).then(option=>{
        res.status(200).json(option);
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !",
        })
    });
});


router.put('/:id',UtilFabAccesControl,(req,res) => {
    optionService.getOption(req.params.id).then(option => {
        if ( option == null ) {
            res.status(404).json({
                message: "Option inexistante !"
            });
        } else {
            optionService.updateOption(req.body,req.params.id).then( resu => {
                if (resu) {
                    optionService.getOption(req.params.id).then(opt=>{
                        res.status(200).json(opt);
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

router.delete('/:id',UtilFabAccesControl,(req,res) => {
    optionService.deleteOption(req.params.id).then( option => {
        res.status(200).json(option);
    }).catch( error => {
        res.status(500).json({
            message: "Une erreur a éte produite !"
        });
    });
});


router.get('/:id/lignetarif', (req,res) => {
    ligneTarifService.getLigneTarif(req.params.id,2).then(lignetarif=>{
        res.status(200).json(lignetarif);
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !",
        })
    });
});


router.post('/:id/lignetarif',(req,res) => {
    ligneTarifService.getLigneTarif(req.params.id,2).then(lignetarif => {
        if (lignetarif!=null) {
            res.status(409).json({
                message: 'Une ligne tarif existe deja pour cette option !'
            });
        } else {
            ligneTarifService.createLigneTarif(req.body,2,req.params.id).then( ligne => {
                res.status(200).json(ligne);
            }).catch(error=>{
                res.status(500).json({
                    message: "Une erreur a été produite !",
                })
            });
        }
    })
});


router.put('/:id/lignetarif',UtilFabAccesControl,(req,res) => {
    ligneTarifService.getLigneTarif(req.params.id,2).then(lignetarif => {
        if ( lignetarif == null ) {
            res.status(404).json({
                message: "Option inexistante"
            });
        } else {
            ligneTarifService.updateLigneTarif(req.body,req.params.id,2).then( resu => {
                if (resu) {
                    ligneTarifService.getLigneTarif(req.params.id,2).then(ligneT=>{
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

router.delete('/:id/lignetarif',UtilFabAccesControl,(req,res) => {
    ligneTarifService.deleteLigneTarif(req.params.id,2).then( lignetarif => {
        res.status(200).json(lignetarif);
    }).catch( error => {
        res.status(500).json({
            message: "Une erreur a éte produite !"
        });
    });
});




module.exports = router;

