(function(){

    'use strict';

    module.exports = function(app, angular) {
        //module config
        app.config(['$stateProvider', function($stateProvider) {

            $stateProvider.state({
                name: 'root.info',
                url: '/info',
                controller: require('./info.controller.js')(app, angular),
                controllerAs: 'InfoController',
                template: require('./info.pug')()
            });
        }]);
    };
})();
