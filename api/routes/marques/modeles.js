const express= require('express');
const router= express.Router();
const Modele=require('../../model/modele');
const Version=require('../../model/version');


router.get('/:id',(req,res)=>{
    Modele.findOne({where:{CodeModele:req.params.id}}).then(modele=>{
        res.status(200).json({modele});
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});

router.put('/:id',(req,res)=>{
    Modele.findOne({where:{CodeModele:req.params.id}}).then(modele=>{
        if (modele!=null) {
            Modele.update({
                NomModele:req.body.NomModele
            },{where:{CodeModele: req.params.id}}).then(m=>{
                res.status(200).json(m); //get the object
            }).catch(error=>{
                res.status(500).json({
                    msg:"Une erreur a été produite !"
                });
            });
        } else {
            res.status(404).json({
                msg:"Modele non trouvée !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});


router.delete('/:id', (req,res) => {
    Modele.destroy({where:{CodeModele:req.params.id}}).then(result=>{
        if (result) {
            res.status(200).json({
                msg:"Modele supprimé !"
            });
        }else {
            res.status(500).json({
                msg:"Une erreur a été produite !"
            });
        }
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
    Version.findOne( {where:{NomVersion:req.body.NomVersion}}).then( version => {
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
