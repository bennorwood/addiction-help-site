(function(){

    'use strict';

    var strAppName = 'app';
    
    var app = require('angular').module(strAppName);

    //module config
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider.state({
            abstract: true,
            name: 'app',
            controller: require('./root.controller.js'),
            controllerAs: 'RootStateController',
            template: require('./root.pug')(),
            resolve: {}
        });

        $urlRouterProvider.otherwise('home');
    }]);
})();
