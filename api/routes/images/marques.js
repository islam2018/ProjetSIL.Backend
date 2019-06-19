const express = require('express');
const router = express.Router();
const AdminAccessControl= require('../../control/AccessControl').AdminAccessControl;
const ImageService=require('../../services/ImageService');
const imageService=new ImageService();

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
    folder: 'Marques',
    filename: function (req, file, cb) {
        cb(null,new Date().toISOString().replace(/:/g, '-')+'_'+file.originalname);
    }
});

const upload=multer({storage:storage});


router.get('/:id',(req,res)=>{
    imageService.getAllImages(0,req.params.id).then(images=>{
        res.status(200).json(images);
    }).catch (err=>{
        res.status(500).json({
            message:'Une erreur a été produite'
        });
    });
});

router.post('/:id',AdminAccessControl,upload.single('imageMarque'),(req,res)=>{

    console.log(req.params.id);
    imageService.deleteImageMarque(req.params.id).then(result => {
        if (result) {
            req.body.CheminImage=req.file.url;
            imageService.createImage(req.body,0,req.params.id).then(image=>{
                res.status(200).json(image);
            }).catch (err=>{
                res.status(500).json({
                    message:'Une erreur a été produite'
                });
            });
        }else {
            res.status(500).json({
                message:'Une erreur a été produite'
            });
        }
    }).catch (err=>{
        res.status(500).json({
            message:'Une erreur a été produite'
        });
    });
});

module.exports = router;
