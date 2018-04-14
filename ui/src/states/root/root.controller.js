(function(){
    module.exports = function(app, angular){
        return function(){
            this.states = [
                {state: 'root.facilities', label: 'Facilities'},
                {state: 'root.meetings', label: 'Meetings'},
                {state: 'root.about', label: 'About'},
                {state: 'root.signup', label: 'Sign Up'},
                {state: 'root.user', label: 'User'}
            ];
        };
    };
})();
