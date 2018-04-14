(function(){

    'use strict';

    module.exports = function(app, angular) {
        //module config
        app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $stateProvider.state({
                name: 'root.about',
                url: '/about',
                controller: require('./about.controller.js')(app, angular),
                controllerAs: 'AboutController',
                template: require('./about.pug')(),
                resolve: {}
            });
        }]);
    };
})();
