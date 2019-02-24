const express= require('express');
const router= express.Router();

const Couleur = require('../../../../model/couleur');
const Lignetarif = require('../../../../model/lignetarif');


router.get('/:id', (req,res) => {
    Couleur.findOne({
        where: {
            CodeCouleur: req.params.id
        }
    }).then(couleur => {
        res.status(200).json({couleur});
    }).catch (error => {
        res.status(500).json({
            message: "Une erreur a été produite !",
        })
    });
});

router.put('/:id', (req,res) => {
    Couleur.findOne({
        where: {
            CodeCouleur: req.params.id
        }
    }).then(couleur => {
        if ( couleur == null ) {
            res.status(409).json({
                message: "Couleur inexistante"
            });
        } else {
            Couleur.update({
                NomCouleur: req.body.NomCouleur,
            }, {
                where: {
                    CodeCouleur: req.params.id
                }
            }).then( couleur => {
                res.status(200).json(couleur);
            }).catch( error => {
                res.status(500).json({
                    message: "Une erreur a éte produite !"
                });
            });
        }
    });
});

router.delete('/:id', (req,res) => {
    Couleur.destroy({
        where: {
            CodeCouleur: req.params.id
        }
    }).then( couleur => {
        res.status(200).json({
            msg:"Couleur supprimée !"
        });
    }).catch( error => {
        res.status(500).json({
            message: "Une erreur a éte produite !"
        });
    });
});

router.get('/:id/lignetarif', (req,res) => {
    Lignetarif.findOne({
        where: {
            Code: req.params.id,
            Type: 1
        }
    }).then(lignetarif=>{
        res.status(200).json({lignetarif});
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !",
        })
    });
});

router.put('/:id/lignetarif', (req,res) => {
    Lignetarif.findOne({
        where: {
            Code: req.params.id,
            Type: 1
        }
    }).then(lignetarif => {
        if ( lignetarif == null ) {
            res.status(409).json({
                message: "Couleur inexistante"
            });
        } else {
            Lignetarif.update({
                DateDebut: req.body.DateDebut,
                DateFin: req.body.DateFin,
                Prix: req.body.Prix
            }, {
                where: {
                    Type: 1,
                    Code: req.params.id
                }
            }).then( lignetarif => {
                res.status(200).json(lignetarif);
            }).catch( error => {
                res.status(500).json({
                    message: "Une erreur a éte produite !"
                });
            });
        }
    });
});

router.delete('/:id/lignetarif', (req,res) => {
    Lignetarif.destroy({
        where: {
            Type: 1,
            Code: req.params.id,
        }
    }).then( lignetarif => {
        res.status(200).json(lignetarif);
    }).catch( error => {
        res.status(500).json({
            message: "Une erreur a éte produite !"
        });
    });
});


module.exports = router;
