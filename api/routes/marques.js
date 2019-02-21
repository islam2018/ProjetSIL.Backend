const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const UtilFab = require('../model/utilfab');


router.get('/:id/utilfab', (req,res) => {
    UtilFab.findAll({where:{Fabricant:req.params.id}}).then(users=>{
        res.status(200).json({users});
    }).catch (error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        })
    });
});

router.post('/:id/utilfab', (req,res) => {
    bcrypt.hash(req.body.Mdp,null,null,function(err,hash){
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

router.get('/utilfab/:id', (req,res) => {
    UtilFab.findOne({where:{IdUserF:req.params.id}}).then(user=>{
        res.status(200).json({user});
    }).catch (error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        })
    });
});

router.put('/utilfab/:id', (req,res) => {

});
router.delete('/utilfab/:id', (req,res) => {

});


module.exports = router;
