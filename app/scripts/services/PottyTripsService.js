'use strict';

angular.module('PottyPottyPotty')
  .factory('pottyTrips', function() {

  	var pottyTrips = [];

  	return {
  		trips : function(){
  			return pottyTrips;
  		},

  		add : function(trip){
  			if(trip.isWee === true || trip.isPoo === true){
  				var newTrip = angular.copy(trip);
  				newTrip.timestamp = new Date();
  				pottyTrips.push(newTrip);
  			}
  		}
  	};
  });