const express= require('express');
const router= express.Router();
const Option = require('../../../../model/option');
const Lignetarif = require('../../../../model/lignetarif');



router.get('/:id', (req,res) => {
    Option.findOne({
        where: {
            CodeOption: req.params.id
        }
    }).then(option=>{
        res.status(200).json({option});
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !",
        })
    });
});


router.put('/:id',(req,res) => {
    Option.findOne({
        where: {
            CodeOption: req.params.id
        }
    }).then(option => {
        if ( option == null ) {
            res.status(409).json({
                message: "Option inexistante"
            });
        } else {
            Option.update({
                NomOption: req.body.NomOption
            }, {
                where: {
                    CodeOption: req.params.id
                }
            }).then( option => {
                res.status(200).json(option);
            }).catch( error => {
                res.status(500).json({
                    message: "Une erreur a éte produite !"
                });
            });
        }
    });
});

router.delete('/:id',(req,res) => {
    Option.destroy({
        where: {
            CodeOption: req.params.id
        }
    }).then( option => {
        res.status(200).json(option);
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
            Type: 2
        }
    }).then(lignetarif=>{
        res.status(200).json({lignetarif});
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !",
        })
    });
});


router.put('/:id/lignetarif',(req,res) => {
    Lignetarif.findOne({
        where: {
            CodeOption: req.params.id
        }
    }).then(lignetarif => {
        if ( lignetarif == null ) {
            res.status(409).json({
                message: "Option inexistante"
            });
        } else {
            Lignetarif.update({
                DateDebut: req.body.DateDebut,
                DateFin: req.body.DateFin,
                Prix: req.body.Prix
            }, {
                where: {
                    Type: 2,
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

router.delete('/:id/lignetarif',(req,res) => {
    Lignetarif.destroy({
        where: {
            Type: 2,
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

