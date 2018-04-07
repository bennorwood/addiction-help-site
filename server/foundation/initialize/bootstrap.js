/**
 * This file exports a provider pattern method accepting an object representing the server configuration.
 * This method once invoked will then return an object containing methods that will be able to initialize and bootstrap an express server.
 */
(() =>{
    //node core deps
    const http = require('http');
    const path = require('path');

    //3rd party deps
    const bodyParser = require('body-parser');
    const compression = require('compression');
    const express = require('express');
    const helmet = require('helmet');
    const morgan  = require('morgan');
    const terminus = require('@godaddy/terminus');
    
    /**
     * This object (bootstrapMethods) contains all of the framework specific bootstrapping logic. We are using express in this 
     * case, however we could theoretically switch this one object out to use a different application framework entirely without
     * affecting the high level initialization logic exposed within the module.export object.
     */
    const bootstrapMethods = {
        createApp: function(){
            return express();
        },
        asyncShutdownMethods: [],
        getTerminusOpts: function(serverConfig){
            //Clear context reference to the bootstrapMethods object
            const that = this;
            
            const onSignal = function(){
                console.log('Attempting graceful shutdown.');
                //stop accepting new requests
                
                //terminate all open connections
                let shutDownPromises = [];
                
                that.asyncShutdownMethods.forEach(function(destroyMethod){
                    shutDownPromises.push(destroyMethod(serverConfig));
                });
                
                return shutDownPromises;
            };
            
            const onShutdown = function(){
                console.log('Shutdown exited gracefully.');
                process.exit(0);
            };
            
            return {
                // cleanup options
                timeout: 2500,                   // [optional = 5000] number of milliseconds before forcefull exiting
                signal: 'SIGINT',
                onSignal: onSignal,                        // [optional] cleanup function, returning a promise (used to be onSigterm)
                onShutdown: onShutdown                      // [optional] called right before exiting
            };
        },
        getMode: function(serverConfiguration){
            return serverConfiguration.get('mode');
        },
        initCompression: function(expressApp){
            expressApp.use(compression());
        },
        initBodyParser: function(expressApp){
            expressApp.use(bodyParser.json());
        },
        initHelmet: function(expressApp){
            expressApp.use(helmet());
        },
        initLogging: function(expressApp, serverConfig){
            //This is just request level logging
            let format = serverConfig.get('logging:'+this.getMode(serverConfig)+':format') || 'tiny';
            expressApp.use(morgan(format));
        },
        initMiddleware: function(appConfig, serverConfig, entities, entityDir, entityType){
            let promises = [],
                entityMetadata = null;
            for(let entityKey in entities) {
                console.log('Initializing '+entityType+': ' + entityKey);
                entityMetadata = entities[entityKey];
                
                //Expose the appConfig and serverConfig object to the available options for the entity
                entityMetadata.opts.appConfig = appConfig;
                entityMetadata.opts.serverConfig = serverConfig;
                
                if(entityMetadata.enabled === true) {
                    let entityModule = require(path.join(entityDir, entityMetadata.path));
                    
                    //Note: The initialize method for all middleware needs to return a thenable object.
                    promises.push(entityModule.initialize(entityMetadata.opts));
                    
                    //push destruction method onto entityModule list
                    this.asyncShutdownMethods.push(entityModule.destroy);
                    
                } else {
                    console.log('Skipping disabled '+entityType+' for ' + entityKey);
                }
            }
            
            return Promise.all(promises);
        },
        initRoutes: async function(expressApp, serverConfig, entities, entityDir){
            let entityMetadata = null;
            
            //I need the key here from the config since it represents the anchor point for the controller
            //  example: <app>:<port>/api/hello-world
            for(let entityKey in entities) {
                console.log('Initializing Router: ' + entityKey);
                entityMetadata = entities[entityKey];
                
                //Expose the serverConfig object to the available options for the entity
                entityMetadata.opts.serverConfig = serverConfig;
                
                if(entityMetadata.enabled === true) {
                    let entityModule = require(path.join(entityDir, entityMetadata.router));
                    
                    //Note: the initialize method is synchronous
                    expressApp.use('/api' + entityKey, entityModule.initialize(entityMetadata.opts));
                    
                    //push destruction method onto entityModule list
                    this.asyncShutdownMethods.push(entityModule.destroy);
                    
                } else {
                    console.log('Skipping disabled router for ' + entityKey);
                }
            }
        },
        initStaticFiles: function(app, serverConfiguration){
            const staticDirs = serverConfiguration.get('staticDirs');
            
            //Configure express to serve static files such as js files, css, images.
            for(let i = 0; i < staticDirs.length; i++) {
                console.log('Serving static dir: ' + staticDirs[i]);
                app.use(express.static(staticDirs[i]));
            }
        },
        finalize: function(appConfig, serverConfig){
            //Clear context reference to the bootstrapMethods object
            const that = this;
            return new Promise((resolve) => {
                
                appConfig.server = appConfig.app.listen(appConfig.port, function () {
                    terminus(appConfig.server, that.getTerminusOpts(serverConfig));
                    
                    console.log('Example app listening at port %s', appConfig.server.address().port);
                    resolve(appConfig.server);
                });
            });
        }
    };
    
    /**
     * Note: Regarding the serverConfiguration parameter the assumptions made here are the following:
     *       - that there is a 'get' and a 'set' method available to pull key value pairs from
     *         the object (enabling this bootstrapping to be 'somewhat' agnostic and decoupled from a config module, nconf in this case)
     */
    module.exports = function(serverConfiguration){
        
        return {
            /**
             * This method will return the configured mode for the app (Development, Staging etc).
             */
            getMode: function(){
                return bootstrapMethods.getMode(serverConfiguration);
            },
            /**
             * This method will start the application.
             */
            initialize: function(){
                let appInitializationPromises = [];
                
                /**
                 * May need to initialize separate apps in the future(http server and https server both listening)
                 */
                let appConfigs = [
                    {
                        enabled: true,
                        name: 'http',
                        app: bootstrapMethods.createApp(),
                        server: http,
                        port: process.env.PORT || serverConfiguration.get('port')
                    },
                    {
                        enabled: false,
                        name: 'https'
                    }
                ];
                
                /**
                 * Prepare/Boot each express app
                 */
                appConfigs.forEach((appConfig) => {
                    if(appConfig.enabled === true) {
                        //Begin initializing middleware
                        bootstrapMethods.initLogging(appConfig.app, serverConfiguration); //should happen first.
                        bootstrapMethods.initStaticFiles(appConfig.app, serverConfiguration);
                        bootstrapMethods.initBodyParser(appConfig.app);
                        bootstrapMethods.initCompression(appConfig.app);
                        bootstrapMethods.initHelmet(appConfig.app);
                        bootstrapMethods.initRoutes(appConfig.app, serverConfiguration, serverConfiguration.get('routers'), serverConfiguration.get('paths:routesDir'));
                        
                        //prepare async initialization
                        let asyncInitializations = [];
                        
                        asyncInitializations.push( bootstrapMethods.initMiddleware(appConfig, serverConfiguration, serverConfiguration.get('services'), serverConfiguration.get('paths:serviceDir'), 'service') );
                        appInitializationPromises.push(Promise.all(asyncInitializations).then(() => {
                            return bootstrapMethods.finalize(appConfig, serverConfiguration);
                        }));	
                    }
                });
              
                //once all apps are fully initialized, return the app configs list
                return Promise.all(appInitializationPromises).then( () => { 
                    console.log('Application successfully initialized in %s mode', this.getMode());
                    return appConfigs; 
                });
            }
        };
    };
})();