const IDTEST = 99999999;
const REQUEST = require('request');
const VEHICULE = require('../../api/model/vehicule');

let vehiculeObject = {
    NumChassis: '',
    Concessionaire: '',
    CodeVersion: '',
    CodeCouleur: ''
};

describe('/vehicules route tests', function() {

    /** ************************************************************************************************************ **/

    /*describe('GET /vehicules/', function () {

        it('il devrait retourner tous les véhicules', function (done) {
            let options = {
                url: 'http://localhost:3000/vehicules/',
                json: true,
                method: 'get'
            };
            REQUEST(options, function (error, response, body) {
                let vehiculeObjects = JSON.parse(JSON.stringify(body.vehicules));
                vehiculeObjects.map((row) => {
                    expect(JSON.stringify(Object.keys(vehiculeObject).sort()) === JSON.stringify(Object.keys(row).sort())).toBeTruthy();
                });
                done();
            });
        });
    });

    /** ************************************************************************************************************ **/

   /* describe('POST /vehicules/', function () {
        var req;

        beforeAll(function() {
            req = VEHICULE.create({
                NumChassis: IDTEST + 1,
                Concessionaire: '',
                CodeVersion: '',
                CodeCouleur: ''
            });
        });

        afterAll(function() {
            VEHICULE.destroy({
                where : {
                    NumChassis: IDTEST,
                }
            });
            VEHICULE.destroy({
                where : {
                    NumChassis: IDTEST + 1,
                }
            });
        });

        it('il devrait ajouter un nouveau vehicule"', function (done) {
            let options = {
                url: 'http://localhost:3000/vehicules/',
                json: true,
                method: 'post',
                body: {
                    'NumChassis': IDTEST
                }
            };
            REQUEST(options, function (error, response, body) {
                console.log('======>' + JSON.stringify(body));
                expect(body.vehicule.NumChassis).toBe(IDTEST);
                done();
            });
        });

        it('il devrait dire que cet élément existe déjà"', function (done) {
            req.then(() => {
                let options = {
                    url: 'http://localhost:3000/vehicules/',
                    json: true,
                    method: 'post',
                    body: {
                        'NumChassis': IDTEST + 1
                    }
                };
                REQUEST(options, function (error, response, body) {
                    expect(response.statusCode).toBe(409);
                    done();
                });
            });
        });
    });*/

    /** ************************************************************************************************************ **/

});
