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
            offreService.updateOffre(req.body,req.params.id).then(resu=>{
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
const beamsClient = require('../../../config/secret').BEAMS;
router.put('/:id/accepter',(req,res)=>{
    offreService.getOffre(req.params.id).then(offre=>{
        if (offre!=null) {
            offreService.changeState(req.params.id,1).then(resu=>{
                if (resu) {
                    offreService.getOffreDetails(req.params.id).then(o=>{
                        console.log(o.annonce.automobiliste);
                        let body = o.annonce.automobiliste.Nom + ' '+o.annonce.automobiliste.Prenom+
                            ' a accepté votre offre sur la '+o.vehicule.NomModele+' '+o.vehicule.NomVersion+".";
                        beamsClient.publishToUsers([o.automobiliste.idAutomobiliste], {
                            fcm: {
                                notification: {
                                    title: 'Offre acceptée !',
                                    body: body,
                                    click_action: 'OpenOffers'
                                }
                            }
                        }).then((publishResponse) => {
                            console.log('Just published:', publishResponse.publishId);
                        }).catch((error) => {
                            console.log('Error:', error);
                        });
                        offreService.getOffre(req.params.id).then(obj=>{
                            res.status(200).json(obj);
                        }).catch(err=>{
                            res.status(500).json({
                                message:"Une erreur a été produite !"+err
                            });
                        });
                    }).catch(err=>{
                        res.status(500).json({
                            message:"Une erreur a été produite !"+err
                        });
                    });
                }else {
                    res.status(500).json({
                        message:"Une erreur a été produite !"
                    });
                }
            }).catch(error=>{
                res.status(500).json({
                    message:"Une erreur a été produite !"+error
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

router.put('/:id/annuler',(req,res)=>{
    offreService.getOffre(req.params.id).then(offre=>{
        if (offre!=null) {
            offreService.changeState(req.params.id,2).then(resu=>{
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

router.put('/:id/refuser',(req,res)=>{
    offreService.getOffre(req.params.id).then(offre=>{
        if (offre!=null) {
            offreService.changeState(req.params.id,3).then(resu=>{
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
