'use strict';

// TODO: Use a service instead of $rootScope
angular.module('PottyPottyPotty')
  .controller('AddTripController', function($scope, $rootScope) {
  		$scope.trip = {
  			isWee: false,
  			isPoo: false
  		};

  		if($rootScope.trips === undefined){
  			$rootScope.trips = [];
  		}

  		$scope.addTrip = function(trip){
  			if(trip.isWee === true || trip.isPoo === true){
  				var newTrip = angular.copy(trip);
	  			$rootScope.trips.push(newTrip);
  			}
  			reset();
  		};

  		function reset(){
  			$scope.trip.isWee = false;
  			$scope.trip.isPoo = false;
  		}
  });
