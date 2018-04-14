(function(){
    module.exports = function(app, angular){
        return function(){
            this.states = [
                {state: 'root.info', label: 'Info'},
                {state: 'root.meetings', label: 'Meetings'}
            ];
        };
    };
})();
