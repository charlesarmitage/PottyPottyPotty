'use strict';

angular.module('PottyPottyPotty')
  .controller('AddTripController', function($scope, pottyTrips) {
  		$scope.trip = {
  			isWee: false,
  			isPoo: false
  		};

  		$scope.addTrip = function(trip){
			pottyTrips.add(trip);
  			reset(); // TODO: May not be necessary
  		};

  		function reset(){
  			$scope.trip.isWee = false;
  			$scope.trip.isPoo = false;
  		}
  });
