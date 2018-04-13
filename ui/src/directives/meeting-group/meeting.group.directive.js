(function() {
    module.exports = function(app, angular) {
        app.directive('meetingGroup', function() {
            return {
                restrict: 'E',
                bindToController: {
                    meeting: '='
                },
                controller: require('./meeting.group.controller.js')(app, angular),
                controllerAs: 'MeetingGroupController',
                template: require('./meeting-group.pug')()
            };
        });
    };
})();
