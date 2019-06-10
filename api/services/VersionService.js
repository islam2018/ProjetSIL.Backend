const VERSION=require('../model/version');
const MARQUE=require('../model/marque');
const MODELE=require('../model/modele');
const OPTION=require('../model/option');
const COULEUR=require('../model/couleur');
const REL_VER_OPT = require('../model/rel_ver_opt');
const REL_VER_COUL = require('../model/rel_ver_coul');
const IMAGE=require('../model/image');
const FAVORIS_VERSION=require('../model/favoris_version');
const LIGNETARIF = require('../model/lignetarif');
MARQUE.hasMany(MODELE, {foreignKey: 'CodeMarque'});
MODELE.belongsTo(MARQUE, {foreignKey: 'CodeMarque'});
MODELE.hasMany(VERSION, {foreignKey: 'CodeModele'});
VERSION.belongsTo(MODELE, {foreignKey: 'CodeModele'});
VERSION.hasMany(IMAGE,{as:'images',foreignKey:'Code',targetKey:'CodeVersion'});
VERSION.belongsToMany(OPTION,{as:'options',foreignKey:'CodeVersion',through:REL_VER_OPT,otherKey:'CodeOption'});
VERSION.belongsToMany(COULEUR,{as:'couleurs',foreignKey:'CodeVersion',through:REL_VER_COUL,otherKey:'CodeCouleur'});
VERSION.hasMany(FAVORIS_VERSION,{as:'suivies',foreignKey:'CodeVersion',foreignKeyKey:'CodeVersion'});
VERSION.hasOne(LIGNETARIF,{as:'lignetarif',foreignKey:'Code',targetKey:'CodeVersion'});

let VersionService=class VersionService {

    getAllVersion(codeModele) {
        return VERSION.findAll({
            include:[
               {model:OPTION,through: {model: REL_VER_OPT, attributes:['']},as:'options'},
                {model:COULEUR,through: {model: REL_VER_COUL, attributes:['']},as:'couleurs'},
                {model:IMAGE, attributes:['CheminImage'],as:'images'},
                {model: LIGNETARIF, where:{Type:0}, as:'lignetarif', required:false},
                {model: MODELE, attributes:['NomModele'], as:'modele', include:[
                        {model: MARQUE, attributes:['NomMarque'], as:'marque'}
                      ]}
            ],
            where: {CodeModele: codeModele}
        });
    }
    getAllVersionPourAutomobiliste(codeModele,idAutomobiliste) {
        return VERSION.findAll({

            include:[
                {model:OPTION,through: {model: REL_VER_OPT, attributes:['']},as:'options'},
                {model:COULEUR,through: {model: REL_VER_COUL, attributes:['']},as:'couleurs'},
                {model:IMAGE, attributes:['CheminImage'],as:'images'},
                {model: LIGNETARIF, where:{Type:0}, as:'lignetarif', required:false},
                {model:FAVORIS_VERSION, attributes:['idAutomobiliste'],as:'suivies',
                    where:{idAutomobiliste:idAutomobiliste},required:false}

            ],
            where: {CodeModele: codeModele}
        });
    }

    createVersion(version,codeModele) {
        return VERSION.create({
            CodeVersion: version.CodeVersion,
            CodeModele: codeModele,
            NomVersion:version.NomVersion
        });
    }

    getVersion(codeVersion) {
        let type=0;
        return VERSION.findOne({
            include:[
                {model:OPTION,through: {model: REL_VER_OPT, attributes:['']},as:'options'},
                {model:COULEUR,through: {model: REL_VER_COUL, attributes:['']},as:'couleurs'},
                {model:IMAGE, attributes:['CheminImage'],as:'images'},
                 {model: LIGNETARIF, where:{Type:0}, as:'lignetarif', required:false},
                {model: MODELE, attributes:['NomModele'], as:'modele', include:[
                        {model: MARQUE, attributes:['NomMarque'], as:'marque'}
                    ]},

            ],
            where : {CodeVersion: codeVersion}
        });
    }

    getVersionParNom(nomVersion) {
        return VERSION.findOne({
            include:[
                {model:OPTION,through: {model: REL_VER_OPT, attributes:['']},as:'options'},
                {model:COULEUR,through: {model: REL_VER_COUL, attributes:['']},as:'couleurs'},
                {model:IMAGE, attributes:['CheminImage'],as:'images'},
                {model: LIGNETARIF, where:{Type:0}, as:'lignetarif', required:false},
                {model: MODELE, attributes:['NomModele'], as:'modele', include:[
                        {model: MARQUE, attributes:['NomMarque'], as:'marque'}
                    ]}
            ],
            where : {NomVersion: nomVersion}
        });
    }

    updateVersion(version,codeVersion) {
        return VERSION.update({
            NomVersion:version.NomVersion
        },{where:{CodeVersion: codeVersion}});
    }

    deleteVersion(codeVersion) {
        return VERSION.destroy({where:{CodeVersion:codeVersion}});
    }



};


module.exports=VersionService;
