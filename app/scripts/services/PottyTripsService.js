'use strict';

angular.module('PottyPottyPotty')
  .factory('pottyTrips', function() {

  	var pottyTrips = [];
    var timeStamper = function(){
      return new Date();
    };

  	return {
      setTimeStamper : function(t){
        timeStamper = t;
      },

  		trips : function(){
  			return pottyTrips;
  		},

      // TODO: How to make this private? (i.e. not part of the public interface...)
      updateTripTimes : function(trip){
  				trip.timestamp = timeStamper();
          if(pottyTrips.length > 0){
            trip.timeSinceLast = trip.timestamp - pottyTrips[pottyTrips.length-1].timestamp;
          } else {
            trip.timeSinceLast = 0;
          }
      },

      add : function(trip){
        if(trip.isWee === true || trip.isPoo === true){
          var newTrip = angular.copy(trip);
          this.updateTripTimes(newTrip);
  				pottyTrips.push(newTrip);
  			}
  		}
  	};
  });
