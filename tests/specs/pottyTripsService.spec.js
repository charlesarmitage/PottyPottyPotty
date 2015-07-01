'use strict';

describe("Potty Trips Service", function() {
    beforeEach(module('PottyPottyPotty'));

    var service,
    	trip;

	function weeTrip(){
		return {
			isWee : true,
			isPoo : false
		}
	};

	function pooTrip(){
		return {
			isWee : false,
			isPoo : true
		}
	};

	function addWeeTripWithTime(t){
	  	service.setTimeStamper(function(){ return t; });
	  	service.add(weeTrip());
	};

	function addPooTripWithTime(t){
	  	service.setTimeStamper(function(){ return t; });
	  	service.add(pooTrip());
	};

    beforeEach(inject(function(pottyTrips){
    	service = pottyTrips;
    	trip = {
    		isWee : false,
    		isPoo : false
    	}
	}));

	describe('Adding a potty trip', function() {
	  it('nothing is added initially', function() {

	    expect(service.trips().length).toEqual(0);
	  });

	  it('adding a trip adds to array', function(){
	  	trip.isWee = true;

	  	service.add(trip);

	  	expect(service.trips().length).toEqual(1);
	  });

	  it('added trips are stored', function(){
	  	trip.isWee = true;
	  	service.add(trip);

	  	expect(service.trips()[0].isWee).toEqual(true);
	  });

	  it('added trips are copied', function(){
	  	trip.isPoo = true;
	  	service.add(trip);

	  	trip.isPoo = false;

	  	expect(service.trips()[0].isPoo).toEqual(true);
	  });

	  it('trips are not added if no wee or poo', function(){
	  	trip.isWee = false;
	  	trip.isPoo = false;

	  	service.add(trip);

	    expect(service.trips().length).toEqual(0);
	  });

	  it('current timestamp set when trip added', function(){
	  	var now = new Date();
	  	var nowPlusSecond = new Date(now.getTime() + 1000);
	  	var nowMinusSecond = new Date(now.getTime() - 1000);

	  	service.add(weeTrip());

	  	expect(service.trips()[0].timestamp).toBeGreaterThan(nowMinusSecond);
	  	expect(service.trips()[0].timestamp).toBeLessThan(nowPlusSecond);
	  });

	  it('records timestamp of last wee trip', function(){
	  	var now = new Date();
	  	addWeeTripWithTime(now);

	  	addPooTripWithTime(new Date(now.getTime() + 5000));

	  	var nowPlusTenSeconds = new Date(now.getTime() + 10000);
	  	addWeeTripWithTime(nowPlusTenSeconds);

	  	var lastTrip = service.trips()[service.trips().length-1];
	  	expect(lastTrip.timestampOfPreviousWee).toEqual(now);
	  	expect(lastTrip.timestampOfPreviousPoo).toEqual(undefined);
	  });

	  it('records timestamp of last poo trip', function(){
	  	var now = new Date();
	  	addPooTripWithTime(now);

	  	addWeeTripWithTime(new Date(now.getTime() + 5000));

	  	var nowPlusTenSeconds = new Date(now.getTime() + 10000);
	  	addPooTripWithTime(nowPlusTenSeconds);

	  	var lastTrip = service.trips()[service.trips().length-1];
	  	expect(lastTrip.timestampOfPreviousPoo).toEqual(now);
	  	expect(lastTrip.timestampOfPreviousWee).toEqual(undefined);
	  });
	});
});
