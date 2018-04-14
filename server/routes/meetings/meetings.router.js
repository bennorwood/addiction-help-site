(() => {
    'use strict';

    const express = require('express');
    let router = express.Router();

    /**
     * This router, is just a hello world test.
     */
    module.exports = {
        initialize: function(opts){
            
            router.get('/', (req, res) => {
                res.send(require('./' + opts.spoof));
            });

            return router;
        },
        destroy: function(){
        }
    };
})();
