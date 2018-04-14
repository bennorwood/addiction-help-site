(function(){

    'use strict';

    module.exports = function(app, angular) {
        //module config
        app.config(['$stateProvider', function($stateProvider) {

            $stateProvider.state({
                name: 'root.home',
                url: '/home',
                controller: require('./home.controller.js')(app, angular),
                controllerAs: 'HomeController',
                template: require('./home.pug')()
            });
        }]);
    };
})();
