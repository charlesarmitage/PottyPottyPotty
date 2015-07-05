'use strict';

angular.module('PottyPottyPotty')
  .controller('AddTripController', function($scope, pottyTrips) {
  		$scope.trip = {
  			isWee: false,
  			isPoo: false,
  		};

      $scope.isValid = function(trip){
        return pottyTrips.isValid(trip);
      };

  		$scope.addTrip = function(trip){
  			pottyTrips.add(trip);
  			reset(); // TODO: May not be necessary
  		};

      $scope.cancelAddTrip = function(){
        reset();
      };

  		function reset(){
  			$scope.trip.isWee = false;
  			$scope.trip.isPoo = false;
  		}
  });
