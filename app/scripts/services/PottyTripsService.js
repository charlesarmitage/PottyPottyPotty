'use strict';

angular.module('PottyPottyPotty')
  .factory('pottyTrips', function(localstorage) {

    var byTimestamp = function (lhsTrip, rhsTrip) {
      return lhsTrip.timestamp - rhsTrip.timestamp;
    };

    var convertDateStringsToObjects = function(trips){
      for (var i = 0; i < trips.length; i++) {
        trips[i].timestamp = new Date(trips[i].timestamp);
      }
      trips.sort(byTimestamp);
      return trips;
    };

  	var pottyTrips = angular.copy(convertDateStringsToObjects(localstorage.getObject('potty-trips', [])));

    function trips(){
      return pottyTrips;
    }

    function add(trip){
      if(isValid(trip)){
        var newTrip = angular.copy(trip);
        pottyTrips.push(newTrip);
        trips().sort(byTimestamp);
        localstorage.setObject('potty-trips', pottyTrips);
      }
    }

    function remove(trip){
      var index = indexOf(function(pottyTrip){
        return pottyTrip.timestamp.getTime() === trip.timestamp.getTime();
      });

      if(index !== -1){
        pottyTrips.splice(index, 1);
        localstorage.setObject('potty-trips', pottyTrips);        
      }
      return index;
    }

    function setTrips(trips){
      pottyTrips = angular.copy(trips);
    }

    function resetTrips(){
      pottyTrips = [];
      localstorage.setObject('potty-trips', pottyTrips);
    }

    function isValid(trip) {
      if( trip.isWee === true || trip.isPoo === true ) {
        return true;
      } else {
        return false;
      }
    }

    function indexOf(predicate){
      for (var i = 0; i < pottyTrips.length; i++) {
          if (predicate(pottyTrips[i])) {
              return i;
          }
      }
      return -1;
    }

    // return public API only
  	return {
  		trips : trips,
      add : add,
      remove : remove,
      setTrips : setTrips,
      resetTrips : resetTrips,
      isValid: isValid
  	};
  });
