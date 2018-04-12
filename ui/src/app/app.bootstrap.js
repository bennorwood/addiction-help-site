(function(document) {
    'use strict';

    var jQuery = require('jQuery');
    var angular = require('angular');
    var strModuleName = 'ngBootstrapConfig';

    module.exports = function(strAppName) {

        jQuery.getJSON('/api/server-config').then(function(browserConfiguration) {

            angular.module(strModuleName, []).factory('BrowserConfiguration', function () {
                return browserConfiguration;
            });

            angular.element(document).ready(function(){
                angular.bootstrap(document, [strAppName]);
            });
        });

        return strModuleName;
    };
})(window.document);
