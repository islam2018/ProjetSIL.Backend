const express = require('express');
const multer = require('multer');
const router = express.Router();
const UtilFabAccessControl= require('../../control/AccessControl').UtilFabAccessControl;
const ImageService=require('../../services/ImageService');
const imageService=new ImageService();

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,'imageUploads/modeles');
    },
    filename: function(req,file,cb) {
        cb(null,new Date().toISOString().replace(/:/g, '-')+'_'+file.originalname);
    }
});
const upload=multer({storage:storage});

router.get('/:id',(req,res)=>{
    imageService.getAllImages(1,req.params.id).then(images=>{
        res.status(200).json(images);
    }).catch (err=>{
        res.status(500).json({
            message:'Une erreur a été produite'
        });
    });
});

router.post('/:id',UtilFabAccessControl,upload.single('imageModele'),(req,res)=>{

    req.body.CheminImage=req.file.path;
    imageService.createImage(req.body,1,req.params.id).then(image=>{
        res.status(200).json(image);
    }).catch (err=>{
        res.status(500).json({
            message:'Une erreur a été produite'
        });
    });
});

module.exports = router;