/**
 * The purpose of this file is to test the server initialization process.
 */

(() => {
    //core packages
    const path    = require('path');
    
    //3rd party
    const expect  = require('expect.js');
    const request = require('supertest');

    describe('The Application Server', function() {
        let _appConfigs = null;
        
        /**
         * Boot the server(s)
         *
         * Note: Ideally I would startup the server for each spec test(beforeEach),
         * but I'd have to cache bust the require to force start the server,
         * or test the bootstrap.js file directly.
         */
        before(function (done) {
            console.log('Attempting to boot server.');
            const bootstrapping = require( path.join(__dirname, '..', '..', 'server') );
            
            bootstrapping.then(function(appConfigs){
                _appConfigs = appConfigs;
                console.log('\n\n');
                done();
            });
        });
        
        /**
         * Shutdown the server(s).
         */
        after(function (done) {
            _appConfigs.forEach(function(config){
                if(config.enabled === true) {
                    config.server.close(done);
                }
            });
        });
        
        it('404 on invalid paths', function(done) {
            _appConfigs.forEach(function(config){
                if(config.enabled === true) {
                    request(config.server)
                        .get('/path/to/nowhere')
                        .expect(404, done);
                }
            });
        });
        
        it('responds to /', function(done) {
            _appConfigs.forEach(function(config){
                if(config.enabled === true) {
                    request(config.server)
                        .get('/')
                        .expect(200, done);
                }
            });
            
        });
    });
})();