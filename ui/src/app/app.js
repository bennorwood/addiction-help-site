(function(){

    'use strict';

    var strAppName = 'app';

    var angular = require('angular');

    var app = angular.module(strAppName, [
        require('angular-ui-router'),
        require('angular-ui-bootstrap'),
        require('ngmap'),
        require('angular-ui-bootstrap'),
        require('./app.bootstrap.js')(strAppName)
    ]);

    app.config(['$urlRouterProvider', function($urlRouterProvider) {
        $urlRouterProvider.otherwise('home');
    }]);

    var importAll = function(context) {
        context.keys().forEach(function(key) {
            context(key)(app, angular);
        });
    };

    // import all the states
    importAll(require.context('../states', true, /\.state\.config\.js$/));

    // import all the directives
    importAll(require.context('../directives', true, /\.directive\.js$/));
})();
