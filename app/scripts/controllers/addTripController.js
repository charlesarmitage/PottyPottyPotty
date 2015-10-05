'use strict';

angular.module('PottyPottyPotty')
  .controller('AddTripController', function($scope, pottyTrips, TimestampService) {

  		$scope.localTripTime = new Date(Date.now());
      $scope.tripTimeUtc = TimestampService.convert.secsToDate(
                            TimestampService.convert.toUtc(new Date() /1000));

      $scope.trip = {
  			isWee: false,
  			isPoo: false,
  		};

      $scope.isValid = function(trip){
        return pottyTrips.isValid(trip);
      };

  		$scope.addTrip = function(trip){
        trip.timestamp = $scope.tripTimeUtc;
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

      function updateTime(epochTimeSecs) {
        if (typeof (epochTimeSecs) !== 'undefined') {
          
          $scope.localTripTime = TimestampService.convert.toTodaysDate(
                                  TimestampService.convert.secsToDate(epochTimeSecs));

          $scope.tripTimeUtc = TimestampService.convert.toTodaysDate(
                                TimestampService.convert.secsToDate(
                                  TimestampService.convert.toUtc(epochTimeSecs)));
        }
      }

      $scope.timePickerObject = {
        inputEpochTime: TimestampService.convert.toLocal($scope.localTripTime / 1000), 
        step: 1,
        format: 24,
        titleLabel: 'Trip time',
        setLabel: 'Set',
        closeLabel: 'Cancel',
        setButtonType: 'button-balanced',
        closeButtonType: 'button-stable',
        callback: updateTime
      };
  });
