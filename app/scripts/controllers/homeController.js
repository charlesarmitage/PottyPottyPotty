'use strict';

angular.module('PottyPottyPotty')
  .controller('HomeController', function($scope, $filter, pottyTrips) {
    $scope.pottyTrips = [];

    $scope.loadPagedPottyTrips = function(){
        $scope.pottyTrips = pottyTrips.trips();
        for (var i = 0; i < $scope.pottyTrips.length; i++) {
            var trip = $scope.pottyTrips[i];
            trip.previousWeeText = $filter('amDifference')(trip.timestamp, trip.timestampOfPreviousWee, 'minutes');
            if( trip.previousWeeText === 1 ) {
                trip.previousWeeText += ' minute';
            }
            else {
                trip.previousWeeText += ' minutes';
            }
            trip.previousPooText = $filter('amDifference')(trip.timestamp, trip.timestampOfPreviousPoo, 'minutes');
            if( trip.previousPooText === 1 ) {
                trip.previousPooText += ' minute';
            }
            else {
                trip.previousPooText += ' minutes';
            }
        }
    };
    $scope.loadPagedPottyTrips();

    $scope.$watch(function () { return pottyTrips.trips(); }, function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.loadPagedPottyTrips();
        }
    });
});
