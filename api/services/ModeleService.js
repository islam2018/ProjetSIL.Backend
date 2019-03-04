const MODELE=require('../model/modele');
const OPTION=require('../model/option');
const VERSION=require('../model/version');
const REL_MOD_OPT=require('../model/rel_mod_opt');

MODELE.hasMany(REL_MOD_OPT,{foreignKey: 'CodeModele', targetKey: 'CodeModele'});
MODELE.hasMany(VERSION,{foreignKey: 'CodeModele', targetKey: 'CodeModele'});
REL_MOD_OPT.belongsTo(OPTION,{foreignKey: 'CodeOption', targetKey: 'CodeOption'});



let ModeleService=class ModeleService {

    getAllModeles(codeMarque) {
        return MODELE.findAll({
            include: [{
                model: VERSION,
            },{
                model: REL_MOD_OPT,
                    include: [{
                    model: OPTION,
                    }]
            }],
            where: {CodeMarque : codeMarque}
        });
    }

    createModele(modele,codeMarque) {
        return MODELE.create({
            CodeModele: modele.CodeModele,
            CodeMarque: codeMarque,
            NomModele:modele.NomModele

        });
    }

    getModele(codeModele) {
        return MODELE.findOne({
            include: [{
                model: VERSION,
            },{
                model: REL_MOD_OPT,
                include: [{
                    model: OPTION,
                }]
            }],
            where: {CodeModele : codeModele}
        });
    }

    getModeleParNom(nomModele) {
        return MODELE.findOne({
            where : {NomModele: nomModele}
        });
    }

    updateModele(modele,codeModele) {
        return MODELE.update({
            NomModele:modele.NomModele
        },{where:{CodeModele: codeModele}});
    }

    deleteModele(codeModele) {
        return MODELE.destroy({where:{CodeModele:codeModele}});
    }
};

module.exports=ModeleService;
