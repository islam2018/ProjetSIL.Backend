const IDTEST = 99999999;
const BASE_URL = require('../../../../../api/config/base_url');
const REQUEST = require('request');
const MARQUE = require('../../../../../api/model/marque');
const MODELE = require('../../../../../api/model/modele');
const VERSION = require('../../../../../api/model/version');
const COULEUR = require('../../../../../api/model/couleur');
const LIGNETARIF = require('../../../../../api/model/lignetarif');

const jwt = require('jsonwebtoken');
const JWT_CONFIG=require('../../../../../api/config/secret').JWT_CONFIG;

describe('TESTS:/marques/modeles/versions/couleurs | ', function() {

    /** ************************************************************************************************************ **/

    describe('GET /marques/modeles/versions/couleurs/:id', function () {
        var req;

        beforeAll(function(done) {
            req = COULEUR.create({
                CodeCouleur: IDTEST,
                NomCouleur: "Testing Couleur"
            }).then(() => {
                done();
            })
        });

        afterAll(function(done) {
            COULEUR.destroy({
                where : {
                    CodeCouleur: IDTEST
                }
            }).then(() => {
                done();
            });
        });

        it('should return the element (id)', function (done) {
            req.then(() => {
                var options = {
                    url: BASE_URL + '/marques/modeles/versions/couleurs/' + IDTEST,
                    json: true,
                    method: 'get'
                };
                REQUEST(options, function (error, response, body) {
                    expect(body.CodeCouleur).toBe(IDTEST);
                    done();
                });
            });
        });

    });

    /** ************************************************************************************************************ **/

    describe('PUT /marques/modeles/versions/couleurs/:id', function () {
        var req;
        var token;

        beforeAll(function(done) {
            req = COULEUR.create({
                CodeCouleur: IDTEST,
                NomCouleur: "Testing Couleur"
            }).then(() => {
                done();
            })
        });

        afterAll(function(done) {
            COULEUR.destroy({
                where : {
                    CodeCouleur: IDTEST
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
                    url: BASE_URL + '/marques/modeles/versions/couleurs/' + IDTEST,
                    body: {
                        'NomCouleur': 'Testing modification'
                    },
                    json: true,
                    method: 'put'
                };
                REQUEST(options, function (error, response, body) {
                    expect(body.CodeCouleur).toBe(IDTEST);
                    expect(body.NomCouleur).toBe('Testing modification');
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
                    url: BASE_URL+'/marques/modeles/versions/couleurs/DoesNotExist',
                    body: {
                        'NomCouleur': 'Testing modification inexisting'
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
            req = COULEUR.create({
                CodeCouleur: IDTEST,
                NomCouleur: "Testing Couleur"
            }).then(() => {
                done();
            })
        });

        afterAll(function(done) {
            COULEUR.destroy({
                where : {
                    CodeCouleur: IDTEST
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
                    url: BASE_URL+'/marques/modeles/versions/couleurs/' + IDTEST,
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

    describe('GET /marques/modeles/versions/couleurs/:id/lignetarif', function () {
        var req;

        beforeAll(function() {
            req = LIGNETARIF.create({
                idLigneTarif: IDTEST,
                Type: 1,
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
                    url: BASE_URL + '/marques/modeles/versions/couleurs/' + IDTEST + '/lignetarif',
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

    describe('PUT /marques/modeles/versions/couleurs/:id/lignetarif', function () {
        var req;
        var token;

        beforeAll(function(done) {
            req = LIGNETARIF.create({
                idLigneTarif: IDTEST,
                Type: 1,
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
                            COULEUR.create({
                                CodeCouleur: IDTEST,
                                NomCouleur: "Testing Couleur"
                            }).then(() => {
                               done();
                            });
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
            COULEUR.destroy({
                where : {
                    CodeCouleur: IDTEST
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
                    url: BASE_URL + '/marques/modeles/versions/couleurs/' + IDTEST + '/lignetarif',
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
                    url: BASE_URL + '/marques/modeles/versions/couleurs/' + IDTEST + 1 + '/lignetarif',
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

    describe('DELETE /marques/modeles/versions/couleurs/:id/lignetarif', function () {
        var req;
        var token;

        beforeAll(function(done) {
            req = LIGNETARIF.create({
                idLigneTarif: IDTEST,
                Type: 1,
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
                            COULEUR.create({
                                CodeCouleur: IDTEST,
                                NomCouleur: "Testing Couleur"
                            }).then(() => {
                                done();
                            });
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
            COULEUR.destroy({
                where : {
                    CodeCouleur: IDTEST
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
                    url: BASE_URL + '/marques/modeles/versions/couleurs/' + IDTEST + '/lignetarif',
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
