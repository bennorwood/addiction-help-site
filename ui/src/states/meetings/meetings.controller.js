(function(){

    'use strict';

    module.exports = function(app, angular) {
        return ['meetings', function(meetings) {
            this.meetings = meetings.data;
        }];
    };
})();
