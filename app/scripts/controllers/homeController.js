'use strict';

angular.module('PottyPottyPotty')
  .controller('HomeController', function($scope, $filter, $ionicPopup, pottyTrips, TimestampService) {
    $scope.pottyTrips = [];

    $scope.loadPagedPottyTrips = function(){
        var trips = angular.copy(pottyTrips.trips());
        var timestampOfPreviousWee, 
            timestampOfPreviousPoo;

        for (var i = 0; i < trips.length; i++) {
            var trip = trips[i];
            
            if( trip.isWee && trip.isPoo ) {
                trip.typeText = 'Wee & Poo';
            } else if( trip.isWee ) {
                trip.typeText = 'Wee';
            } else if( trip.isPoo ) {
                trip.typeText = 'Poo';
            }

            if(trip.isWee) {
                if(timestampOfPreviousWee) {
                    trip.previousWeeText = $filter('amDifference')(trip.timestamp, timestampOfPreviousWee, 'minutes');

                    if( trip.previousWeeText === 1 ) {
                        trip.previousWeeText += ' minute';
                    } else {
                        trip.previousWeeText += ' minutes';
                    }
                }
                timestampOfPreviousWee = trip.timestamp;
            }

            if(trip.isPoo) {

                if(timestampOfPreviousPoo) {
                    trip.previousPooText = $filter('amDifference')(trip.timestamp, timestampOfPreviousPoo, 'minutes');

                    if( trip.previousPooText === 1 ) {
                        trip.previousPooText += ' minute';
                    } else {
                        trip.previousPooText += ' minutes';
                    }
                }
                timestampOfPreviousPoo = trip.timestamp;
            }

            trip.timestampAsLocal = TimestampService.convert.secsToDate(
                                     TimestampService.convert.toLocal(trip.timestamp / 1000));
        }
        $scope.pottyTrips = trips;
    };

    $scope.loadPagedPottyTrips();

    $scope.remove = function(trip){
      var deletePopup = $ionicPopup.confirm({
        title: 'Delete Trip ?',
      });

      deletePopup.then(function(isConfirmed) {
        if(isConfirmed) {
          pottyTrips.remove(trip);
        }
      });
    };

    $scope.$watchCollection(function () { return pottyTrips.trips(); }, function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.loadPagedPottyTrips();
        }
    });
});
