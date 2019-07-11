const express= require('express');
const router= express.Router();
const CommandeService=require('../../services/CommandeService');
const commandeService=new CommandeService();




router.get('/',(req,res)=>{
    commandeService.getAllCommandes().then(commandes=>{
        res.status(200).json(commandes);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.get('/nonvalidees',(req,res)=>{
    commandeService.getCommandes(0).then(commandes=>{
        res.status(200).json(commandes);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});
router.get('/annulees',(req,res)=>{
    commandeService.getCommandes(1).then(commandes=>{
        res.status(200).json(commandes);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});
router.get('/rejetees',(req,res)=>{
    commandeService.getCommandes(2).then(commandes=>{
        res.status(200).json(commandes);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});
router.get('/validees',(req,res)=>{
    commandeService.getCommandes(3).then(commandes=>{
        res.status(200).json(commandes);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});
router.get('/reservees',(req,res)=>{
    commandeService.getReservedCommandes().then(commandes=>{
        res.status(200).json(commandes);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.post('/',(req,res)=>{
    commandeService.createCommande(req.body).then(commande=>{
        res.status(200).json(commande);
    }).catch(e=>{
        res.status(500).json({
            message:"Une erreur a été produite !" +e
        });
    });
});

router.get('/:id',(req,res)=>{
    commandeService.getCommande(req.params.id).then(commande=>{
        if (commande!=null) {
            res.status(200).json(commande);
        }else {
            res.status(404).json({
                message: "Commande non trouvée !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.put('/:id/valider',(req,res)=>{
    commandeService.getCommande(req.params.id).then(commande=>{
        if (commande!=null) {
            commandeService.confirmCommande(req.params.id).then(r=>{
                res.status(200).json(r);
            }).catch(e=>{
                res.status(500).json({
                    message:"Une erreur a été produite !"
                });
            });

        }else {
            res.status(404).json({
                message: "Commande non trouvée !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});


router.put('/:id/rejeter',(req,res)=>{
    commandeService.getCommande(req.params.id).then(commande=>{
        if (commande!=null) {
            commandeService.rejectCommande(req.params.id).then(r=>{
                res.status(200).json(r);
            }).catch(e=>{
                res.status(500).json({
                    message:"Une erreur a été produite !"
                });
            });

        }else {
            res.status(404).json({
                message: "Commande non trouvée !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});


router.put('/:id/annuler',(req,res)=>{
    commandeService.getCommande(req.params.id).then(commande=>{
        if (commande!=null) {
            commandeService.cancelCommande(req.params.id).then(r=>{
                res.status(200).json(r);
            }).catch(e=>{
                res.status(500).json({
                    message:"Une erreur a été produite !"
                });
            });

        }else {
            res.status(404).json({
                message: "Commande non trouvée !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.delete('/:id', (req,res) => {
    commandeService.deleteCommande(req.params.id).then(result=>{
        if (result) {
            res.status(200).json({
                message:"Commande supprimée !"
            });
        }else {
            res.status(500).json({
                message:"Une erreur a été produite !"
            });
        }
    });
});


module.exports = router;
