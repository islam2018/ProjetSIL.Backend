const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const UtilFab = require('../../model/utilfab');






router.get('/:id', (req,res) => {
    UtilFab.findOne({where:{IdUserF:req.params.id}}).then(user=>{
        res.status(200).json({user});
    }).catch (error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        })
    });
});

router.put('/:id', (req,res) => {
    UtilFab.findOne({ where: { IdUserF: req.params.id } }).then(utilfab=>{
        if (utilfab!=null) {
            UtilFab.update({
                Mail:req.body.Mail,
                Nom:req.body.Nom,
                Prenom:req.body.Prenom,
                NumTel:req.body.NumTel
            },{where:{IdUserF: req.params.id}}).then(utilfabr=>{
                res.status(200).json(utilfabr); //get the object utilfab:id // connect
            }).catch(error=>{
                res.status(500).json({
                    msg:"Une erreur a été produite !"
                });
            });
        }
    }).catch(err=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});

router.put('/:id/mdp', (req,res) => {
    UtilFab.findOne({ where: { IdUserF: req.params.id } }).then(utilfab=>{
        if (utilfab!=null) {
            bcrypt.hash(req.body.Mdp,10,(err,hash)=>{
                if (err) {
                    res.status(500).json({
                        msg:"Une erreur a été produite !"
                    })
                } else {
                    UtilFab.update({
                        Mdp: hash,
                    }, {where: {IdUserF: req.params.id}}).then(utilfabr => {
                        res.status(200).json(utilfabr); //get the object utilfab:id // connect
                    }).catch(error => {
                        res.status(500).json({
                            msg: "Une erreur a été produite !"
                        });
                    });
                }
            });
        }
    }).catch(err=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});

router.delete('/:id', (req,res) => {
    UtilFab.destroy({where:{IdUserF:req.params.id}}).then(result=>{
        if (result) {
            res.status(200).json({
                msg:"Utilisateur supprimé !"
            });
        }else {
            res.status(500).json({
                msg:"Une erreur a été produite !"
            });
        }
    });
});


module.exports = router;
