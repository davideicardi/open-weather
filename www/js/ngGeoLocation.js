/* globals angular google */

angular.module("ngGeoLocation", ["ionic", "ngCordova"])


.factory("geoLocation", function($ionicPlatform, $cordovaGeolocation, $q) {

    function getCityFromCoordinates(coords) {
        var deferred = $q.defer();

        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);

        geocoder.geocode({
                'latLng': latlng
            },
            function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
					for (var i = 0; i < results.length; i++) {
						if (results[i].types[0] === "locality") {
							var city = results[i].address_components[0].short_name;
							var state = results[i].address_components[2].short_name;

                            deferred.resolve(city + ", " + state);
							return;
						}
					}
                    deferred.reject("address not found");
                }
                else {
                    deferred.reject("Geocoder failed due to: " + status);
                }
            }
        );

        return deferred.promise;
    }

    function getCoordinates() {
        var deferred = $q.defer();

        $ionicPlatform.ready(function() {
            var posOptions = {
                timeout: 10000,
                enableHighAccuracy: false
            };
            $cordovaGeolocation.getCurrentPosition(posOptions)
                .then(function(position) {
                    deferred.resolve(position.coords);
                }, function(err) {
                    deferred.reject("failed to get coordinates " + err);
                });
        });

        return deferred.promise;
    }

    function getCity() {
        return getCoordinates()
            .then(function(coords) {
                return getCityFromCoordinates(coords);
            });
    }

    return {
        getCity: getCity
    };
});