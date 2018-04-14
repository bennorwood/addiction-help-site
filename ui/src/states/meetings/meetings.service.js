(function() {
    module.exports = function(app, angular) {
        app.factory('MeetingsService', ['$http', function($http) {

            var getMeetings = function() {
                return $http.get('/api/meetings/');
            };

            return {
                getMeetings: getMeetings
            };
        }]);
    };
})();
