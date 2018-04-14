(() => {
    'use strict';

    const express = require('express');
    let router = express.Router();

    /**
     * This router, is just a hello world test.
     */
    module.exports = {
        initialize: function(opts){

            const response = require('./' + opts.spoof);

            router.get('/', (req, res) => {
                res.send(response);
            });

            return router;
        },
        destroy: function(){
        }
    };
})();
