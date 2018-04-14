(function(){

    'use strict';

    module.exports = function(app, angular) {
<<<<<<< HEAD
        return function() {
        };
=======
        return ['meetings', function(meetings) {
            this.meetings = meetings.data;
        }];
>>>>>>> 1fe933dda73dd840b0c13846a447ce6c58d077f0
    };
})();
