(() => {
    'use strict';
    const express = require('express');
    const rp = require('request-promise-native');

    let router = express.Router();
    
    /**
     * This router, is just a hello world test.
     */
    module.exports = {
        initialize: function(){

            router.get('/', (req, res) => {

                var options = {
                    uri: 'http://hhs-opioid-codeathon.data.socrata.com/resource/vcp5-amce.json',
                    qs: req.query,
                    headers: {
                        'User-Agent': 'Request-Promise'
                    },
                    json: true // Automatically parses the JSON string in the response
                };
         
                rp(options)
                    .then(function (response) {
                        res.send(response);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });

            return router;
        },
        destroy: function(){
        }
    };


})();