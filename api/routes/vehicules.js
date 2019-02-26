const express= require('express');
const router= express.Router();
const UtilFabAccesControl= require('../control/AccessControl').UtilFabAccessControl;
const AutoMobAccesControl= require('../control/AccessControl').AutomobAccessControl;
const VehiculeService=require('../services/VehiculeService');
const OptionService=require('../services/OptionService');
const vehiculeService=new VehiculeService();
const optionService=new OptionService();


router.get('/', (req,res) => {
    vehiculeService.getAllVehicules().then(vehicules=>{
        res.status(200).json({vehicules});
    }).catch(e=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});


router.post('/', (req,res) => {
    vehiculeService.getVehicule(req.body.NumChassis).then (v=>{
        if (v!=null) {
            res.status(409).json({
                message:"Ce véhicule existe déja !"
            });
        } else {
            vehiculeService.createVehicule(req.body).then (vehicule=>{
                res.status(200).json(vehicule);
            }).catch(err=>{
                res.status(500).json({
                    message:"Une erreur a été produite !"
                });
            });
        }
    }).catch(e=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});



router.get('/:id', (req,res) => {
        vehiculeService.getVehicule(req.params.id).then(vehicule=>{
            if (vehicule!=null) {
                res.status(200).json({vehicule});
            } else {
                res.status(404).json({
                    message: "Ce véhicule n'existe pas !"
                });
            }
        }).catch(e=>{
            res.status(500).json({
                message:"Une erreur a été produite !"
            });
        });
});

router.put('/:id',(req,res)=>{
    vehiculeService.getVehicule(req.params.id).then(vehicule=>{
        if (vehicule!=null) {
            vehiculeService.updateVehicule(req.body,req.params.id).then(v=>{
                res.status(200).json(v); //get the object
            }).catch(error=>{
                res.status(500).json({
                    message:"Une erreur a été produite !"
                });
            });
        } else {
            res.status(404).json({
                message:"Véhicule non trouvé !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.delete('/:id', (req,res) => {
    vehiculeService.deleteVehicule(req.params.id).then(result=>{
        if (result) {
            res.status(200).json({
                message:"Véhicule supprimé !"
            });
        }else {
            res.status(500).json({
                message:"Une erreur a été produite !"
            });
        }
    });
});

router.get('/:id/options',(req,res)=>{

    optionService.getAllOptionsOfVehicules(req.params.id).then(options=>{
        res.status(200).json(options);
    }).catch(e=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    })
});

router.post('/:id/options',(req,res)=>{

   vehiculeService.findOption(req.body.CodeOption,req.params.id).then(result=>{
        if (result!=null) {
            res.status(409).json({
                message:"Cette option est déja ajouté a ce véhicule !"
            });
        }else {
            vehiculeService.addOption(req.body.CodeOption,req.params.id).then(rel=>{
                res.status(200).json(rel);
            }).catch(e=>{
                res.status(500).json({
                    message:"Une erreur a été produite !"
                });
            })
        }
    }).catch(err=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });

});

module.exports = router;