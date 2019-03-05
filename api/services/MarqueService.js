const MARQUE=require('../model/marque');
const MODELE=require('../model/modele');
const IMAGE=require('../model/image');
MARQUE.hasMany(IMAGE,{as:'images',foreignKey:'Code',foreignKeyKey:'CodeMarque'});


let MarqueService=class MarqueService{

    getAllMarques() {
        return MARQUE.findAll({
            include:[
                {model:IMAGE, attributes:['CheminImage'],as:'images'}
            ],
        });
    }

    createMarque(marque) {
        return MARQUE.create({
            CodeMarque: marque.CodeMarque,
            NomMarque:marque.NomMarque
        });
    }

    getMarque(codeMarque) {
        return MARQUE.findOne({
            include:[
                {model:IMAGE, attributes:['CheminImage'],as:'images'}
            ],
            where : {CodeMarque: codeMarque}
        });
    }
    getMarqueParNom(nomMarque) {
        return MARQUE.findOne({
            where : {NomMarque: nomMarque}
        });
    }

    updateMarque(marque,codeMarque) {
        return MARQUE.update({
            NomMarque:marque.NomMarque
        },{where:{CodeMarque: codeMarque}});
    }

    deleteMarque(codeMarque) {
        return MARQUE.destroy({where:{CodeMarque:codeMarque}});
    }
};

module.exports=MarqueService;