'use strict';

angular.module('PottyPottyPotty')
  .controller('AddTripController', function($scope, pottyTrips) {

  		$scope.tripTime = new Date(Date.now());

      $scope.trip = {
  			isWee: false,
  			isPoo: false,
  		};

      $scope.isValid = function(trip){
        return pottyTrips.isValid(trip);
      };

  		$scope.addTrip = function(trip){
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

      $scope.timePickerObject = {
        inputEpochTime: getLocalTimeAsSecondsSinceEpoch(), 
        step: 1,
        format: 24,
        titleLabel: 'Trip time',
        setLabel: 'Set',
        closeLabel: 'Cancel',
        setButtonType: 'button-balanced',
        closeButtonType: 'button-stable',
        callback: updateTime
      };

      function getLocalTimeAsSecondsSinceEpoch()
      {
        var timezoneOffsetSecs = new Date().getTimezoneOffset() * 60;
        return (Date.now() / 1000) - timezoneOffsetSecs;
      }

      function convertLocalTimeSinceEpochToUtc(localEpochTimeSecs)
      {
        var timezoneOffsetSecs = new Date().getTimezoneOffset() * 60;
        var utcEpochTimeMs = (localEpochTimeSecs + timezoneOffsetSecs) * 1000;
        return new Date(utcEpochTimeMs);
      }

      function updateTime(epochTimeSecs) {
        if (typeof (epochTimeSecs) !== 'undefined') {
          
          $scope.tripTime = updateToToday(new Date(epochTimeSecs * 1000));
          $scope.tripTimeUtc = convertLocalTimeSinceEpochToUtc(epochTimeSecs);

          console.log('Epoch time is : ', $scope.tripTime, 'and the time is ', $scope.tripTime.getUTCHours(), ':', $scope.tripTime.getUTCMinutes(), 'in UTC');
        }
      }

      function updateToToday(date) {
          var today = new Date(Date.now());
          date.setDate(today.getDate());
          date.setMonth(today.getMonth());
          date.setYear(today.getYear());
          return date;
      }
  });
