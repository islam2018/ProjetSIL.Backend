const express = require('express');
const router = express.Router();
const Version = require('../../../model/version');
const Option = require('../../../model/option');
const Rel_ver_opt = require('../../../model/rel_ver_opt');
const Couleur = require('../../../model/couleur');
const Rel_ver_coul = require('../../../model/rel_ver_coul');


Option.belongsTo(Rel_ver_opt,{foreignKey: 'CodeOption', targetKey: 'CodeOption'});
Couleur.belongsTo(Rel_ver_coul,{foreignKey: 'CodeCouleur', targetKey: 'CodeCouleur'});


router.get('/:id', (req,res) => {

    Version.findOne({
        where: {
            CodeVersion: req.params.id
        }
    }).then(version=>{
        res.status(200).json({version});
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !",
        })
    });
});

router.put('/:id', (req,res) => {
    Version.findOne({
        where: {
            CodeVersion: req.params.id
        }
    }).then(version => {
        if ( version == null ) {
            res.status(409).json({
                message: "Version inexistante"
            });
        } else {
            Version.update({
                CodeModele: req.body.CodeModele,
                NomVersion: req.body.NomVersion
            }, {
                where: {
                    CodeVersion: req.params.id
                }
            }).then( version => {
                res.status(200).json(version);
            }).catch( error => {
                res.status(500).json({
                    message: "Une erreur a éte produite !"
                });
            });
        }
    });
});

router.delete('/:id', (req,res) => {
    Version.destroy({
        where: {
            CodeVersion: req.params.id
        }
    }).then( version => {
        res.status(200).json({
            msg:"Version supprimée !"
        });
    }).catch( error => {
        res.status(500).json({
            message: "Une erreur a éte produite !"
        });
    });
});

router.get('/:id/options', (req,res) => {
    Option.findAll({
        include: [{
            model: Rel_ver_opt,
            where: {CodeVersion : req.params.id}
        }]
    }).then(options => {
        res.status(200).json({options});
    }).catch( error => {
        res.status(500).json({
            message:"Une erreur a été produite !"
        })
    });

});

router.post('/:id/options', (req,res) => {
    Rel_ver_opt.findOne( {
        where: {
            CodeOption: req.body.CodeOption,
            CodeVersion: req.params.id
        }
    }).then( option => {
        if ( option != null ) {
            res.status(409).json({
                message: "Option existante pour ce modele"
            });
        } else {
            Rel_ver_opt.create({
                CodeVersion: req.params.id,
                CodeOption: req.body.CodeOption
            }).then(option => {
                res.status(200).json(option);
            }).catch(error => {
                res.status(500).json({
                    message: "Une erreur a été produite !"
                });
            })
        }
    });

});

router.get('/:id/couleurs',(req,res)=>{
    Couleur.findAll({
        include: [{
            model: Rel_ver_coul,
            where: {CodeVersion : req.params.id}
        }]
    }).then(options => {
        res.status(200).json({options});
    }).catch( error => {
        res.status(500).json({
            message:"Une erreur a été produite !"
        })
    });
});

router.post('/:id/couleurs',(req,res)=>{
    Rel_ver_coul.findOne( {
        where: {
            CodeCouleur: req.body.CodeCouleur,
            CodeVersion: req.params.id
        }
    }).then( couleur => {
        if ( couleur != null ) {
            res.status(409).json({
                message: "Option existante pour ce modele"
            });
        } else {
            Rel_ver_coul.create({
                CodeVersion: req.params.id,
                CodeCouleur: req.body.CodeCouleur
            }).then( couleur => {
                res.status(200).json(couleur);
            }).catch(error => {
                res.status(500).json({
                    message: "Une erreur a été produite !"
                });
            })
        }
    });
});





module.exports = router;
