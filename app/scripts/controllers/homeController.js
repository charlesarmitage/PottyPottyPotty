'use strict';

/**
 * @ngdoc function
 * @name PottyPottyPotty.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('PottyPottyPotty')
  .controller('HomeController', function($scope, ExampleService) {

    $scope.myHTML = null;

    // just an example...
    $scope.fetchRandomText = function() {
      ExampleService.doSomethingAsync()
        .then(ExampleService.fetchSomethingFromServer)
        .then(function(response) {
            $scope.myHTML = response.data.text;
            // close pull to refresh loader
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.fetchRandomText();

  });
