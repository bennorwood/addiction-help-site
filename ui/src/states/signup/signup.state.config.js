(function(){

    'use strict';

    module.exports = function(app, angular) {
        //module config
        app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $stateProvider.state({
                name: 'root.signup',
                url: '/signup',
                controller: require('./signup.controller.js')(app, angular),
                controllerAs: 'SignupController',
                template: require('./signup.pug')(),
                resolve: {}
            });

            $urlRouterProvider.otherwise('home');
        }]);
    };
})();
