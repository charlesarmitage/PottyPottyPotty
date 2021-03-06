'use strict';

describe("Add Trip Controller", function() {
	var customMatchers = {
		toEqualTrip : function() {
			return {
				compare : function(actual, expected) {
					var result = {};

					result.pass = actual.isWee === expected.isWee &&
									actual.isPoo == expected.isPoo;

					if(result.pass){
						result.message = "Actual trip equals expected trip";
					} else {
						result.message = "Mismatch : "
										+ "Actual {isWee:" + actual.isWee
										+ ", isPoo:" + actual.isPoo +"}"
										+ " does not equal: "
										+ "Expected {isWee:" + expected.isWee
										+ ", isPoo: " + expected.isPoo
										+ "}";
					}
					return result;
				}
			}
		}
	};

	beforeEach(function() {
    	jasmine.addMatchers(customMatchers);
  	});

    beforeEach(module('PottyPottyPotty'));

	var $scope,
		$rootScope,
		$controller,
		pottyTripsMock,
		mockLocalStorage;

	beforeEach(function() {
		// TODO: This is a duplicate of the mock in pottyTripsService.spec.js
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

		inject(function(_$controller_, pottyTrips){
			pottyTripsMock = pottyTrips;

	   		$scope = {};
	   		$rootScope = {};
	 	    function buildController(){
	   			return _$controller_('AddTripController', {
	   				$scope: $scope,
	   			 	pottyTrips: pottyTripsMock });
	   		};

	   		$controller = buildController();
		});
	});

    afterEach(function() {
    });

	describe('Adding a potty trip', function() {
	  it('nothing is selected', function() {

	    expect($scope.trip.isWee).toEqual(false);
	    expect($scope.trip.isPoo).toEqual(false);
	  });

	  it('adding nothing does not update list', function(){

	  	$scope.addTrip($scope.trip);

	  	expect(pottyTripsMock.trips().length).toEqual(0);
	  });

	  it('adding a wee adds the trip to the trips', function(){
	  	$scope.trip.isWee = true;

	  	$scope.addTrip($scope.trip);

	  	expect(pottyTripsMock.trips().length).toEqual(1);
	  	expect(pottyTripsMock.trips()[0]).toEqualTrip({
	  		isWee : true,
	  		isPoo : false
	  	});
	  });

	  it('adding a poo adds the trip to the trips', function(){
	  	$scope.trip.isPoo = true;

	  	$scope.addTrip($scope.trip);

	  	expect(pottyTripsMock.trips().length).toEqual(1);
	  	expect(pottyTripsMock.trips()[0]).toEqualTrip({
	  		isWee : false,
	  		isPoo : true
	  	});
	  });

	  it('adding both a poo and a wee adds the trip to the trips', function(){
	  	$scope.trip.isWee = true;
	  	$scope.trip.isPoo = true;

	  	$scope.addTrip($scope.trip);

	  	expect(pottyTripsMock.trips().length).toEqual(1);
	  	expect(pottyTripsMock.trips()[0]).toEqualTrip({
	  		isWee : true,
	  		isPoo : true
	  	});
	  });

	  it('adding a trip adds a trip with a timestamp to the trips list', function(){
	  	$scope.tripTimeUtc = new Date();
	  	$scope.trip.isWee = true;

	  	$scope.addTrip($scope.trip);

	  	expect(pottyTripsMock.trips()[0].timestamp).toEqual($scope.tripTimeUtc);
	  });

	  it('potty trips are added to end of the trips list', function(){
	  	addTripToController($scope, { poo: true });
	  	addTripToController($scope, { wee: true });

	  	expect(pottyTripsMock.trips().length).toEqual(2);
	  	expect(pottyTripsMock.trips()[1]).toEqualTrip({
	  		isWee : true,
	  		isPoo : false
	  	});
	  });

	  it('current potty trip is reset after added to trips list', function(){
	  	addTripToController($scope, { wee: true, poo: true });

	  	expect($scope.trip.isWee).toEqual(false);
	  	expect($scope.trip.isPoo).toEqual(false);
	  });

	  it('current potty trip is reset after cancel of add', function(){
	  	$scope.trip = { wee: true, poo: true };
  		$scope.cancelAddTrip();

	  	expect($scope.trip.isWee).toEqual(false);
	  	expect($scope.trip.isPoo).toEqual(false);
	  });

	  function addTripToController($scope, trip){
  		$scope.trip.isWee = trip.wee !== undefined ? trip.wee : false;
  		$scope.trip.isPoo = trip.poo !== undefined ? trip.poo : false;
  		$scope.addTrip($scope.trip);
	  }
	});
});
