const IDTEST = 99999999;
const BASE_URL = require('../../../../api/config/base_url');
const REQUEST = require('request');
const MARQUE = require('../../../../api/model/marque');
const MODELE = require('../../../../api/model/modele');
const VERSION = require('../../../../api/model/version');
const OPTION = require('../../../../api/model/option');
const COULEUR = require('../../../../api/model/couleur');
const REL_VER_OPT = require('../../../../api/model/rel_ver_opt');
const REL_VER_COUL = require('../../../../api/model/rel_ver_coul');
const LIGNETARIF = require('../../../../api/model/lignetarif');

const jwt = require('jsonwebtoken');
const JWT_CONFIG=require('../../../../api/config/secret').JWT_CONFIG;

let optionObject = {
    CodeOption: '',
    NomOption: '',
    rel_ver_opt: ''
};

let couleurObject = {
    CodeCouleur: '',
    NomCouleur: '',
    rel_ver_coul: ''
};

describe('TESTS:/marques/modeles/versions | ', function() {

    /** ************************************************************************************************************ **/

    describe('GET /marques/modeles/versions/:id', function () {
        var req;

        beforeAll(function(done) {
            req = MARQUE.create({
                CodeMarque: IDTEST,
                NomMarque: "Testing Marque"
            }).then(() => {
                MODELE.create({
                    CodeModele: IDTEST,
                    CodeMarque: IDTEST,
                    NomModele: 'Testing Modele '
                }).then(() => {
                    VERSION.create({
                        CodeVersion: IDTEST,
                        CodeModele: IDTEST,
                        NomVersion: 'Testing post existed'
                    }).then(() => {
                        done();
                    });
                });
            });
        });

        afterAll(function(done) {
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST
                }
            }).then(() => {
                done();
            });
        });

        it('should return the element (id)', function (done) {
            req.then(() => {
                var options = {
                    url: BASE_URL + '/marques/modeles/versions/' + IDTEST,
                    json: true,
                    method: 'get'
                };
                REQUEST(options, function (error, response, body) {
                    expect(body.CodeVersion).toBe(IDTEST);
                    done();
                });
            });
        });

    });

    /** ************************************************************************************************************ **/

    describe('PUT /marques/modeles/versions/:id', function () {
        var req;
        var token;

        beforeAll(function(done) {
            req = MARQUE.create({
                CodeMarque: IDTEST,
                NomMarque: "Testing Marque"
            }).then(() => {
                MODELE.create({
                    CodeModele: IDTEST,
                    CodeMarque: IDTEST,
                    NomModele: 'Testing Modele '
                }).then(() => {
                    VERSION.create({
                        CodeVersion: IDTEST,
                        CodeModele: IDTEST,
                        NomVersion: 'Testing Version'
                    }).then(() => {
                        done();
                    });
                });
            });
        });

        afterAll(function(done) {
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST
                }
            }).then(() => {
                done();
            });
        });

        it('should change the element (id)', function (done) {
            req.then(() => {
                token = jwt.sign({Id:IDTEST,mail:'test@exists.com'},JWT_CONFIG.UTIL_FAB_KEY,{expiresIn:JWT_CONFIG.expiresIn},);
                var options = {
                    headers : {
                        'authorization': 'Bearer'+' '+token
                    },
                    url: BASE_URL + '/marques/modeles/versions/' + IDTEST,
                    body: {
                        'NomVersion': 'Testing modification'
                    },
                    json: true,
                    method: 'put'
                };
                REQUEST(options, function (error, response, body) {
                    expect(body.NomVersion).toBe('Testing modification');
                    done();
                });
            });
        });

        it('should say the element is not found', function (done) {
            req.then(() => {
                token = jwt.sign({Id:IDTEST,mail:'test@exists.com'},JWT_CONFIG.UTIL_FAB_KEY,{expiresIn:JWT_CONFIG.expiresIn},);
                var options = {
                    headers : {
                        'authorization': 'Bearer'+ ' '+token
                    },
                    url: BASE_URL+'/marques/modeles/versions/DoesNotExist',
                    body: {
                        'NomVersion': 'Testing modification inexisting'
                    },
                    json: true,
                    method: 'put'
                };
                REQUEST(options, function (error, response, body) {
                    expect(response.statusCode).toBe(404);
                    done();
                });
            });
        });
    });

    /** ************************************************************************************************************ **/

    describe('DELETE /marques/modeles/versions/:id', function () {
        var req;
        var token;

        beforeAll(function(done) {
            req = MARQUE.create({
                CodeMarque: IDTEST,
                NomMarque: "Testing Marque"
            }).then(() => {
                MODELE.create({
                    CodeModele: IDTEST,
                    CodeMarque: IDTEST,
                    NomModele: 'Testing Modele '
                }).then(() => {
                    VERSION.create({
                        CodeVersion: IDTEST,
                        CodeModele: IDTEST,
                        NomVersion: 'Testing Version'
                    }).then(() => {
                        done();
                    });
                });
            });
        });

        afterAll(function(done) {
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST
                }
            }).then(() => {
                done();
            });
        });

        it('should delete the element (id)', function (done) {
            req.then(() => {
                token = jwt.sign({Id:IDTEST,mail:'test@exists.com'},JWT_CONFIG.UTIL_FAB_KEY,{expiresIn:JWT_CONFIG.expiresIn},);
                var options = {
                    headers : {
                        'authorization': 'Bearer'+ ' '+token
                    },
                    url: BASE_URL+'/marques/modeles/versions/' + IDTEST,
                    json: true,
                    method: 'delete'
                };
                REQUEST(options, function (error, response, body) {
                    expect(response.statusCode).toBe(200);
                    done();
                });
            });
        });

    });

    /** ************************************************************************************************************ **/

    describe('GET /marques/modeles/versions/:id/options', function () {
        var req;

        beforeAll(function(done) {
            req = MARQUE.create({
                CodeMarque: IDTEST,
                NomMarque: "Testing Marque"
            }).then(() => {
                MODELE.create({
                    CodeModele: IDTEST,
                    CodeMarque: IDTEST,
                    NomModele: 'Testing Modele '
                }).then(() => {
                    VERSION.create({
                        CodeVersion: IDTEST,
                        CodeModele: IDTEST,
                        NomVersion: 'Testing Version'
                    }).then(() => {
                        OPTION.create({
                            CodeOption: IDTEST,
                            NomOption: 'Testing Option'
                        }).then(() => {
                            REL_VER_OPT.create({
                                idRelVerOpt: IDTEST,
                                CodeVersion: IDTEST,
                                CodeOption: IDTEST
                            }).then(() => {
                                done();
                            });
                        });
                    });
                });
            });
        });

        afterAll(function(done) {
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST
                }
            }).then(() => {
                done();
            });
            OPTION.destroy({
                where : {
                    CodeOption: IDTEST
                }
            }).then(() => {
                done();
            });
            REL_VER_OPT.destroy({
                where : {
                    idRelVerOpt: IDTEST
                }
            }).then(() => {
                done();
            });
        });

        it('should return all the "options" of "version" (id) ', function (done) {
            let options = {
                url: BASE_URL+'/marques/modeles/versions/'+IDTEST+'/options',
                json: true,
                method: 'get'
            };
            REQUEST(options, function (error, response, body) {
                let optionObjects = JSON.parse(JSON.stringify(body.options));
                optionObjects.map((row) => {
                    expect(JSON.stringify(Object.keys(optionObject).sort()) === JSON.stringify(Object.keys(row).sort())).toBeTruthy();
                });
                done();
            });
        });
    });

    /** ************************************************************************************************************ **/

    describe('POST /marques/modeles/versions/:id/options', function () {
        var req;
        var token;

        beforeAll(function(done) {
            req = MARQUE.create({
                CodeMarque: IDTEST,
                NomMarque: "Testing Marque"
            }).then(() => {
                MODELE.create({
                    CodeModele: IDTEST ,
                    CodeMarque: IDTEST,
                    NomModele: 'Testing Modele'
                }).then(() => {
                    VERSION.create({
                        CodeVersion: IDTEST,
                        CodeModele: IDTEST,
                        NomVersion: 'Testing Version '
                    }).then(() => {
                        OPTION.create({
                            CodeOption: IDTEST + 1,
                            NomOption: 'Testing post existed'
                        }).then(() => {
                            REL_VER_OPT.create({
                                idRelVerOpt: IDTEST,
                                CodeVersion: IDTEST,
                                CodeOption: IDTEST + 1
                            }).then(() => {
                                done();
                            });
                        });
                    });
                });
            })
        });

        afterAll(function(done) {
            MARQUE.destroy({
                where : {
                    NomMarque: "Testing Marque"
                }
            }).then(() => {
                done();
            });
            OPTION.destroy({
                where : {
                    CodeOption: IDTEST
                }
            }).then(() => {
                done();
            });

            OPTION.destroy({
                where : {
                    CodeOption: IDTEST + 1
                }
            }).then(() => {
                done();
            });
            REL_VER_OPT.destroy({
                where : {
                    idRelVerOpt: IDTEST
                }
            }).then(() => {
                done();
            });
        });

        it('should add a new element to table "option"', function (done) {
            req.then(() => {
                token = jwt.sign({Id:IDTEST,mail:'test@exists.com'},JWT_CONFIG.UTIL_FAB_KEY,{expiresIn:JWT_CONFIG.expiresIn},);
                let options = {
                    headers : {
                        'authorization': 'Bearer'+ ' '+token
                    },
                    url: BASE_URL+'/marques/modeles/versions/' + IDTEST + '/options',
                    json: true,
                    method: 'post',
                    body: {
                        'CodeOption': IDTEST,
                        'NomOption': 'Testing post'
                    }
                };
                REQUEST(options, function (error, response, body) {
                    expect(parseInt(body.CodeOption)).toBe(IDTEST);
                    done();
                });
            });
        });

        it('should say element already exists in the table "option"', function (done) {
            req.then(() => {
                token = jwt.sign({Id:IDTEST,mail:'test@exists.com'},JWT_CONFIG.UTIL_FAB_KEY,{expiresIn:JWT_CONFIG.expiresIn},);
                let options = {
                    headers : {
                        'authorization': 'Bearer'+ ' '+token
                    },
                    url: BASE_URL+'/marques/modeles/versions/'+IDTEST+'/options',
                    json: true,
                    method: 'post',
                    body: {
                        'CodeOption': IDTEST+1,
                        'NomOption': 'Testing post existed'
                    }
                };
                REQUEST(options, function (error, response, body) {
                    expect(response.statusCode).toBe(409);
                    done();
                });
            });
        });
    });

    /** ************************************************************************************************************ **/

    describe('GET /marques/modeles/versions/:id/couleurs', function () {
        var req;

        beforeAll(function(done) {
            req = MARQUE.create({
                CodeMarque: IDTEST,
                NomMarque: "Testing Marque"
            }).then(() => {
                MODELE.create({
                    CodeModele: IDTEST,
                    CodeMarque: IDTEST,
                    NomModele: 'Testing Modele '
                }).then(() => {
                    VERSION.create({
                        CodeVersion: IDTEST,
                        CodeModele: IDTEST,
                        NomVersion: 'Testing Version'
                    }).then(() => {
                        COULEUR.create({
                            CodeCouleur: IDTEST,
                            NomCouleur: 'Testing Couleur'
                        }).then(() => {
                            REL_VER_COUL.create({
                                idRelVerCoul: IDTEST,
                                CodeVersion: IDTEST,
                                CodeCouleur: IDTEST
                            }).then(() => {
                                done();
                            });
                        });
                    });
                });
            });
        });

        afterAll(function(done) {
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST
                }
            }).then(() => {
                done();
            });
            COULEUR.destroy({
                where : {
                    CodeCouleur: IDTEST
                }
            }).then(() => {
                done();
            });
            REL_VER_COUL.destroy({
                where : {
                    idRelVerCoul: IDTEST
                }
            }).then(() => {
                done();
            });
        });

        it('should return all the "couleurs" of "version" (id) ', function (done) {
            let options = {
                url: BASE_URL+'/marques/modeles/versions/'+IDTEST+'/couleurs',
                json: true,
                method: 'get'
            };
            REQUEST(options, function (error, response, body) {
                let couleurObjects = JSON.parse(JSON.stringify(body));
                couleurObjects.map((row) => {
                    expect(JSON.stringify(Object.keys(couleurObject).sort()) === JSON.stringify(Object.keys(row).sort())).toBeTruthy();
                });
                done();
            });
        });
    });

    /** ************************************************************************************************************ **/

    describe('POST /marques/modeles/versions/:id/couleurs', function () {
        var req;
        var token;

        beforeAll(function(done) {
            req = MARQUE.create({
                CodeMarque: IDTEST,
                NomMarque: "Testing Marque"
            }).then(() => {
                MODELE.create({
                    CodeModele: IDTEST ,
                    CodeMarque: IDTEST,
                    NomModele: 'Testing Modele'
                }).then(() => {
                    VERSION.create({
                        CodeVersion: IDTEST,
                        CodeModele: IDTEST,
                        NomVersion: 'Testing Version '
                    }).then(() => {
                        COULEUR.create({
                            CodeCouleur: IDTEST + 1,
                            NomCouleur: 'Testing post existed'
                        }).then(() => {
                            REL_VER_COUL.create({
                                idRelVerCoul: IDTEST,
                                CodeVersion: IDTEST,
                                CodeCouleur: IDTEST + 1
                            }).then(() => {
                                done();
                            });
                        });
                    });
                });
            });
        });

        afterAll(function(done) {
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST
                }
            }).then(() => {
                done();
            });
            COULEUR.destroy({
                where : {
                    CodeCouleur: IDTEST
                }
            }).then(() => {
                done();
            });
            COULEUR.destroy({
                where : {
                    CodeCouleur: IDTEST + 1
                }
            }).then(() => {
                done();
            });
            REL_VER_COUL.destroy({
                where : {
                    idRelVerCoul: IDTEST
                }
            }).then(() => {
                done();
            });
        });

        it('should add a new element to table "couleur"', function (done) {
            req.then(() => {
                token = jwt.sign({Id:IDTEST,mail:'test@exists.com'},JWT_CONFIG.UTIL_FAB_KEY,{expiresIn:JWT_CONFIG.expiresIn},);
                let options = {
                    headers : {
                        'authorization': 'Bearer'+ ' '+token
                    },
                    url: BASE_URL+'/marques/modeles/versions/' + IDTEST + '/couleurs',
                    json: true,
                    method: 'post',
                    body: {
                        'CodeCouleur': IDTEST,
                        'NomCouleur': 'Testing post'
                    }
                };
                REQUEST(options, function (error, response, body) {
                    expect(body.CodeCouleur).toBe(IDTEST);
                    done();
                });
            });
        });

        it('should say element already exists in the table "couleur"', function (done) {
            req.then(() => {
                token = jwt.sign({Id:IDTEST,mail:'test@exists.com'},JWT_CONFIG.UTIL_FAB_KEY,{expiresIn:JWT_CONFIG.expiresIn},);
                let options = {
                    headers : {
                        'authorization': 'Bearer'+ ' '+token
                    },
                    url: BASE_URL+'/marques/modeles/versions/'+IDTEST+'/couleurs',
                    json: true,
                    method: 'post',
                    body: {
                        'CodeCouleur': IDTEST+1,
                        'NomCouleur': 'Testing post existed'
                    }
                };
                REQUEST(options, function (error, response, body) {
                    expect(response.statusCode).toBe(409);
                    done();
                });
            });
        });

    });

    /** ************************************************************************************************************ **/

    describe('GET /marques/modeles/versions/:id/lignetarif', function () {
        var req;

        beforeAll(function() {
            req = LIGNETARIF.create({
                idLigneTarif: IDTEST,
                Type: 0,
                Code: IDTEST,
                DateDebut: '2019-03-04',
                DateFin: '2019-03-04',
                Prix: 9999
            });
        });

        afterAll(function(done) {
            LIGNETARIF.destroy({
                where : {
                    idLigneTarif: IDTEST
                }
            }).then(() => {
                done();
            });
        });

        it('should return the element (id)', function (done) {
            req.then(() => {
                var options = {
                    url: BASE_URL + '/marques/modeles/versions/' + IDTEST + '/lignetarif',
                    json: true,
                    method: 'get'
                };
                REQUEST(options, function (error, response, body) {
                    expect(body.idLigneTarif).toBe(IDTEST);
                    done();
                });
            });
        });
    });

    /** ************************************************************************************************************ **/

    describe('PUT /marques/modeles/versions/:id/lignetarif', function () {
        var req;
        var token;

        beforeAll(function(done) {
            req = LIGNETARIF.create({
                idLigneTarif: IDTEST,
                Type: 0,
                Code: IDTEST,
                DateDebut: '2019-03-04',
                DateFin: '2019-03-04',
                Prix: 9999
            }).then(() => {
                MARQUE.create({
                    CodeMarque: IDTEST,
                    NomMarque: "Testing Marque"
                }).then(() => {
                    MODELE.create({
                        CodeModele: IDTEST,
                        CodeMarque: IDTEST,
                        NomModele: 'Testing Modele '
                    }).then(() => {
                        VERSION.create({
                            CodeVersion: IDTEST,
                            CodeModele: IDTEST,
                            NomVersion: 'Testing Version'
                        }).then(() => {
                           done();
                        });
                    });
                });
            });
        });

        afterAll(function(done) {
            LIGNETARIF.destroy({
                where : {
                    idLigneTarif: IDTEST
                }
            }).then(() => {
                done();
            });
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST
                }
            }).then(() => {
                done();
            });
        });

        it('should return the element (id)', function (done) {
            req.then(() => {
                token = jwt.sign({Id:IDTEST,mail:'test@exists.com'},JWT_CONFIG.UTIL_FAB_KEY,{expiresIn:JWT_CONFIG.expiresIn},);
                var options = {
                    headers : {
                        'authorization': 'Bearer'+' ' + token
                    },
                    url: BASE_URL + '/marques/modeles/versions/' + IDTEST + '/lignetarif',
                    body: {
                        'DateDebut' : '2019-03-04',
                        'DateFin' : '2019-03-04',
                        'Prix': 10000
                    },
                    json: true,
                    method: 'put'
                };
                REQUEST(options, function (error, response, body) {
                    expect(body.idLigneTarif).toBe(IDTEST);
                    expect(body.Prix).toBe(10000);
                    done();
                });
            });
        });

        it('should return the element (id)', function (done) {
            req.then(() => {
                token = jwt.sign({Id:IDTEST,mail:'test@exists.com'},JWT_CONFIG.UTIL_FAB_KEY,{expiresIn:JWT_CONFIG.expiresIn},);
                var options = {
                    headers : {
                        'authorization': 'Bearer'+' ' + token
                    },
                    url: BASE_URL + '/marques/modeles/versions/' + IDTEST + 1 + '/lignetarif',
                    body: {
                        'DateDebut' : '2019-03-04',
                        'DateFin' : '2019-03-04',
                        'Prix': 10000
                    },
                    json: true,
                    method: 'put'
                };
                REQUEST(options, function (error, response, body) {
                    expect(response.statusCode).toBe(404);
                    done();
                });
            });
        });
    });

    /** ************************************************************************************************************ **/

    describe('DELETE /marques/modeles/versions/:id/lignetarif', function () {
        var req;
        var token;

        beforeAll(function(done) {
            req = LIGNETARIF.create({
                idLigneTarif: IDTEST,
                Type: 0,
                Code: IDTEST,
                DateDebut: '2019-03-04',
                DateFin: '2019-03-04',
                Prix: 9999
            }).then(() => {
                MARQUE.create({
                    CodeMarque: IDTEST,
                    NomMarque: "Testing Marque"
                }).then(() => {
                    MODELE.create({
                        CodeModele: IDTEST,
                        CodeMarque: IDTEST,
                        NomModele: 'Testing Modele '
                    }).then(() => {
                        VERSION.create({
                            CodeVersion: IDTEST,
                            CodeModele: IDTEST,
                            NomVersion: 'Testing Version'
                        }).then(() => {
                            done();
                        });
                    });
                });
            });
        });

        afterAll(function(done) {
            LIGNETARIF.destroy({
                where : {
                    idLigneTarif: IDTEST
                }
            }).then(() => {
                done();
            });
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST
                }
            }).then(() => {
                done();
            });
        });

        it('should delete the element (id)', function (done) {
            req.then(() => {
                token = jwt.sign({Id:IDTEST,mail:'test@exists.com'},JWT_CONFIG.UTIL_FAB_KEY,{expiresIn:JWT_CONFIG.expiresIn},);
                var options = {
                    headers : {
                        'authorization': 'Bearer'+' ' + token
                    },
                    url: BASE_URL + '/marques/modeles/versions/' + IDTEST + '/lignetarif',
                    json: true,
                    method: 'delete'
                };
                REQUEST(options, function (error, response, body) {
                    expect(response.statusCode).toBe(200);
                    done();
                });
            });
        });


    });

    /** ************************************************************************************************************ **/

});
