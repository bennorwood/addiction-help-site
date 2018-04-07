/**
 * This file provides a single point of access into the google maps api tool that is being used.
 */
(() => {
    let googleMapsClient = null;
    
    /**
     * Want to be a good steward of the service usage limits and store relevant request response data
     * to avoid superfluous requests. I came dangerously close to the 24 hour 2500 request/element usage limit initially.
     *
     * Note: Development mode will actually save the needed durations on disk when shutting down, whereas prod mode will only
     * keep track of request made since the server has been alive.
     */
    let requestMemoization = {};
    const REQUEST_HISTORY_FILENAME = require('path').join( __dirname, 'requestMemoization.json');
    
    /**
     * Turns the Location into a string 'Lat,Long' that is acceptable for this service.
     */
    const _createGeoPointString = function(location){
        return [location.latitude, location.longitude].join(',');
    };
    
    /**
     * We are creating a unique string based on the origin and destination points. ':' is the delimiter.
     */
    const createRequestKey = function(origin, destination){
        return [_createGeoPointString(origin), _createGeoPointString(destination)].join(':');
    };
    
    module.exports = {
        initialize: function(opts){
            const apiKeyEnvVarName = opts.serverConfig.get('services:google-maps-api-client:opts:key');
            
            googleMapsClient = require('@google/maps').createClient({
                key: opts.serverConfig.get(apiKeyEnvVarName),
                Promise: Promise //Sets up the promise constructor for this service
            });
            
            //load from disk
            if(opts.serverConfig.get('mode') === 'development' && require('fs').existsSync(REQUEST_HISTORY_FILENAME)){
                requestMemoization = require(REQUEST_HISTORY_FILENAME);
            }
            
            //return a self reference for convenience
            return this;
        },
        schedulerHelperGetTravelTime: async function(origin, destination){
            const uniqueKey = createRequestKey(origin, destination);
            
            if(!requestMemoization[uniqueKey]){
                const requestObject = {
                    origins: [_createGeoPointString(origin)],
                    destinations:[_createGeoPointString(destination)],
                    units: 'imperial'
                };
                
                try {
                    let response = await googleMapsClient.distanceMatrix(requestObject).asPromise();
                    
                    //can browse response structure here: https://developers.google.com/maps/documentation/distance-matrix/
                    requestMemoization[uniqueKey] = response.json.rows[0].elements[0].duration.value;
                } catch(err){
                    console.log(err);
                }
            }
            
            return requestMemoization[uniqueKey];
        },
        createGeoPointString: _createGeoPointString,
        destroy: function(serverConfig){
            if(serverConfig.get('mode') === 'development'){
                //Let's just go ahead and save this to the file system for some extended benefits
                const fs = require('fs');
                fs.writeFileSync(REQUEST_HISTORY_FILENAME, JSON.stringify(requestMemoization) );
            }
        }
    };

})();