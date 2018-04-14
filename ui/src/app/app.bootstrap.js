(function(document) {
    'use strict';

    var jQuery = require('jquery');
    var angular = require('angular');
    var strModuleName = 'ngBootstrapConfig';

    module.exports = function(strAppName) {
        var resumeBootstrapping = function(){
            angular.element(document).ready(function(){
                angular.bootstrap(document, [strAppName]);
            });
        };
        
        jQuery.getJSON('/api/server-config').then(function(browserConfiguration) {

            angular.module(strModuleName, []).factory('BrowserConfiguration', function () {
                return browserConfiguration;
            });
            
            jQuery.ajax({
                url: 'https://maps.google.com/maps/api/js?key=' + browserConfiguration.keys.googleMapsKey,
                dataType: 'script',
                success: resumeBootstrapping,
                async: true
            });
        });

        return strModuleName;
    };
})(window.document);
