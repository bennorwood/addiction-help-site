/**
 * The purpose of the following tests are to test the loading of configuration.
 */

(() => {
    const expect = require('expect.js');
    const path   = require('path');
    const nconfLoader = require( path.join(__dirname, '..', '..', '..', 'foundation', 'config', 'nconfLoader') );

    describe('Nconf Configuration Loader', function() {
        
        it('should load the default configuration', function(){
            let config = nconfLoader();
            
            //Enforce all of the default configuration here.
            expect(config.get('port')).to.be(7000);
            //etc..
        });
        
        it('should allow environment variable overrides.', function(){
            process.env.port = '7001';
            let config = nconfLoader();
            
            expect(config.get('port')).to.be('7001');
        });
        
        
        
    });
})();