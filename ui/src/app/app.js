(function(){

    'use strict';

    var strAppName = 'app';
    
    var app = require('angular').module(strAppName, [
        require('angular-ui-router'),
        require('angular-ui-bootstrap'),
        require('./app.bootstrap.js')(strAppName)
    ]);

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
