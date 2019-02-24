const express= require('express');
const router= express.Router();
const Commande= require('../../model/commande');



router.get('/',(req,res)=>{
    Commande.findAll().then(commandes=>{
        res.status(200).json(commandes);
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});

router.post('/',(req,res)=>{
    Commande.create({
        Date:req.body.Date,
        Montant:req.body.Montant,
        idAutomobiliste:req.body.idAutomobiliste,
        NumChassis:req.body.NumChassis
    }).then(commande=>{
        res.status(200).json(commande);
    }).catch(e=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});

router.get('/:id',(req,res)=>{
    Commande.findOne({where:{idCommande: req.params.id}}).then(commande=>{
        if (commande!=null) {
            res.status(200).json(commande);
        }else {
            res.status(404).json({
                message: "Commande non trouvée !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});


router.delete('/:id', (req,res) => {
    Commande.destroy({where:{idCommande:req.params.id}}).then(result=>{
        if (result) {
            res.status(200).json({
                msg:"Commande supprimée !"
            });
        }else {
            res.status(500).json({
                msg:"Une erreur a été produite !"
            });
        }
    });
});


module.exports = router;
