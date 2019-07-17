const sequelize = require('sequelize');
const Sequelize = require('../config/dbconnection');
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
const ImageService = require('./ImageService');
const imageService = new ImageService();
MARQUE.hasMany(MODELE, {foreignKey: 'CodeMarque'});
MODELE.belongsTo(MARQUE, {foreignKey: 'CodeMarque'});
MODELE.hasMany(VERSION, {foreignKey: 'CodeModele'});
VERSION.belongsTo(MODELE, {foreignKey: 'CodeModele'});
VERSION.hasMany(IMAGE,{as:'images',foreignKey:'Code',targetKey:'CodeVersion'});
COULEUR.hasMany(IMAGE,{as:'images',foreignKey:'CodeSup',targetKey:'CodeCouleur'});
VERSION.belongsToMany(OPTION,{as:'options',foreignKey:'CodeVersion',through:REL_VER_OPT,otherKey:'CodeOption'});
VERSION.belongsToMany(COULEUR,{as:'couleurs',foreignKey:'CodeVersion',through:REL_VER_COUL,otherKey:'CodeCouleur'});
VERSION.hasMany(FAVORIS_VERSION,{as:'suivies',foreignKey:'CodeVersion',foreignKeyKey:'CodeVersion'});
VERSION.hasOne(LIGNETARIF,{as:'lignetarif',foreignKey:'Code',targetKey:'CodeVersion'});

let VersionService=class VersionService {

    getAllVersion(codeModele) {

            return new Promise((resolve,reject)=> {
                VERSION.findAll({
                    include: [
                        {model: OPTION, through: {model: REL_VER_OPT, attributes: ['']}, as: 'options'},
                        {model: COULEUR, through: {model: REL_VER_COUL, attributes: ['']}, as: 'couleurs',
                        include:[
                            {model: IMAGE, attributes: ['idImage', 'CheminImage'],
                                where: {Type: 2, Code:  sequelize.literal('`version`.`CodeVersion` = `couleurs->images`.`Code`')},
                               as: 'images', required: false}
                        ]},
                        //{model: IMAGE, attributes: ['idImage', 'CheminImage'], where: {Type: 2}, as: 'images'},
                        {model: LIGNETARIF, where: {Type: 0}, as: 'lignetarif', required: false},
                        {
                            model: MODELE, attributes: ['NomModele'], as: 'modele', include: [
                                {model: MARQUE, attributes: ['NomMarque'], as: 'marque'}
                            ]
                        }
                    ],
                    where: {CodeModele: codeModele}
                }).then(versions => {
                    let res=[];
                    versions.forEach(v=>{
                        let version = v.toJSON();
                        let colors = [];
                        version.couleurs.forEach(couleur=>{
                            let chemin;
                            if (couleur.images.length>0) chemin= couleur.images[0].CheminImage;
                            else chemin=null;
                           colors.push({
                               CodeCouleur: couleur.CodeCouleur,
                               NomCouleur: couleur.NomCouleur,
                               CodeHexa: couleur.CodeHexa,
                               CheminImage: chemin
                           });
                        });
                        res.push({
                            CodeVersion: version.CodeVersion,
                            CodeModele:  version.CodeModele,
                            NomVersion:  version.NomVersion,
                            options: version.options,
                            couleurs: colors,
                            lignetarif: version.lignetarif,
                            modele:version.modele
                        });
                    });
                    resolve(res);
                }).catch(e => {
                    reject(e);
                });
            });
    }




    getAllVersionsPourAutomobiliste(codeModele,idAutomobiliste) {
        return VERSION.findAll({

            include:[
                {model:OPTION,through: {model: REL_VER_OPT, attributes:['']},as:'options'},
                {model: COULEUR, through: {model: REL_VER_COUL, attributes: ['']}, as: 'couleurs',
                    include:[
                        {model: IMAGE, attributes: ['idImage', 'CheminImage'],
                            where: {Type: 2, Code:  sequelize.literal('`version`.`CodeVersion` = `couleurs->images`.`Code`')},
                            as: 'images', required: false}
                    ]},
                //{model:IMAGE, attributes:['CheminImage'],where:{Type:2},as:'images'},
                {model: LIGNETARIF, where:{Type:0}, as:'lignetarif', required:false},
                {model:FAVORIS_VERSION, attributes:['idAutomobiliste'],as:'suivies',
                    where:{idAutomobiliste:idAutomobiliste},required:false}

            ],
            where: {CodeModele: codeModele}
        }).then(versions=>{
            var tab = [];
            versions.forEach(v=>{
                var version= v.toJSON();
                let colors = [];
                version.couleurs.forEach(couleur=>{
                    let chemin;
                    if (couleur.images.length>0) chemin= couleur.images[0].CheminImage;
                    else chemin=null;
                    colors.push({
                        CodeCouleur: couleur.CodeCouleur,
                        NomCouleur: couleur.NomCouleur,
                        CodeHexa: couleur.CodeHexa,
                        CheminImage: chemin
                    });
                });
                let suivie=false;
                if (version.suivies.length>0)  suivie=true;
                tab.push({
                    CodeVersion: version.CodeVersion,
                    CodeModele: version.CodeModele,
                    NomVersion: version.NomVersion,
                    options : version.options,
                    couleurs : colors,
                    //images : version.images,
                    lignetarif: version.lignetarif,
                    suivie : suivie
                });
            });
            return new Promise((resolve,reject)=>resolve(tab));
        }).catch(err=>{
            console.log(err);
            return new Promise((resolve,reject)=>reject(err));
        });
    }

    createVersion(version,codeModele) {
        return VERSION.create({
            CodeVersion: version.CodeVersion,
            CodeModele: codeModele,
            NomVersion:version.NomVersion
        });
    }

    getVersionInfo(codeVersion) {
        return VERSION.findOne({
            include:[
                {model: MODELE, attributes:['NomModele'], as:'modele', include:[
                        {model: MARQUE, attributes:['NomMarque'], as:'marque'}
                    ]},
            ],
            where : {CodeVersion: codeVersion}
        });
    }

    getVersion(codeVersion) {
        let type=0;
        return new Promise((resolve,reject)=>{
            VERSION.findOne({
                include:[
                    {model:OPTION,through: {model: REL_VER_OPT, attributes:['']},as:'options'},
                    {model: COULEUR, through: {model: REL_VER_COUL, attributes: ['']}, as: 'couleurs',
                        include:[
                            {model: IMAGE, attributes: ['idImage', 'CheminImage'],
                                where: {Type: 2, Code:  sequelize.literal('`version`.`CodeVersion` = `couleurs->images`.`Code`')},
                                as: 'images', required: false}
                        ]},
                    //{model:IMAGE, attributes:['CheminImage'],where:{Type:2},as:'images'},
                    {model: LIGNETARIF, where:{Type:0}, as:'lignetarif', required:false},
                    {model: MODELE, attributes:['NomModele'], as:'modele', include:[
                            {model: MARQUE, attributes:['NomMarque'], as:'marque'}
                        ]},

                ],
                where : {CodeVersion: codeVersion}
            }).then(v => {
                let version = v.toJSON();
                let colors = [];
                version.couleurs.forEach(couleur=>{
                    let chemin;
                    if (couleur.images.length>0) chemin= couleur.images[0].CheminImage;
                    else chemin=null;
                    colors.push({
                        CodeCouleur: couleur.CodeCouleur,
                        NomCouleur: couleur.NomCouleur,
                        CodeHexa: couleur.CodeHexa,
                        CheminImage: chemin
                    });
                });
                resolve({
                    CodeVersion: version.CodeVersion,
                    CodeModele:  version.CodeModele,
                    NomVersion:  version.NomVersion,
                    options: version.options,
                    couleurs: colors,
                    lignetarif: version.lignetarif,
                    modele:version.modele
                });
            }).catch(e => {
                reject(e);
            });
        });
    }
    getVersionPourAutomobiliste(codeVersion,idAutomobiliste) {
        return VERSION.findOne({

            include:[
                {model:OPTION,through: {model: REL_VER_OPT, attributes:['']},as:'options'},
                {model: COULEUR, through: {model: REL_VER_COUL, attributes: ['']}, as: 'couleurs',
                    include:[
                        {model: IMAGE, attributes: ['idImage', 'CheminImage'],
                            where: {Type: 2, Code:  sequelize.literal('`version`.`CodeVersion` = `couleurs->images`.`Code`')},
                            as: 'images', required: false}
                    ]},
                //{model:IMAGE, attributes:['CheminImage'],where:{Type:2},as:'images'},
                {model: LIGNETARIF, where:{Type:0}, as:'lignetarif', required:false},
                {model:FAVORIS_VERSION, attributes:['idAutomobiliste'],as:'suivies',
                    where:{idAutomobiliste:idAutomobiliste},required:false}

            ],
            where: {CodeVersion: codeVersion}
        }).then(v=>{
            var version= v.toJSON();
            let colors = [];
            version.couleurs.forEach(couleur=>{
                let chemin;
                if (couleur.images.length>0) chemin= couleur.images[0].CheminImage;
                else chemin=null;
                colors.push({
                    CodeCouleur: couleur.CodeCouleur,
                    NomCouleur: couleur.NomCouleur,
                    CodeHexa: couleur.CodeHexa,
                    CheminImage: chemin
                });
            });
            let suivie=false;
            if (version.suivies.length>0)  suivie=true;
            var res = {
                    CodeVersion: version.CodeVersion,
                    CodeModele: version.CodeModele,
                    NomVersion: version.NomVersion,
                    options : version.options,
                    couleurs : colors,
                    images : version.images,
                    lignetarif: version.lignetarif,
                    suivie : suivie
                };

            return new Promise((resolve,reject)=>resolve(res));
        }).catch(err=>{
            console.log(err);
            return new Promise((resolve,reject)=>reject(err));
        });
    }

    getVersionParNom(nomVersion) {
        return new Promise((resolve,reject)=>{
            VERSION.findOne({
                include:[
                    {model:OPTION,through: {model: REL_VER_OPT, attributes:['']},as:'options'},
                    {model: COULEUR, through: {model: REL_VER_COUL, attributes: ['']}, as: 'couleurs',
                        include:[
                            {model: IMAGE, attributes: ['idImage', 'CheminImage'],
                                where: {Type: 2, Code:  sequelize.literal('`version`.`CodeVersion` = `couleurs->images`.`Code`')},
                                as: 'images', required: false}
                        ]},
                    // {model:IMAGE, attributes:['CheminImage'],where:{Type:2},as:'images'},
                    {model: LIGNETARIF, where:{Type:0}, as:'lignetarif', required:false},
                    {model: MODELE, attributes:['NomModele'], as:'modele', include:[
                            {model: MARQUE, attributes:['NomMarque'], as:'marque'}
                        ]}
                ],
                where : {NomVersion: nomVersion}
            }).then(v => {
                let version = v.toJSON();
                let colors = [];
                version.couleurs.forEach(couleur=>{
                    let chemin;
                    if (couleur.images.length>0) chemin= couleur.images[0].CheminImage;
                    else chemin=null;
                    colors.push({
                        CodeCouleur: couleur.CodeCouleur,
                        NomCouleur: couleur.NomCouleur,
                        CodeHexa: couleur.CodeHexa,
                        CheminImage: chemin
                    });
                });
                resolve({
                    CodeVersion: version.CodeVersion,
                    CodeModele:  version.CodeModele,
                    NomVersion:  version.NomVersion,
                    options: version.options,
                    couleurs: colors,
                    lignetarif: version.lignetarif,
                    modele:version.modele
                });
            }).catch(e => {
                reject(e);
            });
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
