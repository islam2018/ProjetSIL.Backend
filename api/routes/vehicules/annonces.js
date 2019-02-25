const express= require('express');
const router= express.Router();
const AnnonceService=require('../../services/AnnonceService');
const OffreService=require('../../services/OffreService');
const annonceService=new AnnonceService();
const offreService=new OffreService();


router.get('/',(req,res)=>{
    annonceService.getAllAnnonces().then(annonces=>{
        res.status(200).json(annonces);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.post('/',(req,res)=>{
    annonceService.createAnnonce(req.body).then(marque=>{
        res.status(200).json({marque});
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.get('/:id',(req,res)=>{
   annonceService.getAnnonce(req.params.id).then(annonce=>{
        if (annonce!=null) {
            res.status(200).json(annonce);
        } else {
            res.status(404).json({
                message:"Annonce non trouvée !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});


router.put('/:id',(req,res)=>{
    annonceService.getAnnonce(req.params.id).then(annonce=>{
        if (annonce!=null) {
            annonceService.updateAnnonce(req.body,req.params.id).then(resu=>{
                if (resu) {
                    annonceService.getAnnonce(req.params.id).then(an=>{
                        res.status(200).json(an);
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
                    msg:"Une erreur a été produite !"
                });
            });
        } else {
            res.status(404).json({
                message:"Annonce non trouvée !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.delete('/:id', (req,res) => {
    annonceService.deleteAnnonce(req.params.id).then(result=>{
        if (result) {
            res.status(200).json({
                message:"Annonce supprimée !"
            });
        }else {
            res.status(500).json({
                message:"Une erreur a été produite !"
            });
        }
    });
});



router.get('/:id/offres',(req,res)=>{
    offreService.getAllOffres(req.params.id).then(offres=>{
        res.status(200).json(offres);
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});

router.post('/:id/offres',(req,res)=>{
    offreService.createOffre(req.body,req.params.id).then(offre=>{
        res.status(200).json(offre);
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});


module.exports = router;
