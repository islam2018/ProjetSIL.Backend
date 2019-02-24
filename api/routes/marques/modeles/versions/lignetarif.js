const express= require('express');
const router= express.Router();
const Lignetarif = require('../../../../model/lignetarif');



router.get('/:id', (req,res) => {
    Lignetarif.findOne({
        where: {
            idLigneTarif: req.params.id
        }
    }).then(lignetarif => {
        res.status(200).json(lignetarif);
    }).catch (error => {
        res.status(500).json({
            message: "Une erreur a été produite !",
        })
    });
});

router.put('/:id', (req,res) => {
    Lignetarif.findOne({
        where: {
            idLigneTarif: req.params.id,
        }
    }).then(lignetarif => {
        if ( lignetarif == null ) {
            res.status(409).json({
                message: "lignetarif inexistante"
            });
        } else {
            Lignetarif.update({
                Code: req.body.Code,
                Type: req.body.Type,
                DateDebut: req.body.DateDebut,
                DateFin: req.body.DateFin,
                Prix: req.body.Prix
            }, {
                where: {
                    idLigneTarif: req.params.id
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

router.delete('/:id', (req,res) => {
    Lignetarif.destroy({
        where: {
            idLigneTarif: req.params.id
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
