angular.module('openweather.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  
})

.controller('HomeCtrl', function($scope, $http, $localstorage) {
  
  var options =
    $localstorage.getObject("options")
    || { city : "New York", units: "metric" };
  $scope.options = options;
  
  var url = "http://api.openweathermap.org/data/2.5/forecast"
  var params = { 
    q: options.city, 
    units: options.units 
  };
  if (options.appId) {
    params.APPID = options.appId;
  }
  
  $http.get(url, { params : params } ).
    success(function(data, status, headers, config) {
      $scope.forecast = data;
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  
})

.controller('OptionsCtrl', function($scope, $log, $localstorage) {
  
  $scope.options =
    $localstorage.getObject("options")
    || { city : "New York", units: "metric" };
  
  $scope.save = function() {
    
    $localstorage.setObject("options", $scope.options);

  };
  
});

