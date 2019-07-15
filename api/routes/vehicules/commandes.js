const express= require('express');
const router= express.Router();
const pusher = require('../../config/secret').PUSHER;
const CommandeService=require('../../services/CommandeService');
const commandeService=new CommandeService();




router.get('/',(req,res)=>{
    commandeService.getAllCommandes(req.query.fabricant).then(commandes=>{
        res.status(200).json(commandes);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"+error
        });
    });
});
router.get('/automob/:id',(req,res)=>{
    commandeService.getCommandesAutomobiliste(req.params.id).then(commandes=>{
        res.status(200).json(commandes);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"+error
        });
    });
});

router.get('/nonvalidees',(req,res)=>{
    commandeService.getCommandes(0,req.query.fabricant).then(commandes=>{
        res.status(200).json(commandes);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});
router.get('/annulees',(req,res)=>{
    commandeService.getCommandes(1,req.query.fabricant).then(commandes=>{
        res.status(200).json(commandes);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});
router.get('/rejetees',(req,res)=>{
    commandeService.getCommandes(2,req.query.fabricant).then(commandes=>{
        res.status(200).json(commandes);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});
router.get('/validees',(req,res)=>{
    commandeService.getCommandes(3,req.query.fabricant).then(commandes=>{
        res.status(200).json(commandes);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});
router.get('/reservees',(req,res)=>{
    commandeService.getReservedCommandes(req.query.fabricant).then(commandes=>{
        res.status(200).json(commandes);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.post('/',(req,res)=>{
    commandeService.createCommande(req.body).then(commande=>{
        commandeService.getCommande(commande.toJSON().idCommande).then(cmd=>{
            pusher.trigger('commande-channel-'+cmd.Fabricant,'newCommand',cmd);
            res.status(200).json(cmd);
        }).catch(e=> {
            res.status(500).json({
                message: "Une erreur a été produite !"
            });
        });
    }).catch(e=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
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
