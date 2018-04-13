(function(){

    'use strict';

    module.exports = function(app, angular) {
        //module config
        app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $stateProvider.state({
                abstract: true,
                name: 'root',
                controller: require('./root.controller.js')(app, angular),
                controllerAs: 'RootController',
                template: require('./root.pug')()
            });

            $urlRouterProvider.otherwise('home');
        }]);
    };
})();
