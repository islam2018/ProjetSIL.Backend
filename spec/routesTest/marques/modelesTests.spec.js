const IDTEST = 99999999;
const BASE_URL = require('../../../api/config/base_url');
const REQUEST = require('request');
const MARQUE = require('../../../api/model/marque');
const MODELE = require('../../../api/model/modele');
const VERSION = require('../../../api/model/version');
const UTILFAB = require('../../../api/model/utilfab');

const jwt = require('jsonwebtoken');
const JWT_CONFIG=require('../../../api/config/secret').JWT_CONFIG;

let versionObject = {
    CodeVersion: '',
    CodeModele: '',
    NomVersion: ''
};


describe('TESTS:/marques/modeles | ', function() {

    /** ************************************************************************************************************ **/

    describe('GET /marques/modeles/:id', function () {
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
                    done();
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
                    url: BASE_URL + '/marques/modeles/' + IDTEST,
                    json: true,
                    method: 'get'
                };
                REQUEST(options, function (error, response, body) {
                    expect(body.CodeModele).toBe(IDTEST);
                    done();
                });
            });
        });
    });

    /** ************************************************************************************************************ **/

    describe('PUT /marques/modeles/:id', function () {
        var req;
        var token;

        beforeAll(function(done) {
            token = jwt.sign({Id:IDTEST,mail:'test@exists.com'},JWT_CONFIG.UTIL_FAB_KEY,{expiresIn:JWT_CONFIG.expiresIn},);
            req = MARQUE.create({
                CodeMarque: IDTEST,
                NomMarque: "Testing Marque"
            }).then(() => {
                MODELE.create({
                    CodeModele: IDTEST,
                    CodeMarque: IDTEST,
                    NomModele: 'Testing Modele '
                }).then(() => {
                    done();
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
                var options = {
                    headers : {
                        'authorization': 'Bearer'+ ' '+token
                    },
                    url: BASE_URL + '/marques/modeles/' + IDTEST,
                    body: {
                        'NomModele': 'Testing modification'
                    },
                    json: true,
                    method: 'put'
                };
                REQUEST(options, function (error, response, body) {
                    expect(body.NomModele).toBe('Testing modification');
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
                    url: BASE_URL+'/marques/modeles/DoesNotExist',
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

    describe('DELETE /marques/modeles/:id', function () {
        var req;
        var token;

        beforeAll(function(done) {
            token = jwt.sign({Id:IDTEST,mail:'test@exists.com'},JWT_CONFIG.UTIL_FAB_KEY,{expiresIn:JWT_CONFIG.expiresIn},);
            req = MARQUE.create({
                CodeMarque: IDTEST,
                NomMarque: "Testing Marque"
            }).then(() => {
                MODELE.create({
                    CodeModele: IDTEST,
                    CodeMarque: IDTEST,
                    NomModele: 'Testing Modele '
                }).then(() => {
                    done();
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
                var options = {
                    headers : {
                        'authorization': 'Bearer'+ ' '+token
                    },
                    url: BASE_URL+'/marques/modeles/' + IDTEST,
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

    describe('GET /marques/modeles/:id/versions', function () {
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
                    done();
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

        it('should return all the "versions" of marque (id) ', function (done) {
            let options = {
                url: BASE_URL+'/marques/modeles/'+IDTEST+'/versions',
                json: true,
                method: 'get'
            };
            REQUEST(options, function (error, response, body) {
                let versionObjects = JSON.parse(JSON.stringify(body));
                versionObjects.map((row) => {
                    expect(JSON.stringify(Object.keys(versionObject).sort()) === JSON.stringify(Object.keys(row).sort())).toBeTruthy();
                });
                done();
            });
        });
    });

    /** ************************************************************************************************************ **/

    describe('POST /marques/modeles/:id/versions', function () {
        var req;
        var token;

        beforeAll(function(done) {
            token = jwt.sign({Id:IDTEST,mail:'test@exists.com'},JWT_CONFIG.UTIL_FAB_KEY,{expiresIn:JWT_CONFIG.expiresIn},);
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
                        NomVersion: 'Testing post existed'
                    });
                });
            }).then(() => {
                done();
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

        it('should add a new element to table "version"', function (done) {
            req.then(() => {
                let options = {
                    headers : {
                        'authorization': 'Bearer'+ ' '+token
                    },
                    url: BASE_URL+'/marques/modeles/' + IDTEST + '/versions',
                    json: true,
                    method: 'post',
                    body: {
                        'CodeVersion': IDTEST+1,
                        'CodeModele': IDTEST,
                        'NomVersion': 'Testing post'
                    }
                };
                REQUEST(options, function (error, response, body) {
                    expect(parseInt(body.CodeVersion)).toBe(IDTEST+1);
                    done();
                });
            });
        });

        it('should say element already exists in the table "version"', function (done) {
            req.then(() => {
                let options = {
                    headers : {
                        'authorization': 'Bearer'+ ' '+token
                    },
                    url: BASE_URL+'/marques/modeles/'+IDTEST+'/versions',
                    json: true,
                    method: 'post',
                    body: {
                        'CodeVersion': IDTEST,
                        'CodeModele': IDTEST,
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

});
