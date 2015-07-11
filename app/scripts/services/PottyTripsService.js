'use strict';

angular.module('PottyPottyPotty')
  .factory('pottyTrips', function(localstorage) {

  	var pottyTrips = [];
    var loadedTrips = localstorage.getObject('potty-trips');
    if(loadedTrips !== undefined ) {
      // pottyTrips = angular.copy(loadedTrips);
    }

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

    function trips(){
      return pottyTrips;
    }

    function setTimeStamper(t){
      timeStamper = t;
    }

    function updateTripTimes(trip){
      trip.timestamp = timeStamper();
      if(trip.isWee) {
        var lw = lastWee();
        if(lw !== undefined) {
          trip.timestampOfPreviousWee = lw.timestamp;
        }
      }
      if(trip.isPoo) {
        var lp = lastPoo();
        if(lp !== undefined) {
          trip.timestampOfPreviousPoo = lp.timestamp;
        }
      }
    }

    function add(trip){
      if(isValid(trip)){
        var newTrip = angular.copy(trip);
        updateTripTimes(newTrip);
        pottyTrips.push(newTrip);
        // localstorage.setObject('potty-trips', pottyTrips);
      }
    }

    function isValid(trip) {
      if( trip.isWee === true || trip.isPoo === true ) {
        return true;
      } else {
        return false;
      }
    }

    // return public API only
  	return {
      setTimeStamper : setTimeStamper,
  		trips : trips,
      add : add,
      isValid: isValid
  	};
  });
