(function() {
    'use strict';

    module.exports = function(app, angular) {
        return function() {
            this.meeting = this.meeting ? this.meeting : {};
        };
    };
})();
