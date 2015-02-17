angular.module('openweather.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  
})

.controller('HomeCtrl', function($scope) {
})

.controller('OptionsCtrl', function($scope, $log) {
  
  $scope.options = { city : null };
  
  $scope.save = function() {
    
    $log.log("save options " + $scope.options.city);
    
  };
  
});

