(function(){

    'use strict';

    var strAppName = 'app';

    var angular = require('angular');

    var app = angular.module(strAppName, [
        require('angular-ui-router'),
        require('angular-ui-bootstrap'),
        require('./app.bootstrap.js')(strAppName)
    ]);

    var importAll = function(context) {
        context.keys().forEach(function(key) {
            context(key)(app, angular);
        });
    };

    importAll(require.context('../states', true, /\.state\..*\.js$/));

    //module config
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider.state({
            name: 'home',
            url: '/home',
            controller: function(){},
            controllerAs: 'DashboardStateController',
            template: require('./../states/home.pug')(),
            resolve: {}
        });

        $urlRouterProvider.otherwise('home');
    }]);
})();
