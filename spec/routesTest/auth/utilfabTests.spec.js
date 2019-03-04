const IDTEST = 99999999;
const BASE_URL = require('../../../api/config/base_url');
const REQUEST = require('request');
const MARQUE = require('../../../api/model/marque');
const UTILFAB = require('../../../api/model/utilfab');

describe('TESTS:/auth/utilfab | ', function() {

    /** ************************************************************************************************************ **/

    describe('POST /auth/utilfab/', function () {

        var req;

        beforeAll(function(done) {
            req = MARQUE.create({
                CodeMarque: IDTEST,
                NomMarque: "Testing Marque"
            }).then(() => {
                UTILFAB.create({
                    IdUserF: IDTEST,
                    Mail: 'test@exists.com',
                    Nom: 'test',
                    Prenom: 'test',
                    Mdp: '$2a$04$ZzEc12dZe7JGPbrXKpe5rOw3h3.UixxifFnZseJoouMKcfUtA3UaC', // mdp == 'mossab12'
                    NumTel: '0000000000',
                    Fabricant: IDTEST
                }).then(()=>{
                    done();
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

        it('should pass the authentification', function (done) {
            req.then(() => {
                let options = {
                    url: BASE_URL + '/auth/utilfab/',
                    json: true,
                    method: 'post',
                    body: {
                        'Mail': 'test@exists.com',
                        'Mdp' : 'mossab12'
                    }
                };
                REQUEST(options, function (error, response, body) {
                    expect(response.statusCode).toBe(200);
                    done();
                });
            });
        });

        it('shouldn\'t pass the authentification', function (done) {
            req.then(() => {
                let options = {
                    url: BASE_URL + '/auth/utilfab/',
                    json: true,
                    method: 'post',
                    body: {
                        'Mail': 'test@exists.com',
                        'Mdp' : 'MdpIncorrect'
                    }
                };
                REQUEST(options, function (error, response, body) {
                    expect(response.statusCode).toBe(401);
                    done();
                });
            });
        });

        it('shouldn\'t pass the authentification', function (done) {
            req.then(() => {
                let options = {
                    url: BASE_URL + '/auth/utilfab/',
                    json: true,
                    method: 'post',
                    body: {
                        'Mail': 'EmailIncorrect@exists.com',
                        'Mdp' : 'MdpIncorrect'
                    }
                };
                REQUEST(options, function (error, response, body) {
                    expect(response.statusCode).toBe(401);
                    done();
                });
            });
        });

    });

    /** ************************************************************************************************************ **/

});
