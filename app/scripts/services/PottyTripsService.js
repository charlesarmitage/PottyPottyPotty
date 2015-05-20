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
  				pottyTrips.push(angular.copy(trip));
  			}
  		}
  	};
  });