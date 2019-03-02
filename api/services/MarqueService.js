const MARQUE=require('../model/marque');
const MODELE=require('../model/modele');


let MarqueService=class MarqueService{

    getAllMarques() {
        return MARQUE.findAll();
    }

    createMarque(marque) {
        return MARQUE.create({
            CodeMarque: marque.CodeMarque,
            NomMarque:marque.NomMarque
        });
    }

    getMarque(codeMarque) {
        return MARQUE.findOne({
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