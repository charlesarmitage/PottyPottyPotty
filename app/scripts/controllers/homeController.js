'use strict';

angular.module('PottyPottyPotty')
  .controller('HomeController', function($scope, $filter, pottyTrips) {
    $scope.pottyTrips = [];

    $scope.loadPagedPottyTrips = function(){
        var trips = pottyTrips.trips();
        for (var i = 0; i < trips.length; i++) {
            var trip = trips[i];
            trip.typeText = '';
            if( trip.isWee && trip.isPoo ) {
                trip.typeText = 'Wee & Poo';
            } else if( trip.isWee ) {
                trip.typeText = 'Wee';
            } else if( trip.isPoo ) {
                trip.typeText = 'Poo';
            }
            trip.previousWeeText = $filter('amDifference')(trip.timestamp, trip.timestampOfPreviousWee, 'minutes');
            if( trip.previousWeeText === 1 ) {
                trip.previousWeeText += ' minute';
            } else {
                trip.previousWeeText += ' minutes';
            }
            trip.previousPooText = $filter('amDifference')(trip.timestamp, trip.timestampOfPreviousPoo, 'minutes');
            if( trip.previousPooText === 1 ) {
                trip.previousPooText += ' minute';
            } else {
                trip.previousPooText += ' minutes';
            }
        }
        $scope.pottyTrips = trips;
    };
    $scope.loadPagedPottyTrips();

    $scope.$watchCollection(function () { return pottyTrips.trips(); }, function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.loadPagedPottyTrips();
        }
    });
});
