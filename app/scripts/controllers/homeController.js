'use strict';

angular.module('PottyPottyPotty')
  .controller('HomeController', function($scope, pottyTrips) {
    $scope.pottyTrips = pottyTrips.trips();
    $scope.$watch(function () { return pottyTrips.trips(); }, function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.pottyTrips = pottyTrips.trips();
        }
    });
});
