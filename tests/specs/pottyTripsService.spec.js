'use strict';

describe("Potty Trips Service", function() {
	var service,
    	trip,
    	mockLocalStorage;

    beforeEach( function() {
    	module('PottyPottyPotty');

    	trip = {
    		isWee : false,
    		isPoo : false
    	};

		// TODO: This is a duplicate of the mock in addTripController.spec.js
		//       Can we pull it out to a file to share it?
		mockLocalStorage = {
	        set: jasmine.createSpy(),
	        get: jasmine.createSpy(),
	        setObject: jasmine.createSpy(),
	        getObject: function(key, defaultValue) { return []; }
	    };

    	module(function($provide) {
    		$provide.value('localstorage', mockLocalStorage);
    	});
    });

	function weeTrip(){
		return {
			isWee : true,
			isPoo : false,
			timestamp: "2015-07-28T20:12:29.291Z"
		}
	};

	function pooTrip(){
		return {
			isWee : false,
			isPoo : true,
			timestamp: "2015-07-28T20:12:29.291Z"
		}
	};

	function addWeeTripWithTime(pottyTrips, t){
	  	pottyTrips.setTimeStamper(function(){ return t; });
	  	pottyTrips.add(weeTrip());
	};

	function addPooTripWithTime(pottyTrips, t){
	  	pottyTrips.setTimeStamper(function(){ return t; });
	  	pottyTrips.add(pooTrip());
	};

	describe('local storage usage', function() {
		var fakeTrips,
			wee,
			poo; 

	    beforeEach( function() {
	    	wee =weeTrip();
	    	poo = pooTrip();
	    	fakeTrips = [ wee, poo ];

		    spyOn(mockLocalStorage, 'getObject').and.returnValue( fakeTrips );
	    });

		it('loads trips on start', inject(function(pottyTrips) {
			expect(mockLocalStorage.getObject).toHaveBeenCalledWith('potty-trips', []);
			expect(pottyTrips.trips()).toEqual(fakeTrips);
		}));

		it('saves all trips on add', inject(function(pottyTrips) {
			pottyTrips.add( weeTrip() );
			expect(mockLocalStorage.setObject).toHaveBeenCalledWith('potty-trips', pottyTrips.trips());
		}));

		it('saves all trips on reset', inject(function(pottyTrips) {
			pottyTrips.resetTrips();
			expect(mockLocalStorage.setObject).toHaveBeenCalledWith('potty-trips', []);
		}));

		it('saves trips with specific trip deleted on remove', inject(function(pottyTrips) {
			pottyTrips.remove(wee);

			expect(mockLocalStorage.setObject).toHaveBeenCalledWith('potty-trips', [ poo ]);
		}));
	});

	describe('Resetting potty trips', function() {
	  it('removes all trips', inject(function(pottyTrips) {
	  	pottyTrips.add( weeTrip() );
	  	pottyTrips.resetTrips();
	    expect(pottyTrips.trips().length).toEqual(0);
	  }));
	});

	describe('Adding a potty trip', function() {
	  it('nothing is added initially', inject(function(pottyTrips) {
	    expect(pottyTrips.trips().length).toEqual(0);
	  }));

	  it('adding a trip adds to array', inject(function(pottyTrips){
	  	trip.isWee = true;

	  	pottyTrips.add(trip);

	  	expect(pottyTrips.trips().length).toEqual(1);
	  }));

	  it('added trips are saved in the trips array', inject(function(pottyTrips){
	  	trip.isWee = true;
	  	pottyTrips.add(trip);

	  	expect(pottyTrips.trips()[0].isWee).toEqual(true);
	  }));

	  it('added trips are copied', inject(function(pottyTrips){
	  	trip.isPoo = true;
	  	pottyTrips.add(trip);

	  	trip.isPoo = false;

	  	expect(pottyTrips.trips()[0].isPoo).toEqual(true);
	  }));

	  it('trips are not added if no wee or poo', inject(function(pottyTrips){
	  	trip.isWee = false;
	  	trip.isPoo = false;

	  	pottyTrips.add(trip);

	    expect(pottyTrips.trips().length).toEqual(0);
	  }));

	  it('current timestamp set when trip added', inject(function(pottyTrips){
	  	var now = new Date();
	  	var nowPlusSecond = new Date(now.getTime() + 1000);
	  	var nowMinusSecond = new Date(now.getTime() - 1000);

	  	pottyTrips.add(weeTrip());

	  	expect(pottyTrips.trips()[0].timestamp).toBeGreaterThan(nowMinusSecond);
	  	expect(pottyTrips.trips()[0].timestamp).toBeLessThan(nowPlusSecond);
	  }));

	  it('records timestamp of last wee trip', inject(function(pottyTrips){
	  	var now = new Date();
	  	addWeeTripWithTime(pottyTrips, now);

	  	addPooTripWithTime(pottyTrips, new Date(now.getTime() + 5000));

	  	var nowPlusTenSeconds = new Date(now.getTime() + 10000);
	  	addWeeTripWithTime(pottyTrips, nowPlusTenSeconds);

	  	var lastTrip = pottyTrips.trips()[pottyTrips.trips().length-1];
	  	expect(lastTrip.timestampOfPreviousWee).toEqual(now);
	  	expect(lastTrip.timestampOfPreviousPoo).toEqual(undefined);
	  }));

	  it('records timestamp of last poo trip', inject(function(pottyTrips){
	  	var now = new Date();
	  	addPooTripWithTime(pottyTrips, now);

	  	addWeeTripWithTime(pottyTrips, new Date(now.getTime() + 5000));

	  	var nowPlusTenSeconds = new Date(now.getTime() + 10000);
	  	addPooTripWithTime(pottyTrips, nowPlusTenSeconds);

	  	var lastTrip = pottyTrips.trips()[pottyTrips.trips().length-1];
	  	expect(lastTrip.timestampOfPreviousPoo).toEqual(now);
	  	expect(lastTrip.timestampOfPreviousWee).toEqual(undefined);
	  }));
	});

	describe('Removing a potty trip', function(){
		
	  it('ignores remove request if trip list is empty', inject(function(pottyTrips){
	  	var trip = weeTrip();
	  	trip.timestamp = new Date(Date.now());
	  	pottyTrips.remove(trip);

	  	expect(pottyTrips.trips().length).toEqual(0);
	  }));	  


	  it('removes a trip by timestamp decrements trip list', inject(function(pottyTrips){
	  	var now = Date.now();
	  	var firstTimestamp = new Date(now);
	  	var secondTimestamp = new Date(now + 10000);
	  	var thirdTimestamp = new Date(now + 20000);

	  	addWeeTripWithTime(pottyTrips, firstTimestamp);
	  	addWeeTripWithTime(pottyTrips, secondTimestamp);
	  	addWeeTripWithTime(pottyTrips, thirdTimestamp);

	  	var trip = weeTrip();
	  	trip.timestamp = secondTimestamp;
	  	pottyTrips.remove(trip);

	  	expect(pottyTrips.trips().length).toEqual(2);
	  }));

	  it('removes a trip by timestamp removing the specific trip only', inject(function(pottyTrips){
	  	var now = Date.now();
	  	var firstTimestamp = new Date(now);
	  	var secondTimestamp = new Date(now + 1);
	  	var thirdTimestamp = new Date(now + 2);

	  	addWeeTripWithTime(pottyTrips, firstTimestamp);
	  	addWeeTripWithTime(pottyTrips, secondTimestamp);
	  	addWeeTripWithTime(pottyTrips, thirdTimestamp);

	  	var trip = weeTrip();
	  	trip.timestamp = secondTimestamp;
	  	var index = pottyTrips.remove(trip);

	  	expect(index).toEqual(1);
	  	expect(pottyTrips.trips()[0].timestamp).toEqual(firstTimestamp);
	  	expect(pottyTrips.trips()[1].timestamp).toEqual(thirdTimestamp);
	  }));

	  it('does not remove a trip if no trip timestamps match', inject(function(pottyTrips){
	  	var now = Date.now();
	  	var firstTimestamp = new Date(now);
	  	var secondTimestamp = new Date(now + 1);
	  	var thirdTimestamp = new Date(now + 2);

	  	addWeeTripWithTime(pottyTrips, firstTimestamp);
	  	addWeeTripWithTime(pottyTrips, secondTimestamp);
	  	addWeeTripWithTime(pottyTrips, thirdTimestamp);

	  	var trip = weeTrip();
	  	trip.timestamp = new Date(Date.now() + 10000);
	  	var index = pottyTrips.remove(trip);

	  	expect(pottyTrips.trips().length).toEqual(3);
	  }));
	});
});
