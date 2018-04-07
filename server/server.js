(()=> {
    const path = require('path');

    /**
     * This method provides any logging output during a startup error state.
     */
    const topLevelPromiseRejectionLogger = function(error){
        console.error(error);
    };
    
    //Load and display server config
    const resolvedLayeredConfig = require(path.join(__dirname, 'foundation', 'config', 'nconfLoader'))();
    
    //Initialize Server
    module.exports = require(path.join(__dirname, 'foundation', 'initialize', 'bootstrap'))(resolvedLayeredConfig).initialize().catch(topLevelPromiseRejectionLogger);
})();