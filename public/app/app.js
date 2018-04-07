(function(angular){
    'use strict';
    
    var app = angular.module('app', ['ui.router', 'ngResource', 'ngMap', 'ngBootstrapConfig']);
    //module config
    app.config(['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', function($stateProvider, $urlRouterProvider, $sceDelegateProvider){
        
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading assets from google maps domain.
            'https://maps.google.com/maps/api/**'
        ]);
        
        $stateProvider.state({
            name: 'home',
            url: '/home',
            controller: 'DashboardStateController', //Matches controller name as defined in angular
            controllerAs: 'DashboardStateController', //Gives the controller a specific name in the html template/view
            templateUrl: '/states/home.html', //with a node server, you should be able to make use of templateUrl here
            resolve: {
            }
        });
        
        $urlRouterProvider.otherwise('home');
    }]);
    
    
    app.controller('BodyController', ['BrowserConfiguration', function(BrowserConfiguration){
        this.BrowserConfiguration = BrowserConfiguration;
        this.protocol = window.document.protocol;
    }]);
    
    
    
    /**
     * Angular controllers are NOT singleton instances since you may have some repeated/reused view controllers
     */
    app.controller('DashboardStateController', ['$scope', 'SimpleService', 'MapService', function($scope, SimpleService, MapService){
        var that = this;
        
    }]);
    
    app.factory('faker', ['$window', function($window){
        /**
         * Latitude/Longitude methods are busted, and I want more precision
         */
        var randomNumberWithMinMax = function (max, min) {
            max = max || 180
            min = min || -180
            return faker.random.number({max: max, min:min, precision:0.000001}).toFixed(6);
        };
        
        $window.faker.address.latitude = randomNumberWithMinMax;
        $window.faker.address.longitude = randomNumberWithMinMax;
        
        return $window.faker;
    }]);
    
    /**
     * This component is a singleton. There is only one created instance of this service any and everywhere its referenced.
     */
    app.factory('MapService', ['NgMap', function(NgMap){
        var _directionsDisplay = new google.maps.DirectionsRenderer();
        var _directionsService = new google.maps.DirectionsService();
        
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
            }
        };
    }]);
    
    /**
     * This component is a singleton. There is only one created instance of this service any and everywhere its referenced.
     */
    app.factory('SimpleService', ['$resource', '$http', 'BrowserConfiguration', function($resource, $http, BrowserConfiguration){
        
        
        /**
         * This return object is what is exposed to other angular components.
         */
        return {
            
        };
    }]);
    
})(window.angular);