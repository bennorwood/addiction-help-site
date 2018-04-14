(() => {
    'use strict';
    const express = require('express');
    let router = express.Router();

    /**
     * This router, is just a hello world test.
     */
    module.exports = {
        initialize: function(opts){
            //Let's initialize potential api tokens/secrets for the browser
            for(let key in opts.keyNames){
                opts.browserConfiguration.keys[key] =  opts.serverConfig.get(opts.keyNames[key]);
            }

            router.get('/', (req, res) => {
                res.send(opts.browserConfiguration);
            });

            return router;
        },
        destroy: function(){
        }
    };
})();
