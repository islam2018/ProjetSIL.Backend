const express = require('express');
const router = express.Router();
const VehiculeService = require('../../services/VehiculeService');
const vehiculeService = new VehiculeService();
const VersionService = require('../../services/VersionService');
const versionService = new VersionService();
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

router.post('/stock',upload.single('stockFile'),(req,res)=>{
    console.log(req.file.url);
     csv().fromStream(request.get(req.file.url)).subscribe(json=>{
        console.log(json) ;

         res.status(200).json({msg:json});
     });

});

router.post('/disponible',(req,res)=>{
    vehiculeService.getVehiculesDisponible(req.body).then(data=>{
        res.status(200).json(data);
    }).catch(e=>{
        res.status(500).json({
            message:'Une erreur s\'est produite'+e
        });
    })
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
