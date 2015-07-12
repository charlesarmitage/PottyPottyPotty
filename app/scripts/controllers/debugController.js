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
        pottyTrips.setTimeStamper(function(){
            baseTime.setHours( baseTime.getHours() + 1 );
            return new Date( baseTime );
        });

        // TODO: Should we be using a factory to create good
        //       trip objects? This data structure is getting
        //       spread all over the code...
        for (var i = 0; i < 333; i++) {
            pottyTrips.add( { isWee: false, isPoo: true } );
            pottyTrips.add( { isWee: true, isPoo: false } );
            pottyTrips.add( { isWee: true, isPoo: true } );
        }
        // One more to make 1000
        pottyTrips.add( { isWee: true, isPoo: true } );

        // Reset the time stamper
        // TODO: Perhaps we should reinstate the original one?
        pottyTrips.setTimeStamper(function(){
            return new Date();
        });
    };
  });
