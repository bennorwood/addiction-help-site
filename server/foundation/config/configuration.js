(() => {
    const path = require('path');
    /**
     * This is the main config file for the app.
     */
    module.exports = function(){
        return {
            appName: 'joie-de-vivre',
            port: 7000,
            mode: 'development',
            staticDirs: [
                path.resolve(__dirname, '..', '..', '..', 'ui', 'dist')
            ],
            logging: {
                /**
                 * Using morgan module for logging
                 * https://github.com/expressjs/morgan#predefined-formats
                 */

                development: {
                    format: 'dev'
                },
                production: {
                    format: 'combined'
                }
            },
            paths: {
                configDir: __dirname,
                serviceDir: path.resolve(__dirname, '..', 'services'),
                serverDir: path.resolve(__dirname, '..', '..'),
                root: path.resolve(__dirname, '..', '..','..'),
                routesDir: path.resolve(__dirname, '..', '..', 'routes')
            },
            /**
             * Routers are Express based REST endpoints: https://expressjs.com/en/4x/api.html#router
             * Routers are initialized in express-init.js ~L-59
             */
            routers: {
                '/facilities': {
                    enabled: true,
                    router: 'facilities/facilities.router.js',
                    opts: {
                        facilitiesApi: 'http://hhs-opioid-codeathon.data.socrata.com/resource/fw4h-unyc.json'
                    }
                },
                '/prescriptions': {
                    enabled: true,
                    router: 'prescriptions/prescriptions.router.js',
                    opts: {
                        prescriptionsApi: 'https://hhs-opioid-codeathon.data.socrata.com/resource/vcp5-amce.json?'
                    }
                },
                '/server-config': {
                    enabled: true,
                    router: 'server-config/server.config.router',
                    opts: {
                        keyNames: {
                            googleMapsKey: 'GOOGLE_API_KEY'
                        },
                        browserConfiguration: {
                            services: {
                                /**
                                 * NOTE: We can very easily break a part the UI portion of this application into its own microservice
                                 * if we are supplying configuration this way. I chose to keep most of this application together for simplicity.
                                 */
                                'driversvcs': '/api/drivers',
                                'deliverysvcs': '/api/deliveries'
                            },
                            keys: {
                                googleMapsKey: null
                            }
                        }
                    }
                },
                '/meetings': {
                    enabled: true,
                    router: 'meetings/meetings.router',
                    opts: {
                        spoof: 'meetings.data.json'
                    }
                }
            },
            services: {
                /**
                 * Using Mongoose: http://mongoosejs.com/docs/guide.html
                 */
                'mongodb-api-wrapper':{
                    enabled: false,
                    path: 'mongodb-api-wrapper/mongodb-api-wrapper',
                    opts: {
                        mongo: {
                            databases: {
                                'challenge': {
                                    name: 'test',
                                    connectionString: 'challenge-stg-shard-00-00-loxav.mongodb.net:27017,challenge-stg-shard-00-01-loxav.mongodb.net:27017,challenge-stg-shard-00-02-loxav.mongodb.net:27017',
                                    protocol: 'mongodb',
                                    queryString: '?ssl=true&replicaSet=challenge-stg-shard-0&authSource=admin',
                                    username_key: 'mongo_user',
                                    password_key: 'mongo_password',
                                    connectionOptions: {
                                        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
                                        reconnectInterval: 500, // Reconnect every 500ms
                                        poolSize: 5, // Maintain up to 10 socket connections
                                        // If not connected, return errors immediately rather than waiting for reconnect
                                        bufferMaxEntries: 0,
                                        keepAlive: 120
                                    }
                                }
                            }
                        }
                    }
                },
                'google-maps-api-client': {
                    enabled: false,
                    path: 'google-maps-api-client/google.maps.api.client',
                    opts: {
                        //this property will be used to with requests to the google maps distance matrix service
                        key: 'GOOGLE_API_KEY'
                    }
                }
            }
        };
    };
})();
