(function(document, angular, jQuery){
    'use strict';
    
    /**
     * Pull down the configuration before we start our application.
     */
    jQuery.getJSON('/api/server-config', function(browserConfiguration) {
        
        var module = angular.module('ngBootstrapConfig', []);
        
        module.factory('BrowserConfiguration', function () {
            return browserConfiguration;
        });
        
        
        var resumeBootstrapping = function () {
            angular.element(document).ready(function(){
                angular.bootstrap(document, ['app']);
            });
        };
        
        jQuery.ajax({
            url: 'https://maps.google.com/maps/api/js?key=' + browserConfiguration.keys.googleMapsKey,
            dataType: 'script',
            success: resumeBootstrapping,
            async: true
        });
    });
    
})(window.document, window.angular, window.jQuery);