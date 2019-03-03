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
const UTILFAB = require('../../../../api/model/utilfab');
const LIGNETARIF = require('../../../../api/model/lignetarif');

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

    /*describe('GET /marques/modeles/versions/:id', function () {
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

        afterAll(function() {
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST
                }
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

    /*describe('PUT /marques/modeles/versions/:id', function () {
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
                        UTILFAB.create({
                            IdUserF: IDTEST,
                            Mail: 'test@exists.com',
                            Nom: 'DJERADI',
                            Prenom: 'Mossab',
                            NumTel: '06992',
                            Fabricant: IDTEST,
                            Mdp: '$2a$04$ZzEc12dZe7JGPbrXKpe5rOw3h3.UixxifFnZseJoouMKcfUtA3UaC' // mdp == 'test'
                        }).then(() => {
                            let options = {
                                url: BASE_URL+'/auth/utilfab/',
                                json: true,
                                method: 'post',
                                body: {
                                    'Mail': 'islam1@esi.dz',
                                    'Mdp' : '1234'
                                }
                            };
                            REQUEST(options, function (error, response, body) {
                                token = body.token;
                                console.log('the token is : ' + token);
                                done();
                            });
                            done();
                        });
                    });
                });
            });
        });

        afterAll(function() {
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST
                }
            });
        });

        it('should change the element (id)', function (done) {
            req.then(() => {
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

    /*describe('DELETE /marques/modeles/versions/:id', function () {
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
                        UTILFAB.create({
                            IdUserF: IDTEST,
                            Mail: 'test@exists.com',
                            Fabricant: IDTEST,
                            Mdp: '$2a$04$ZzEc12dZe7JGPbrXKpe5rOw3h3.UixxifFnZseJoouMKcfUtA3UaC' // mdp == 'test'
                        }).then(() => {
                            let options = {
                                url: BASE_URL+'/auth/utilfab/',
                                json: true,
                                method: 'post',
                                body: {
                                    'Mail': 'test@exists.com',
                                    'Mdp' : 'mossab12'
                                }
                            };
                            REQUEST(options, function (error, response, body) {
                                token = body.token;
                                done();
                            });
                            done();
                        });
                    });
                });
            });
        });

        afterAll(function() {
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST
                }
            });
        });

        it('should delete the element (id)', function (done) {
            req.then(() => {
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

    /*describe('GET /marques/modeles/versions/:id/options', function () {
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

        afterAll(function() {
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST
                }
            });
            OPTION.destroy({
                where : {
                    CodeOption: IDTEST
                }
            });
            REL_VER_OPT.destroy({
                where : {
                    idRelVerOpt: IDTEST
                }
            });
        });

        it('should return all the "versions" of marque (id) ', function (done) {
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

    /*describe('POST /marques/modeles/versions/:id/options', function () {
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
            }).then(() => {
                UTILFAB.create({
                    IdUserF: IDTEST,
                    Mail: 'test@exists.com',
                    Fabricant: IDTEST,
                    Mdp: '$2a$04$ZzEc12dZe7JGPbrXKpe5rOw3h3.UixxifFnZseJoouMKcfUtA3UaC' // mdp == 'test'
                }).then(() => {
                    let options = {
                        url: BASE_URL+'/auth/utilfab/',
                        json: true,
                        method: 'post',
                        body: {
                            'Mail': 'test@exists.com',
                            'Mdp' : 'mossab12'
                        }
                    };
                    REQUEST(options, function (error, response, body) {
                        token = body.token;
                        done();
                    });
                });
            });

        });

        afterAll(function() {
            MARQUE.destroy({
                where : {
                    NomMarque: "Testing Marque"
                }
            });
            OPTION.destroy({
                where : {
                    CodeOption: IDTEST
                }
            });
            OPTION.destroy({
                where : {
                    CodeOption: IDTEST + 1
                }
            });
            REL_VER_OPT.destroy({
                where : {
                    idRelVerOpt: IDTEST
                }
            });
        });

        it('should add a new element to table "modele"', function (done) {
            req.then(() => {
                let options = {
                    headers : {
                        'authorization': 'Bearer'+ ' '+token
                    },
                    url: BASE_URL+'/marques/modeles/versions/' + IDTEST + '/options',
                    json: true,
                    method: 'post',
                    body: {
                        'CodeOption': IDTEST,
                        'NomVersions': 'Testing post'
                    }
                };
                REQUEST(options, function (error, response, body) {
                    expect(parseInt(body.CodeOption)).toBe(IDTEST);
                    done();
                });
            });
        });

        it('should say element already exists in the table "modele"', function (done) {
            req.then(() => {
                let options = {
                    headers : {
                        'authorization': 'Bearer'+ ' '+token
                    },
                    url: BASE_URL+'/marques/modeles/versions/'+IDTEST+'/options',
                    json: true,
                    method: 'post',
                    body: {
                        'NomVersion': 'Testing post existed'
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

    /*describe('GET /marques/modeles/versions/:id/options', function () {
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

        afterAll(function() {
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST
                }
            });
            COULEUR.destroy({
                where : {
                    CodeCouleur: IDTEST
                }
            });
            REL_VER_COUL.destroy({
                where : {
                    idRelVerCoul: IDTEST
                }
            });
        });

        it('should return all the "versions" of marque (id) ', function (done) {
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

    /*describe('POST /marques/modeles/versions/:id/options', function () {
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
            }).then(() => {
                UTILFAB.create({
                    IdUserF: IDTEST,
                    Mail: 'test@exists.com',
                    Fabricant: IDTEST,
                    Mdp: '$2a$04$ZzEc12dZe7JGPbrXKpe5rOw3h3.UixxifFnZseJoouMKcfUtA3UaC' // mdp == 'test'
                }).then(() => {
                    let options = {
                        url: BASE_URL+'/auth/utilfab/',
                        json: true,
                        method: 'post',
                        body: {
                            'Mail': 'test@exists.com',
                            'Mdp' : 'mossab12'
                        }
                    };
                    REQUEST(options, function (error, response, body) {
                        token = body.token;
                        done();
                    });
                });
            });

        });

        afterAll(function() {
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST
                }
            });
            COULEUR.destroy({
                where : {
                    CodeCouleur: IDTEST
                }
            });
            COULEUR.destroy({
                where : {
                    CodeCouleur: IDTEST + 1
                }
            });
            REL_VER_COUL.destroy({
                where : {
                    idRelVerCoul: IDTEST
                }
            });
        });

        it('should add a new element to table "modele"', function (done) {
            req.then(() => {
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
                    expect(parseInt(body.CodeCouleur)).toBe(IDTEST);
                    done();
                });
            });
        });

        it('should say element already exists in the table "modele"', function (done) {
            req.then(() => {
                let options = {
                    headers : {
                        'authorization': 'Bearer'+ ' '+token
                    },
                    url: BASE_URL+'/marques/modeles/versions/'+IDTEST+'/couleurs',
                    json: true,
                    method: 'post',
                    body: {
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

    /*describe('GET /marques/modeles/versions/:id/lignetarif', function () {
        var req;

        beforeAll(function() {
            req = LIGNETARIF.create({
                idLigneTarif: IDTEST,
                Type: 0,
                Code: IDTEST,
            });
        });

        afterAll(function() {
            LIGNETARIF.destroy({
                where : {
                    idLigneTarif: IDTEST
                }
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

    /*describe('GET /marques/modeles/versions/:id/lignetarif', function () {
        var req;
        var token;

        beforeAll(function(done) {
            req = LIGNETARIF.create({
                idLigneTarif: IDTEST,
                Type: 0,
                Code: IDTEST,
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
                            UTILFAB.create({
                                IdUserF: IDTEST,
                                Mail: 'test@exists.com',
                                Fabricant: IDTEST,
                                Mdp: '$2a$04$ZzEc12dZe7JGPbrXKpe5rOw3h3.UixxifFnZseJoouMKcfUtA3UaC' // mdp == 'test'
                            }).then(() => {
                                let options = {
                                    url: BASE_URL+'/auth/utilfab/',
                                    json: true,
                                    method: 'post',
                                    body: {
                                        'Mail': 'test@exists.com',
                                        'Mdp' : 'mossab12'
                                    }
                                };
                                REQUEST(options, function (error, response, body) {
                                    token = body.token;
                                    done();
                                });
                                done();
                            });
                        });
                    });
                });
            });
        });

        afterAll(function() {
            LIGNETARIF.destroy({
                where : {
                    idLigneTarif: IDTEST
                }
            });
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST
                }
            })
        });

        it('should return the element (id)', function (done) {
            req.then(() => {
                var options = {
                    headers : {
                        'authorization': 'Bearer'+' ' + token
                    },
                    url: BASE_URL + '/marques/modeles/versions/' + IDTEST + '/lignetarif',
                    body: {
                        'NomVersion': 'Testing modification'
                    },
                    json: true,
                    method: 'put'
                };
                REQUEST(options, function (error, response, body) {
                    expect(body.idLigneTarif).toBe(IDTEST);
                    done();
                });
            });
        });

        it('should return the element (id)', function (done) {
            req.then(() => {
                var options = {
                    headers : {
                        'authorization': 'Bearer'+' ' + token
                    },
                    url: BASE_URL + '/marques/modeles/versions/' + IDTEST + '/lignetarif',
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

    /*describe('GET /marques/modeles/versions/:id/lignetarif', function () {
        var req;
        var token;

        beforeAll(function(done) {
            req = LIGNETARIF.create({
                idLigneTarif: IDTEST,
                Type: 0,
                Code: IDTEST,
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
                            UTILFAB.create({
                                IdUserF: IDTEST,
                                Mail: 'test@exists.com',
                                Fabricant: IDTEST,
                                Mdp: '$2a$04$ZzEc12dZe7JGPbrXKpe5rOw3h3.UixxifFnZseJoouMKcfUtA3UaC' // mdp == 'test'
                            }).then(() => {
                                let options = {
                                    url: BASE_URL+'/auth/utilfab/',
                                    json: true,
                                    method: 'post',
                                    body: {
                                        'Mail': 'test@exists.com',
                                        'Mdp' : 'mossab12'
                                    }
                                };
                                REQUEST(options, function (error, response, body) {
                                    token = body.token;
                                    done();
                                });
                                done();
                            });
                        });
                    });
                });
            });
        });

        afterAll(function() {
            LIGNETARIF.destroy({
                where : {
                    idLigneTarif: IDTEST
                }
            });
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST
                }
            })
        });

        it('should return the element (id)', function (done) {
            req.then(() => {
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
