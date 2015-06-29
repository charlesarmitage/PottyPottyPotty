'use strict';

angular.module('PottyPottyPotty')
  .factory('pottyTrips', function() {

  	var pottyTrips = [];
    var timeStamper = function(){
      return new Date();
    };

    function lastPoo() {
      var poo;
      for (var i = 0; i < pottyTrips.length; i++) {
        if(pottyTrips[i].isPoo) {
          poo = pottyTrips[i];
        }
      }
      return poo;
    }

    function lastWee() {
      var wee;
      for (var i = 0; i < pottyTrips.length; i++) {
        if(pottyTrips[i].isWee) {
          wee = pottyTrips[i];
        }
      }
      return wee;
    }

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
          if(trip.isWee) {
            var lw = lastWee();
            if(lw !== undefined) {
              trip.timeSinceLastWee = trip.timestamp - lw.timestamp;
            }
          }
          if(trip.isPoo) {
            var lp = lastPoo();
            if(lp !== undefined) {
              trip.timeSinceLastPoo = trip.timestamp - lp.timestamp;
            }
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
