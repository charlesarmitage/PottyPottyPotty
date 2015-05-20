'use strict';

angular.module('PottyPottyPotty')
  .controller('HomeController', function($scope, pottyTrips) {
    $scope.pottyTrips = pottyTrips.trips();
  });
