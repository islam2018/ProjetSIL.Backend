const express= require('express');
const router= express.Router();
const Modele=require('../../model/modele');
const Version=require('../../model/version');



router.get('/:id', (req,res) => {
    Modele.findOne({
        where: {
            CodeModele: req.params.id
        }
    }).then(modeles=>{
        res.status(200).json({modeles});
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !",
        })
    });
});


router.put('/:id',(req,res) => {
    Modele.findOne({
        where: {
            CodeModele: req.body.CodeModele
        }
    }).then(modele => {
        if ( modele == null ) {
            res.status(409).json({
                message: "Modèle inexistant"
            });
        } else {
            Modele.update({
                CodeMarque: req.body.CodeMarque,
                NomModele: req.body.NomModele
            }, {
                where: {
                    CodeModele: req.params.id
                }
            }).then( modele => {
                res.status(200).json(modele);
            }).catch( error => {
                res.status(500).json({
                    message: "Une erreur a éte produite !"
                });
            });
        }
    });
});

router.delete('/:id',(req,res) => {
   Modele.destroy({
       where: {
           CodeModele: req.params.id
       }
   }).then( modele => {
       res.status(200).json(modele);
   }).catch( error => {
       res.status(500).json({
           message: "Une erreur a éte produite !"
       });
   });
});

router.get('/:id/versions', (req,res) => {
    Version.findAll({
        where: {
            CodeModele: req.params.id
        }
    }).then(versions=>{
        res.status(200).json({versions});
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !",
        })
    });
});

router.post('/:id/versions', (req,res) => {
    Version.findOne( {where:{NomModele:req.body.NomModele}}).then( version => {
        if ( version != null ) {
            res.status(409).json({
                message: "Version existante"
            });
        } else {
            Version.create({
                CodeModele: req.params.id,
                NomVersion: req.body.NomVersion
            }).then(version => {
                res.status(200).json(version);
            }).catch(error => {
                res.status(500).json({
                    message: "Une erreur a été produite !"
                });
            })
        }
    });
});

module.exports = router;
