const IMAGE=require('../model/image');

let ImageService=class ImageService {


    getAllImages(type,code) {
        return IMAGE.findAll({
            where: {Type:type,Code:code}
        });
    }

    createImage(image,type,code) {
        return IMAGE.create({
            Type: type,
            Code: code,
            CheminImage: image.CheminImage,
            Description: image.Description
        });
    }

    getImage(idImage) {
        return IMAGE.findOne({
            where : {idImage: idImage}
        });
    }

    updateImage(image,idImage) {
        return IMAGE.update({
            Description: image.Description
        },{ where : {idImage: idImage}});
    }

    deleteImage(idImage) {
        return IMAGE.destroy({where : {idImage: idImage}});
    }
};

module.exports=ImageService;
