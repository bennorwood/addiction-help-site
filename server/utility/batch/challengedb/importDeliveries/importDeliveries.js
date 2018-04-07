(function(){
    'use strict';

    const path = require('path');
    let serverConfiguration = null;
    
    module.exports = function(config){
        serverConfiguration = config;
        
        const deliveriesToImport = require( path.join(__dirname, 'deliveries.json') );
        const deliveryModelPath = path.join(serverConfiguration.get('paths:serverDir'), 'schemas', 'delivery.model');
        const Delivery = require(deliveryModelPath);
        
        const importData = function(){
            let promises = [];

            for(let index=0; index < deliveriesToImport.length; index++){
                let rawDeliveryData = deliveriesToImport[index];
                               
                let deliveryPersistenceObject = new Delivery(rawDeliveryData);

                promises.push(deliveryPersistenceObject.save());
            }

            return Promise.all(promises);
        };

        return {
            runBatch: function(){
                return importData();
            },
            preProcess: function(){
                console.log('importDeliveries.js: Removing previous documents.');
                return Delivery.remove({});
            }
        };
    };
})();
