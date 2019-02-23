const express= require('express');
const router= express.Router();
const Annonce = require('../../model/annonce');
const Offre = require('../../model/offre');


router.get('/',(req,res)=>{
    Annonce.findAll().then(annonces=>{
        res.status(200).json(annonces);
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});

router.post('/',(req,res)=>{
    Annonce.create({
        CheminPhoto:req.body.CheminPhoto,
        Prix:req.body.Prix,
        idAutomobiliste:req.body.idAutomobiliste,
        CodeVersion: req.body.CodeVersion
    }).then(marque=>{
        res.status(200).json({marque});
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});

router.get('/:id',(req,res)=>{
    Annonce.findOne({where:{idAnnonce: req.params.id}}).then(annonce=>{
        if (annonce!=null) {
            res.status(200).json(annonce);
        } else {
            res.status(404).json({
                msg:"Annoce non trouvée"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});


router.put('/:id',(req,res)=>{
    Annonce.findOne({where:{idAnnonce:req.params.id}}).then(annonce=>{
        if (annonce!=null) {
            Annonce.update({
                CheminPhoto:req.body.CheminPhoto,
                Prix:req.body.Prix
            },{where:{idAnnonce: req.params.id}}).then(a=>{
                res.status(200).json(a); //get the object
            }).catch(error=>{
                res.status(500).json({
                    msg:"Une erreur a été produite !"
                });
            });
        } else {
            res.status(404).json({
                msg:"Annonce non trouvée !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});

router.delete('/:id', (req,res) => {
    Annonce.destroy({where:{idAnnonce:req.params.id}}).then(result=>{
        if (result) {
            res.status(200).json({
                msg:"Annonce supprimée !"
            });
        }else {
            res.status(500).json({
                msg:"Une erreur a été produite !"
            });
        }
    });
});



router.get('/:id/offres',(req,res)=>{
    Offre.findAll({where:{idAnnonce:req.params.id}}).then(offres=>{
        res.status(200).json(offres);
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});

router.post('/:id/offres',(req,res)=>{
    Offre.create({
        idAnnonce:req.params.id,
        Montant:req.body.Montant,
        idAutomobiliste:req.body.idAutomobiliste
    }).then(offre=>{
        res.status(200).json(offre);
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});


module.exports = router;
