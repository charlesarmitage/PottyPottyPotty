'use strict';

angular.module('PottyPottyPotty')
  .controller('DebugController', function($scope, pottyTrips) {
    $scope.resetTrips = function(){
        pottyTrips.resetTrips();
    };

    $scope.add1000Trips = function(){
        // Prepare the time stamper to reduce one hour for each call
        // year=2000, month=1, day=1, hours=12, minutes=17, seconds=0
        var baseTime = new Date(2000, 1, 1, 12, 17, 0);
        var timeStamper = function(){
            baseTime.setHours( baseTime.getHours() + 1 );
            return new Date( baseTime );
        };

        // TODO: Should we be using a factory to create good
        //       trip objects? This data structure is getting
        //       spread all over the code...
        var trips = [];
        var lastWeeTimestamp, lastPooTimestamp;
        var timestamp = timeStamper();
        trips.push( { isWee: false, isPoo: true, timestamp: timestamp, timestampOfPreviousWee: lastWeeTimestamp, timestampOfPreviousPoo: lastPooTimestamp } );
        lastPooTimestamp = timestamp;
        timestamp = timeStamper();
        trips.push( { isWee: true, isPoo: false, timestamp: timestamp, timestampOfPreviousWee: lastWeeTimestamp, timestampOfPreviousPoo: lastPooTimestamp } );
        lastWeeTimestamp = timestamp;
        for (var i = 0; i < 333; i++) {
            timestamp = timeStamper();
            trips.push( { isWee: false, isPoo: true, timestamp: timestamp, timestampOfPreviousWee: lastWeeTimestamp, timestampOfPreviousPoo: lastPooTimestamp } );
            lastPooTimestamp = timestamp;
            timestamp = timeStamper();
            trips.push( { isWee: true, isPoo: false, timestamp: timestamp, timestampOfPreviousWee: lastWeeTimestamp, timestampOfPreviousPoo: lastPooTimestamp } );
            lastWeeTimestamp = timestamp;
            timestamp = timeStamper();
            trips.push( { isWee: true, isPoo: true, timestamp: timestamp, timestampOfPreviousWee: lastWeeTimestamp, timestampOfPreviousPoo: lastPooTimestamp } );
            lastPooTimestamp = lastWeeTimestamp = timestamp;
        }
        // One more to make 1000
        trips.push( { isWee: true, isPoo: true, timestamp: timeStamper(), timestampOfPreviousWee: lastWeeTimestamp, timestampOfPreviousPoo: lastPooTimestamp } );
        pottyTrips.setTrips( trips );
    };
  });
