(function(){
    'use strict';
    
    /**
     * This script is used to import dayZero data into a target db or batch process data within db.
     */
    //arguments, slice off first two 'node' and 'import'
    let args = process.argv.slice(2);

    if(!args[0] || !args[1] || args[0] === 'help' || args[0] === '?') {
        console.info('********************************************************************************************************');
        console.info('*************************************Data Import/Process Help*******************************************');
        console.info('********************************************************************************************************');
        console.info('*  DEVS: Adding a new data processing script                                                           *');
        console.info('*      1) Create a new folder in the dayZero/<database> folder with a name that describes the process. *');
        console.info('*      2) Add a .js file in the folder named the same as folder.                                       *');
        console.info('*      3) Implement exactly like server/utility/dayZero/challengedb/importRefData/importRefData.js     *');
        console.info('*         3a) Export function that accepts an object containing offline configuration service object.  *');
        console.info('*         3b) From that method, return an object containing a "preProcess" and "runBatch" method.      *');
        console.info('*         3c) preProcess and runBatch method must return a "thenable" promise.                         *');
        console.info('*                                                                                                      *');
        console.info('*  node batch usage                                                                                    *');
        console.info('*      node batch <databse name> <fileName>                                                            *');
        console.info('*                                                                                                      *');
        console.info('*          Example:                                                                                    *');
        console.info('*          node batch challengedb importDrivers                                                        *');
        console.info('********************************************************************************************************');
        console.info('********************************************************************************************************');
        process.exit(0);
    }

    const databaseName = args[0];
    const targetImport = args[1];        
    const path = require('path');
    
    //load config
    const offlineConfig = require( path.join(__dirname, '..', '..', 'foundation', 'config', 'nconfLoader') )();
    
    //Get Service initializer
    const mongoApiWrapper = require(path.join( offlineConfig.get('paths:serviceDir'), 'mongodb-api-wrapper', 'mongodb-api-wrapper') );
    
    //Get data importer
    const importUtility = require(path.join(__dirname, databaseName, targetImport, targetImport))(offlineConfig);

    let dbConfig = offlineConfig.get('services:mongodb-api-wrapper:opts');
    dbConfig.serverConfig = offlineConfig;
    
    
    /**
     * Using async await here for finally clause
     */
    const fireImport = async () => {
        try{
            await mongoApiWrapper.initialize(dbConfig);
            await importUtility.preProcess();
            await importUtility.runBatch();
            
            console.log('Batch process: ' + databaseName + ' - ' + targetImport + ' completed successfully.');
        } catch(error){
            console.log('Batch process: ' + databaseName + ' - ' + targetImport + ' something went wrong.'); 
            console.log(error); 
        } finally {
            mongoApiWrapper.destroy();
        }
    };

    fireImport();
    
})();


