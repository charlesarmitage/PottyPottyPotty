'use strict';

// TODO: Use a service instead of $rootScope
angular.module('PottyPottyPotty')
  .controller('HomeController', function($scope, $rootScope) {
  	
	if($rootScope.trips === undefined){
		$rootScope.trips = [];
	}

    $scope.pottyTrips = $rootScope.trips;
  });
