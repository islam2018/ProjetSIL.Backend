const express = require('express');
const router = express.Router();
const VehiculeService = require('../../services/VehiculeService');
const vehiculeService = new VehiculeService();
const LigneTarifService = require('../../services/LigneTarifService');
const ligneTarifService = new LigneTarifService();
const InfService = require('../../services/InformationService');
const informationService = new InfService();
const UtilFabAccessControl= require('../../control/AccessControl').UtilFabAccessControl;
const csv = require('csvtojson');
const request = require('request');

const multer = require('multer');
const CD_CREDENTAILS=require('../../config/secret').CLOUDINARY_CREDENTIALS;
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: CD_CREDENTAILS.CNAME,
    api_key: CD_CREDENTAILS.API_KEY,
    api_secret: CD_CREDENTAILS.API_SECRET
});
const cloudinaryStorage=require('multer-storage-cloudinary');

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'STOCK',
        resource_type: 'raw',
        use_original_filename: true,
        unique_filename: true,
    },
});
//https://stackoverflow.com/questions/40774697/how-to-group-an-array-of-objects-by-key/40774906
const upload=multer({storage:storage});

router.post('/',upload.single('stockFile'), (req, res) => {
    console.log(req.file.url);
    csv({
        delimiter: [";", ","],
        ignoreEmpty: true,
        alwaysSplitAtEOL: true
    }).fromStream(request.get(req.file.url)).then(json => {
        console.log(json);
        json.forEach(vehicule=>{
            let options = vehicule.Options.split(",");
            //console.log(options);
            let obj = [];
            options.forEach(code=>{
                obj.push({
                    CodeOption:code
                });
            });
            vehicule.Options = obj;
        });
        let promises=[];
        let promises_options=[];
        json.forEach(vehicule=>{
            promises.push(vehiculeService.createVehicule(vehicule));
        });

        Promise.all(promises).then(success=>{
            json.forEach(vehicule=>{
                vehicule.Options.forEach(option=>{
                   promises_options.push(vehiculeService.addOption(option.CodeOption,vehicule.NumChassis));
                });
            });
            Promise.all(promises_options).then(r=>{
                vehiculeService.getAllVehicules().then(r=>{
                    informationService.updateStockInfo(req.query.fabricant);
                    res.status(200).json(r);
                }).catch(e2=>{
                    res.status(500).json({message:'Une erreur a été produite'});
                });
            }).catch(e1=>{
                res.status(500).json({message:'Une erreur a été produite dans l\'affectation des options'+e1});
            });
        }).catch(e=>{
            res.status(500).json({message:'Une erreur a été produite dans la création des vehicules'});
        });


    }).catch(error=>{
        res.status(500).json(error);
    });


});

router.post('/lignetarif',upload.single('ligneTarifFile'), (req, res) => {
    console.log(req.file.url);
    csv({
        delimiter: [";", ","],
        ignoreEmpty: true,
        alwaysSplitAtEOL: true
    }).fromStream(request.get(req.file.url)).then(json => {
        let promises=[];
        json.forEach(ligneTarif=>{
            switch(ligneTarif) {
                case "VERSION": {
                    ligneTarif.Type = 0;
                }break;
                case "COULEUR": {
                    ligneTarif.Type = 1;
                }break;
                case "OPTION": {
                    ligneTarif.Type = 2;
                }break;
            }
            promises.push(ligneTarifService.createLigneTarif(ligneTarif,ligneTarif.Type,ligneTarif.Code));
        });
        Promise.all(promises).then(data=>{
            informationService.updateTarifInfo(req.query.fabricant);
            res.status(200).json(data);
        }).catch(error=>{
            res.status(500).json({
                message:'Une erreur s\'est produite'
            });
        });
    }).catch(error=>{
       res.status(500).json({
           message:'Une erreur s\'est produite'
       });
    });
});


router.post('/disponible',(req,res)=>{

        vehiculeService.getVehiculesDisponible(req.body).then(data=>{
            res.status(200).json(data);
        }).catch(e=>{
            res.status(500).json({
                message:'Une erreur s\'est produite'+e
            });
        });
});
router.get('/:CodeVersion',(req,res)=>{

    vehiculeService.getVehicules(req.params.CodeVersion).then(data=>{
        res.status(200).json(data);
    }).catch(e=>{
        res.status(500).json({
            message:'Une erreur s\'est produite'+e
        });
    });
});
/*
router.get('/disponible/:codeVersion/:codeCouleur',(req,res)=>{
    versionService.getVersion(req.params.codeVersion).then(version=>{
        vehiculeService.getVehiculesDisponible(version,codeCou).then(data=>{
            res.status(200).json(data);
        }).catch(e=>{
            res.status(500).json({
                message:'Une erreur s\'est produite'
            });
        });
    }).catch(e=>{
        message:'Une erreur s\'est produite'
    });


});*/
module.exports = router;
