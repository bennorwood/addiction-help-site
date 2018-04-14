(function(){

    'use strict';

    module.exports = function(app, angular) {
        
        require('./facilities.service.js')(app, angular);
        require('./map.service.js')(app, angular);
        
        //module config
        app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $stateProvider.state({
                name: 'root.facilities',
                url: '/facilities',
                controller: require('./facilities.controller.js')(app, angular),
                controllerAs: 'FacilitiesController',
                template: require('./facilities.pug')(),
                resolve: {
                    facilities: ['FacilitiesService', function(FacilitiesService){
                        return FacilitiesService.getFacilities();
                    }]
                }
            });
        }]);
    };
})();
