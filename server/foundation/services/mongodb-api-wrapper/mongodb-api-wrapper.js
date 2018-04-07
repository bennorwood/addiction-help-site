/**
 * This module exists in order to wrap the mongoose api third party module
 * to provide promise based communication with MongoDB, avoiding callbacks.
 */
(() => {
    const mongoose = require('mongoose');
    
    const disconnect = function(){
        console.log('Mongo Api Wrapper: Connection closing.');
        return mongoose.disconnect();
    };
    
    const connect = function(opts){
        const dbConf = opts.mongo.databases.challenge;
        const dbUrlWithoutPass = dbConf.protocol + '://'+ opts.serverConfig.get(dbConf.username_key) + ':' + '<********>'
                                    + '@' + dbConf.connectionString + '/' + dbConf.name + dbConf.queryString;
        const dbUrl            = dbConf.protocol + '://'+ opts.serverConfig.get(dbConf.username_key) + ':' + encodeURIComponent(opts.serverConfig.get(dbConf.password_key))
                                    + '@' + dbConf.connectionString + '/' + dbConf.name + dbConf.queryString;
        
        console.log('Mongo Api Wrapper connecting to: ' + dbUrlWithoutPass);
        return mongoose.connect(dbUrl, dbConf.connectionOptions);
    };
    
    module.exports = {
        initialize: function(opts){
            
            //Note: I want to assume here that we will only open one database connection
            //Would have to manage multiple connections otherwise: http://mongoosejs.com/docs/connections.html#multiple_connections
            return connect(opts);
        },
        destroy: function(){
            return disconnect();
        }
    };

})();




