(function(){
    'use strict';

    module.exports = function(app, angular) {
        app.factory('FacilitiesService', ['$http', function($http) {
            var cachingContainer = {
                facilities: {},
                controllerSettings: {
                    pageLimit: 10,
                    currentPage: 1
                }
            };
            
            var _getFacilities = function() {
                return $http.get('/api/facilities/').then(function(response){
                    cachingContainer.facilities = response.data;
                    
                    return response;
                });
            };
            
            var _getCachingContainer = function(){
                return cachingContainer;
            };
            
            return {
                getFacilities: _getFacilities,
                getCachingContainer: _getCachingContainer
                
            };
        }]);
    };
})();
