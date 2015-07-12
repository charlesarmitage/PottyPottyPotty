'use strict';

angular.module('PottyPottyPotty')
  .controller('DebugController', function($scope, pottyTrips) {
    $scope.resetTrips = function(){
        pottyTrips.resetTrips();
    };
  });
