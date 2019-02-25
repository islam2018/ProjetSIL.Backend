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

router.post('/',(req,res)=>{
    commandeService.createCommande(req.body).then(commande=>{
        res.status(200).json(commande);
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
