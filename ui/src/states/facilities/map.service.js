(function(){
    'use strict';

    module.exports = function(app, angular) {
        app.factory('MapService', ['NgMap', function(NgMap) {
            
            var _directionsDisplay = new google.maps.DirectionsRenderer();
            var _directionsService = new google.maps.DirectionsService();
            var cachingContainer = {
                
            };
            
            var _getCachingContainer = function(){
                return cachingContainer;
            };
            
            return {
                NgMap: NgMap,
                directionsDisplay: _directionsDisplay,
                directionsService: _directionsService,
                markerMap: {},
                clearMarkers: function(){
                    var that = this;
                    
                    angular.forEach(this.markerMap, function(marker, id){
                        google.maps.event.clearInstanceListeners(marker);
                        marker.setMap(null);
                        
                        delete that.markerMap[id];
                    });
                },
                getCachingContainer: _getCachingContainer
            };
        }]);
    };
})();
