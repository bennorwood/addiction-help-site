(function(){

    'use strict';

    module.exports = function(app, angular) {
        return ['prescriptions', function(prescriptions) {
            this.prescriptions = prescriptions.data;
        }];
    };
})();
