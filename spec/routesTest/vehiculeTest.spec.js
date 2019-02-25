const request = require('request');
const baseURL=require('../../api/config/base_url');

describe('Test des routes /vehicules',function(){
   describe('GET /vehicules',function(){
       it("retourne status 200",function(done){
            request.get(baseURL+'/vehicules',function(error,response,body) {
                expect(response.statusCode).toBe(200);
                done();
            });
       });
    });
});