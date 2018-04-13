(function(){

    'use strict';

    module.exports = function(app, angular) {
        //module config
        app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $stateProvider.state({
                abstract: true,
                name: 'app',
                controller: require('./root.controller.js')(app, angular),
                controllerAs: 'RootStateController',
                template: require('./root.pug')(),
                resolve: {}
            });

            $urlRouterProvider.otherwise('home');
        }]);
    };
})();
