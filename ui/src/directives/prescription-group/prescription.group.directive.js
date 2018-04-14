(function() {
    module.exports = function(app, angular) {
        app.directive('prescriptionGroup', function() {
            return {
                restrict: 'E',
                replace: true,
                bindToController: {
                    prescription: '='
                },
                controller: require('./prescription.group.controller.js')(app, angular),
                controllerAs: 'PrescriptionGroupController',
                template: require('./prescription-group.pug')()
            };
        });
    };
})();
