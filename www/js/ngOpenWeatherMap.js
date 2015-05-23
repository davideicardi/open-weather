/* globals angular */

angular.module("ngOpenWeatherMap", [])

.factory("owmApi", function($http, $q) {
    var url = "http://api.openweathermap.org/data/2.5/forecast";
    
    function getForecast5Days(city, units, appId){
        var params = { 
            q: city, 
            units: units 
        };
        
        if (appId) {
            params.APPID = appId;
        }
        
        return $http.get(url, { params : params } );
    }
    
    return {
        getForecast5Days : getForecast5Days   
    };
});