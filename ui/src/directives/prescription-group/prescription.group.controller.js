(function() {
    'use strict';

    module.exports = function(app, angular) {
        return function() {
            this.prescription = this.prescription ? this.prescription : {};
        };
    };
})();
