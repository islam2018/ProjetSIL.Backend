const express= require('express');
const router= express.Router();
const Modele=require('../../model/modele');



router.get('/:id', (req,res) => {
    Modele.findOne({where:{CodeModele:req.params.id}}).then(modeles=>{
        res.status(200).json({modeles});
    }).catch (error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !",
        })
    });
});


router.put('/:id',(req,res) => {
    Modele.findOne({where:{CodeModele:req.body.CodeModele}}).then(modele => {
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
                    CodeModele: req.body.CodeModele
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
   Modele.destroy({where:{CodeModele:req.params.id}}).then( modele => {
       res.status(200).json(modele);
   }).catch( error => {
       res.status(500).json({
           message: "Une erreur a éte produite !"
       });
   });
});

module.exports = router;
