(function(){

    'use strict';

    module.exports = function(app, angular) {

        require('./prescriptions.service.js')(app, angular);

        //module config
        app.config(['$stateProvider', function($stateProvider) {

            $stateProvider.state({
                name: 'root.prescriptions',
                url: '/prescriptions',
                controller: require('./prescriptions.controller.js')(app, angular),
                controllerAs: 'PrescriptionsController',
                template: require('./prescriptions.pug')(),
                resolve: {
                    'prescriptions': ['PrescriptionsService', function(PrescriptionsService){
                        return PrescriptionsService.getPrescriptions();
                    }]
                }
            });
        }]);
    };
})();
