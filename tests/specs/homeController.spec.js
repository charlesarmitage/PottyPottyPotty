'use strict';

describe("Home Controller", function() {
    beforeEach(module('PottyPottyPotty'));

	var $scope,
		$controller;

	beforeEach(inject(function(_$controller_){

	   $scope = {};
	   function buildController(){
	   		return _$controller_('HomeController', { $scope: $scope });
	   };

	   $controller = buildController();
	}));

    afterEach(function() {
    });

	describe('Potty Trip List', function() {
	  it('is empty', function() {

	    expect($scope.pottyTrips.length).toEqual(0);
	  });

	  // TODO: Work out a way of testing the adding of data to the home controller
	});
});
