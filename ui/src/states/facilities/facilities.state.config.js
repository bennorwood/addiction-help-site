(function(){

    'use strict';

    module.exports = function(app, angular) {
        //module config
        app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $stateProvider.state({
                name: 'root.facilities',
                url: '/facilities',
                controller: require('./facilities.controller.js')(app, angular),
                controllerAs: 'FacilitiesController',
                template: require('./facilities.pug')(),
                resolve: {}
            });
        }]);
    };
})();
