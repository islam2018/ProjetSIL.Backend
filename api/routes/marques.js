const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const Modele=require('../model/modele');


router.get('/:id/modeles',(req,res) => {
    Modele.findAll({
        where: {
            CodeMarque: req.params.id
        }
    }).then(modeles=>{
        res.status(200).json({modeles});
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !",
        })
    });
});

router.post('/:id/modeles',(req,res) => {
    Modele.findOne( {
        where: {
            NomModele: req.body.NomModele
        }
    }).then( modele => {
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
    UtilFab.findAll({
        where: {
            Fabricant: req.params.id
        }
    }).then(users=>{
        res.status(200).json({users});
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !"
        })
    });
});

router.post('/:id/utilfab', (req,res) => {
    bcrypt.hash(req.body.Mdp,null,null,function(err,hash){
       if (err) {
            res.status(500).json({
                message: "Une erreur a été produite !"
            })
       } else {

           UtilFab.findOne({
               where: {
                   Mail:req.body.Mail
               }
           }).then(utilfabr => {

              if (utilfabr != null) {
                  res.status(409).json({
                      message: "Adresse mail existante !"
                  });
              } else {
                  UtilFab.create({
                      Mail: req.body.Mail,
                      Nom: req.body.Nom,
                      Prenom: req.body.Prenom,
                      Mdp: hash,
                      NumTel: req.body.NumTel,
                      Fabricant: req.params.id
                  }).then( utilfab => {
                      res.status(200).json(utilfab);
                  }).catch(e=>{
                      res.status(500).json({
                          message: "Une erreur a été produite !"
                      });
                  });
              }
           });
       }
    });
});



module.exports = router;
