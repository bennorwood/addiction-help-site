(function(){

    'use strict';
 
    module.exports = function(app, angular) {
        //module config
        app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
 
            $stateProvider.state({
                name: 'root.user',
                url: '/user',
                controller: require('./user.controller.js')(app, angular),
                controllerAs: 'UserController',
                template: require('./user.pug')(),
                resolve: {}
            });
 
            $urlRouterProvider.otherwise('home');
        }]);
    };
 })();