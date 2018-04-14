(function(){

    'use strict';

    module.exports = function(app, angular) {
        return ['FacilitiesService', 'MapService', function(FacilitiesService, MapService) {
            this.cachingContainer = FacilitiesService.getCachingContainer();
            this.pageLimit = this.cachingContainer.controllerSettings.pageLimit;
            
            this.facilities = this.cachingContainer.facilities;
            
            this.prevPage = function(){
                if(!this.isPreviousDisabled()){
                    this.cachingContainer.controllerSettings.currentPage--;
                    createMarkersForPage();
                }
            };
            
            this.isPreviousDisabled = function(){
                return this.cachingContainer.controllerSettings.currentPage <= 1;
            };
            
            this.isNextDisabled = function(){
                return this.cachingContainer.controllerSettings.currentPage * this.pageLimit > this.facilities.length;
            };
            
            
            this.nextPage = function(){
                if(!this.isNextDisabled()){
                    this.cachingContainer.controllerSettings.currentPage++;
                    createMarkersForPage();
                }
            };
            
            this.calculateOffset = function(){
                return (this.cachingContainer.controllerSettings.currentPage < 2)? 0 : (this.cachingContainer.controllerSettings.currentPage - 1) * this.cachingContainer.controllerSettings.pageLimit;
            };
            
            this.calculateLastPage = function(){
                return Math.ceil( (this.facilities.length / this.cachingContainer.controllerSettings.pageLimit) );
            };
            
            
            var map = null;
            this.markerMap = MapService.markerMap;
            
            var initialize = function(){
                return MapService.NgMap.getMap().then(function(_map){
                    map = _map;
                });
            };
            
            var convertToLatLng = function(point){
                return { lat: Number.parseFloat(point.latitude), lng: Number.parseFloat(point.longitude) };
            };
            
            var createMarkersForPage = function(){
                MapService.clearMarkers();
                initPromise.then(function(){
                    var clickHandler = function() {
                        $scope.$apply(function(){
                            map.setZoom(16);
                            map.setCenter(marker.getPosition());
                        });
                    };
                    
                    for(var index = this.calculateOffset(); index < this.calculateOffset() + this.pageLimit; index++){
                        if(this.facilities[index].latitude && this.facilities[index].longitude){
                            var marker = new google.maps.Marker({
                                position: convertToLatLng(this.facilities[index]),
                                map: map
                            });
                            
                            this.markerMap[index] = marker;
                            marker.addListener('click', clickHandler);
                        }
                    }
                }.bind(this));
            }.bind(this);
            
            var initPromise = initialize();
        }];
    };
})();
