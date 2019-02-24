const express= require('express');
const router= express.Router();
const Vehicule=require('../model/vehicule');
const Option=require('../model/option');
const RelVehicOpt=require('../model/REL_vehicule_option');

Option.belongsTo(RelVehicOpt,{foreignKey:'CodeOption',targetKey:'CodeOption'});

router.get('/', (req,res) => {
    Vehicule.findAll({}).then(vehicules=>{
        res.status(200).json({vehicules});
    }).catch(e=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});


router.post('/', (req,res) => {
    Vehicule.findOne({where:{NumChassis: req.body.NumChassis}}).then (v=>{
        if (v!=null) {
            res.status(409).json({
                msg:"Ce véhicule existe déja !"
            });
        } else {
            Vehicule.create({
                NumChassis:req.body.NumChassis,
                Concessionaire: req.body.Concessionaire,
                CodeVersion: req.body.CodeVersion,
                CodeCouleur: req.body.CodeCouleur
            }).then (vehicule=>{
                res.status(200).json({vehicule});
            }).catch(err=>{
                res.status(409).json({
                    msg:"Ce véhicule existe déja !"
                });
            });
        }
    }).catch(e=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});



router.get('/:id', (req,res) => {
        Vehicule.findOne({where:{NumChassis:req.params.id}}).then(vehicule=>{
            if (vehicule!=null) {
                res.status(200).json({vehicule});
            } else {
                res.status(404).json({
                    msg: "Ce véhicule n'existe pas !"
                });
            }
        }).catch(e=>{
            res.status(500).json({
                msg:"Une erreur a été produite !"
            });
        });
});

router.put('/:id',(req,res)=>{
    Vehicule.findOne({where:{NumChassis:req.params.id}}).then(vehicule=>{
        if (vehicule!=null) {
            Vehicule.update({
                Concessionaire:req.body.Concessionaire
            },{where:{NumChassis: req.params.id}}).then(v=>{
                res.status(200).json(v); //get the object
            }).catch(error=>{
                res.status(500).json({
                    msg:"Une erreur a été produite !"
                });
            });
        } else {
            res.status(404).json({
                msg:"Véhicule non trouvé !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});

router.delete('/:id', (req,res) => {
    Vehicule.destroy({where:{NumChassis:req.params.id}}).then(result=>{
        if (result) {
            res.status(200).json({
                msg:"Véhicule supprimé !"
            });
        }else {
            res.status(500).json({
                msg:"Une erreur a été produite !"
            });
        }
    });
});

router.get('/:id/options',(req,res)=>{

    Option.findAll({
        include: [{
            model: RelVehicOpt,
            where: {NumChassis : req.params.id}
        }]
    }).then(options=>{
        res.status(200).json(options);
    }).catch(e=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    })
});

router.post('/:id/options',(req,res)=>{

    RelVehicOpt.findOne({where:{CodeOption:req.body.CodeOption,NumChassis:req.params.id}}).then(result=>{
        if (result!=null) {
            res.status(409).json({
                msg:"Cette option est déja ajouté a ce véhicule !"
            });
        }else {
            RelVehicOpt.create({
                CodeOption: req.body.CodeOption,
                NumChassis: req.params.id
            }).then(rel=>{
                res.status(200).json(rel);
            }).catch(e=>{
                res.status(500).json({
                    msg:"Une erreur a été produite !"
                });
            })
        }
    }).catch(err=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });

});

module.exports = router;