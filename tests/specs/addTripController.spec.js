'use strict';

describe("Add Trip Controller", function() {
    beforeEach(module('PottyPottyPotty'));

	var $scope,
		$rootScope,
		$controller,
		pottyTripsMock;

	beforeEach(inject(function(_$controller_, pottyTrips){
		pottyTripsMock = pottyTrips;

	   $scope = {};
	   $rootScope = {};
	   function buildController(){
	   		return _$controller_('AddTripController', { 
	   			$scope: $scope,
	   			 pottyTrips: pottyTripsMock });
	   };

	   $controller = buildController();
	}));

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
	  	expect(pottyTripsMock.trips()[0]).toEqual({
	  		isWee : true,
	  		isPoo : false
	  	});
	  });

	  it('adding a poo adds the trip to the trips', function(){
	  	$scope.trip.isPoo = true;

	  	$scope.addTrip($scope.trip);

	  	expect(pottyTripsMock.trips().length).toEqual(1);
	  	expect(pottyTripsMock.trips()[0]).toEqual({
	  		isWee : false,
	  		isPoo : true
	  	});
	  });

	  it('adding both a poo and a wee adds the trip to the trips', function(){
	  	$scope.trip.isWee = true;
	  	$scope.trip.isPoo = true;

	  	$scope.addTrip($scope.trip);

	  	expect(pottyTripsMock.trips().length).toEqual(1);
	  	expect(pottyTripsMock.trips()[0]).toEqual({
	  		isWee : true,
	  		isPoo : true
	  	});
	  });

	  it('potty trips are added to end of the trips list', function(){
	  	addTripToController($scope, { poo: true });
	  	addTripToController($scope, { wee: true });

	  	expect(pottyTripsMock.trips().length).toEqual(2);
	  	expect(pottyTripsMock.trips()[1]).toEqual({
	  		isWee : true,
	  		isPoo : false
	  	});
	  });

	  it('current potty trip is reset after added to trips list', function(){
	  	addTripToController($scope, { wee: true, poo: true });

	  	expect($scope.trip).toEqual({
	  		isWee: false,
	  		isPoo: false,
	  	})
	  });

	  function addTripToController($scope, trip){
  		$scope.trip.isWee = trip.wee !== undefined ? trip.wee : false;
  		$scope.trip.isPoo = trip.poo !== undefined ? trip.poo : false;
  		$scope.addTrip($scope.trip);
	  }
	});
});
