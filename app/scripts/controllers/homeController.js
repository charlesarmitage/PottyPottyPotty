'use strict';

/**
 * @ngdoc function
 * @name PottyPottyPotty.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('PottyPottyPotty')
  .controller('HomeController', function($scope) {

    $scope.pottyTrips = [];

    $scope.myHTML = null;
  });
