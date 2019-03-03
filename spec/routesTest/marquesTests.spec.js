const IDTEST = 99999999;
const BASE_URL = require('../../api/config/base_url');
const REQUEST = require('request');
const MARQUE = require('../../api/model/marque');
const MODELE = require('../../api/model/modele');
const UTILFAB = require('../../api/model/utilfab');

let marqueObject = {
    CodeMarque: '',
    NomMarque: ''
};

let modeleObject = {
    CodeModele: '',
    CodeMarque: '',
    NomModele: ''
};

let utilfabObject = {
    IdUserF: '',
    Mail: '',
    Nom: '',
    Prenom: '',
    Mdp: '',
    Numtel: '',
    Fabricant: ''
};

describe('TESTS:/marques | ', function() {

    /** ************************************************************************************************************ **/

    describe('GET /marques/', function () {

        it('should return all the "marques"', function (done) {
            let options = {
                url: BASE_URL+'/marques/',
                json: true,
                method: 'get'
            };
            REQUEST(options, function (error, response, body) {
                let marqueObjects = JSON.parse(JSON.stringify(body));
                marqueObjects.map((row) => {
                    expect(JSON.stringify(Object.keys(marqueObject).sort()) === JSON.stringify(Object.keys(row).sort())).toBeTruthy();
                });
                done();
            });
        });
    });

    /** ************************************************************************************************************ **/

    describe('POST /marques/', function () {
        var req;
        var token;

        beforeAll(function(done) {
            req = MARQUE.create({
                CodeMarque: IDTEST,
                NomMarque: 'Testing post existed'
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
                    NomMarque: 'Testing post'
                }
            });
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST,
                    NomMarque: 'Testing post existed'
                }
            });
        });

        it('should add a new element to table "marque"', function (done) {
            req.then(() => {
                let options = {
                    headers: {
                        'authorization': 'Bearer' + ' ' + token
                    },
                    url: BASE_URL+'/marques/',
                    json: true,
                    method: 'post',
                    body: {
                        'NomMarque': 'Testing post'
                    }
                };
                REQUEST(options, function (error, response, body) {
                    expect(body.NomMarque).toBe('Testing post');
                    done();
                });
            });
        });

        it('should say element already exists in the table "marque"', function (done) {
            req.then(() => {
                let options = {
                    headers : {
                        'authorization': 'Bearer'+ ' '+token
                    },
                    url: BASE_URL+'/marques/',
                    json: true,
                    method: 'post',
                    body: {
                        'NomMarque': 'Testing post existed'
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

    describe('GET /marques/:id', function () {
        var req;

        beforeAll(function() {
            req = MARQUE.create({
                CodeMarque: IDTEST,
                NomMarque: "Testing Marque"
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
                    url: BASE_URL+'/marques/' + IDTEST,
                    json: true,
                    method: 'get'
                };
                REQUEST(options, function (error, response, body) {
                    expect(body.CodeMarque).toBe(IDTEST);
                    done();
                });
            });
        });
    });

    /** ************************************************************************************************************ **/

    describe('PUT /marques/:id', function () {
        var req;
        var token;

        beforeAll(function(done) {
            req = MARQUE.create({
                CodeMarque: IDTEST,
                NomMarque: "Testing Marque"
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
        });

        it('should change the element (id)', function (done) {
            req.then(() => {
                var options = {
                    headers : {
                        'authorization': 'Bearer'+ ' '+token
                    },
                    url: BASE_URL+'/marques/' + IDTEST,
                    body: {
                        'NomMarque': 'Testing modification'
                    },
                    json: true,
                    method: 'put'
                };
                REQUEST(options, function (error, response, body) {
                    expect(body.NomMarque).toBe('Testing modification');
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
                    url: BASE_URL+'/marques/DoesNotExist',
                    body: {
                        'NomMarque': 'Testing modification inexisting'
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

    describe('DELETE /marques/:id', function () {
        var req;
        var token;

        beforeAll(function(done) {
            req = MARQUE.create({
                CodeMarque: IDTEST,
                NomMarque: "Testing Marque"
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


        it('should delete the element (id)', function (done) {
            req.then(() => {
                var options = {
                    headers : {
                        'authorization': 'Bearer'+ ' '+token
                    },
                    url: BASE_URL+'/marques/' + IDTEST,
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

    describe('GET /marques/:id/modeles', function () {
        var req;

        beforeAll(function() {
            req = MARQUE.create({
                CodeMarque: IDTEST,
                NomMarque: "Testing Marque"
            });
        });

        afterAll(function() {
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST
                }
            });
        });

        it('should return all the "marques"', function (done) {
            let options = {
                url: BASE_URL+'/marques/'+IDTEST+'/modeles',
                json: true,
                method: 'get'
            };
            REQUEST(options, function (error, response, body) {
                let modeleObjects = JSON.parse(JSON.stringify(body));
                modeleObjects.map((row) => {
                    expect(JSON.stringify(Object.keys(modeleObject).sort()) === JSON.stringify(Object.keys(row).sort())).toBeTruthy();
                });
                done();
            });
        });
    });

    /** ************************************************************************************************************ **/

    describe('POST /marques/:id/modeles', function () {
        var req;

        beforeAll(function(done) {
            req = MARQUE.create({
                CodeMarque: IDTEST,
                NomMarque: "Testing Marque"
            }).then(() => {
                MODELE.create({
                    CodeModele: IDTEST + 1,
                    CodeMarque: IDTEST,
                    NomModele: 'Testing post existed'
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
        });

        it('should add a new element to table "modele"', function (done) {
            req.then(() => {
                let options = {
                    headers : {
                        'authorization': 'Bearer'+ ' '+token
                    },
                    url: BASE_URL+'/marques/' + IDTEST + '/modeles',
                    json: true,
                    method: 'post',
                    body: {
                        'CodeMarque': IDTEST,
                        'NomModele': 'Testing post'
                    }
                };
                REQUEST(options, function (error, response, body) {
                    expect(parseInt(body.CodeMarque)).toBe(IDTEST);
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
                    url: BASE_URL+'/marques/'+IDTEST+'/modeles',
                    json: true,
                    method: 'post',
                    body: {
                        'NomModele': 'Testing post existed'
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

    describe('GET /marques/:id/utilfab', function () {
        var req;

        beforeAll(function() {
            req = MARQUE.create({
                CodeMarque: IDTEST,
                NomMarque: "Testing Marque"
            });
        });

        afterAll(function() {
            MARQUE.destroy({
                where : {
                    CodeMarque: IDTEST
                }
            });
        });

        it('should return all the "marques"', function (done) {
            let options = {
                url: BASE_URL+'/marques/'+IDTEST+'/utilfab',
                json: true,
                method: 'get'
            };
            REQUEST(options, function (error, response, body) {
                let utilfabObjects = JSON.parse(JSON.stringify(body));
                utilfabObjects.map((row) => {
                    expect(JSON.stringify(Object.keys(utilfabObject).sort()) === JSON.stringify(Object.keys(row).sort())).toBeTruthy();
                });
                done();
            });
        });
    });

    /** ************************************************************************************************************ **/

    describe('POST /marques/:id/utilfab', function () {
        var req;

        beforeAll(function() {
            req = MARQUE.create({
                CodeMarque: IDTEST,
                NomMarque: "Testing Marque"
            }).then(() => {
                UTILFAB.create({
                    IdUserF: IDTEST + 1,
                    Mail: 'test@exists.com',
                    Fabricant: IDTEST,
                });
            });

        });

        afterAll(function() {
            MARQUE.destroy({
                where : {
                    NomMarque: "Testing Marque"
                }
            });
        });

        it('should add a new element to table "utilisateurFabricant"', function (done) {
            req.then(() => {
                let options = {
                    url: BASE_URL+'/marques/' + IDTEST + '/utilfab',
                    json: true,
                    method: 'post',
                    body: {
                        'Mail': 'test@doesnt_exists.com',
                        'Fabricant': IDTEST,
                    }
                };
                REQUEST(options, function (error, response, body) {
                    expect(parseInt(body.Fabricant)).toBe(IDTEST);
                    done();
                });
            });
        });

        it('should say element already exists in the table "utilisateurFabricant"', function (done) {
            req.then(() => {
                let options = {
                    url: BASE_URL+'/marques/'+IDTEST+'/utilfab',
                    json: true,
                    method: 'post',
                    body: {
                        'Mail': 'test@exists.com',
                        'Fabricant': IDTEST,
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


});
