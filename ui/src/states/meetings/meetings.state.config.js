(function(){

    'use strict';

    module.exports = function(app, angular) {

        require('./meetings.service.js')(app, angular);

        //module config
        app.config(['$stateProvider', function($stateProvider) {

            $stateProvider.state({
                name: 'root.meetings',
                url: '/meetings',
                controller: require('./meetings.controller.js')(app, angular),
                controllerAs: 'MeetingsController',
                template: require('./meetings.pug')(),
                resolve: {
                    'meetings': ['MeetingsService', function(MeetingsService){
                        return MeetingsService.getMeetings();
                    }]
                }
            });
        }]);
    };
})();
