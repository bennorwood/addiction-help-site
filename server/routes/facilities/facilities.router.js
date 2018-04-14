(() => {
    'use strict';
    const express = require('express');
    const rp = require('request-promise-native');

    let router = express.Router();
    
    /**
     * This router, is just a hello world test.
     */
    module.exports = {
        initialize: function(opts){

            router.get('/', (req, res) => {

                var options = {
                    uri: 'http://hhs-opioid-codeathon.data.socrata.com/resource/fw4h-unyc.json',
                    qs: {
                        city: 'Lafayette'  // -> uri + '?city=Lafayette'
                    },
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
                        // API call failed...
                    });
            });

            return router;
        },
        destroy: function(){
        }
    };


})();