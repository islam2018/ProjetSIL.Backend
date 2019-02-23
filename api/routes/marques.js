const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const UtilFab = require('../model/utilfab');
const Modele=require('../model/modele');
const Marque=require('../model/marque');


router.get('/',(req,res)=>{
    Marque.findAll().then(marques=>{
        res.status(200).json({marques});
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});

router.post('/',(req,res)=>{
    Marque.findOne({where: {NomMarque:req.body.NomMarque}}).then(m=>{
        if (m!=null) {
            res.status(409).json({
                msg:"Cette marque existe deja !"
            });
        } else {
            Marque.create({
                NomMarque:req.body.NomMarque
            }).then(marque=>{
                res.status(200).json({marque});
            }).catch(error=>{
                res.status(500).json({
                    msg:"Une erreur a été produite !"
                });
            });

        }
    }).catch (e=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});

router.get('/:id',(req,res)=>{
    Marque.findOne({where:{CodeMarque:req.params.id}}).then(marque=>{
        res.status(200).json({marque});
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});

router.put('/:id',(req,res)=>{
    Marque.findOne({where:{CodeMarque:req.params.id}}).then(marque=>{
        if (marque!=null) {
            Marque.update({
                NomMarque:req.body.NomMarque
            },{where:{CodeMarque: req.params.id}}).then(m=>{
                res.status(200).json(m); //get the object
            }).catch(error=>{
                res.status(500).json({
                    msg:"Une erreur a été produite !"
                });
            });
        } else {
            res.status(404).json({
                msg:"Marque non trouvée !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});

router.delete('/:id', (req,res) => {
    Marque.destroy({where:{CodeMarque:req.params.id}}).then(result=>{
        if (result) {
            res.status(200).json({
                msg:"Marque supprimée !"
            });
        }else {
            res.status(500).json({
                msg:"Une erreur a été produite !"
            });
        }
    });
});

router.get('/:id/modeles',(req,res) => {
    Modele.findAll({where:{CodeMarque:req.params.id}}).then(modeles=>{
        res.status(200).json({modeles});
    }).catch (error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !",
        })
    });
});

router.post('/:id/modeles',(req,res) => {
    Modele.findOne( {where:{NomModele:req.body.NomModele}}).then( modele => {
        if ( modele != null ) {
            res.status(409).json({
                message: "Modèle existant"
            });
        } else {
            Modele.create({
                CodeMarque: req.params.id,
                NomModele: req.body.NomModele
            }).then(modele => {
                res.status(200).json(modele);
            }).catch(error => {
                res.status(500).json({
                    message: "Une erreur a été produite !"
                });
            })
        }
    });
});

router.get('/:id/utilfab', (req,res) => {
    UtilFab.findAll({where:{Fabricant:req.params.id}}).then(users=>{
        res.status(200).json({users});
    }).catch (error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});

router.post('/:id/utilfab', (req,res) => {
    bcrypt.hash(req.body.Mdp,10,(err,hash)=>{
        if (err) {
            res.status(500).json({
                msg:"Une erreur a été produite !"
            })
        } else {

            UtilFab.findOne({where:{Mail:req.body.Mail}}).then(utilfabr=>{

                if (utilfabr!=null) {
                    res.status(409).json({
                        msg:"Adresse mail existante !"
                    });
                } else {
                    UtilFab.create({
                        Mail:req.body.Mail,
                        Nom:req.body.Nom,
                        Prenom:req.body.Prenom,
                        Mdp:hash,
                        NumTel:req.body.NumTel,
                        Fabricant: req.params.id
                    }).then(utilfab=>{
                        res.status(200).json(utilfab);
                    }).catch(e=>{
                        res.status(500).json({
                            msg:"Une erreur a été produite !"
                        });
                    });
                }
            });
        }
    });
});



module.exports = router;
