const express= require('express');
const router= express.Router();
const OffreService=require('../../../services/OffreService');
const offreService=new OffreService();



router.get('/:id',(req,res)=>{
    offreService.getOffre(req.params.id).then(offre=>{
        if (offre!=null) {
            res.status(200).json(offre);
        } else {
            res.status(404).json({
                message:"Offre non trouvée"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});


router.put('/:id',(req,res)=>{
    offreService.getOffre(req.params.id).then(offre=>{
        if (offre!=null) {
            offre.updateAnnonce(req.body,req.params.id).then(resu=>{
                if (resu) {
                    offreService.getOffre(req.params.id).then(o=>{
                        res.status(200).json(o);
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
                message:"Offre non trouvée !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});

router.delete('/:id', (req,res) => {
    offreService.deleteOffre(req.params.id).then(result=>{
        if (result) {
            res.status(200).json({
                message:"Offre supprimée !"
            });
        }else {
            res.status(500).json({
                messag:"Une erreur a été produite !"
            });
        }
    });
});




module.exports = router;