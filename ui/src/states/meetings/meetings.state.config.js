(function(){

    'use strict';

    module.exports = function(app, angular) {
        //module config
        app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $stateProvider.state({
                name: 'root.meetings',
                url: '/meetings',
                controller: require('./meetings.controller.js')(app, angular),
                controllerAs: 'MeetingsController',
                template: require('./meetings.pug')(),
                resolve: {}
            });

            $urlRouterProvider.otherwise('home');
        }]);
    };
})();
