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
            abstract: true,
            name: 'root',
            controller: require('./root.controller.js'),
            controllerAs: 'RootStateController',
            template: require('./root/root.pug')(),
            resolve: {}
        });

        $urlRouterProvider.otherwise('home');
    }]);
})();
