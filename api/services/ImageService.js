const IMAGE=require('../model/image');

let ImageService=class ImageService {


    getAllImages(type,code) {
        return IMAGE.findAll({
            where: {Type:type,Code:code}
        });
    }

    getVersionImage(type,code,codeSup) {
        return IMAGE.findOne({
                    where: {Type:type,Code:code,CodeSup:codeSup}
                });

    }

    createImage(image,type,code) {
        let CodeSup = 0;
        if (type===2) CodeSup = image.CodeCouleur;
            return IMAGE.create({
                Type: type,
                Code: code,
                CodeSup: CodeSup,
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

    deleteImageMarque(codeMarque) {
        return IMAGE.destroy({
            where: {Code: codeMarque, Type:0}
        })
    }

    deleteImageVersion(codeVersion,codeCouleur) {
        return IMAGE.destroy({
            where: {Code: codeVersion, CodeSup:codeCouleur, Type:2}
        })
    }
    deleteImageProfile(id) {
        return IMAGE.destroy({
            where: {Code: id, Type:5}
        })
    }
};

module.exports=ImageService;
