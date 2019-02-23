const express= require('express');
const router= express.Router();
const Offre = require('../../../model/Offre');



router.get('/:id',(req,res)=>{
    Offre.findOne({where:{idOffre: req.params.id}}).then(offre=>{
        if (offre!=null) {
            res.status(200).json(offre);
        } else {
            res.status(404).json({
                msg:"Offre non trouvée"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});


router.put('/:id',(req,res)=>{
    Offre.findOne({where:{idOffre:req.params.id}}).then(offre=>{
        if (offre!=null) {
            Offre.update({
                Montant:req.body.Montant
            },{where:{idOffre: req.params.id}}).then(o=>{
                res.status(200).json(o); //get the object
            }).catch(error=>{
                res.status(500).json({
                    msg:"Une erreur a été produite !"
                });
            });
        } else {
            res.status(404).json({
                msg:"Offre non trouvée !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});

router.delete('/:id', (req,res) => {
    Offre.destroy({where:{idOffre:req.params.id}}).then(result=>{
        if (result) {
            res.status(200).json({
                msg:"Offre supprimée !"
            });
        }else {
            res.status(500).json({
                msg:"Une erreur a été produite !"
            });
        }
    });
});




module.exports = router;
