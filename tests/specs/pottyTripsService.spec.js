'use strict';

describe("Potty Trips Service", function() {
    beforeEach(module('PottyPottyPotty'));

    var service,
    	trip;

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
	  	trip.isWee = true;
	  	var now = new Date();
	  	var nowPlusSecond = new Date(now.getTime() + 1000);
	  	var nowMinusSecond = new Date(now.getTime() - 1000);

	  	service.add(trip);

	  	expect(service.trips()[0].timestamp).toBeGreaterThan(nowMinusSecond);
	  	expect(service.trips()[0].timestamp).toBeLessThan(nowPlusSecond);
	  });
	});
});