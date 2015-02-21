angular.module('openweather.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  
})

.controller('HomeCtrl', function($scope, $http, $localstorage, $window) {
  
  $scope.openLink = function() {
    $window.open('http://openweathermap.org/city/{{forecast.city.id}}', '_system')
  };
  
  $scope.doRefresh = function() {
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
        var grouped = {};
        
        angular.forEach(data.list, function(dataItem) {
          dataItem.date = new Date(dataItem.dt * 1000);
          dataItem.day = new Date(dataItem.dt * 1000);
          dataItem.day.setHours(0,0,0,0);
          
          switch (dataItem.date.getHours()) {
            case 1:
            case 4:
              dataItem.dayPeriod = "NIGTH";
              break;
            case 7:
            case 10:
              dataItem.dayPeriod = "MORNING";
              break;
            case 13:
            case 16:
              dataItem.dayPeriod = "AFTERNOON";
              break;
            case 19:
            case 22:
              dataItem.dayPeriod = "EVENING";
              break;
            
            default:
              // code
          }
          
          grouped[dataItem.day] = grouped[dataItem.day] || {items: [], dayDate: dataItem.day};
          grouped[dataItem.day].items.push(dataItem);
        });
        
        $scope.days = [];
        angular.forEach(grouped, function(value, key) {
          $scope.days.push(value);
        });
        
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      })
      .finally(function() {
         // Stop the ion-refresher from spinning
         $scope.$broadcast('scroll.refreshComplete');
       });
  };
  
  $scope.doRefresh();
})

.controller('OptionsCtrl', function($scope, $log, $localstorage, $state) {
  
  $scope.options =
    $localstorage.getObject("options")
    || { city : "New York", units: "metric" };
  
  $scope.save = function() {
    
    $localstorage.setObject("options", $scope.options);
    
    $state.go('app.home', {}, {location: 'replace'});
  };
  
});

