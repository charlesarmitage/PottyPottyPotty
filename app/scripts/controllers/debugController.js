'use strict';

angular.module('PottyPottyPotty')
  .controller('DebugController', function($scope, pottyTrips) {
    $scope.resetTrips = function(){
        pottyTrips.resetTrips();
        // TODO: Should this be in a '$apply' so it notifies
        //       angular of data changes?
        //       When added to an apply it never seems to execute...
        // $scope.$apply(function() {
            // pottyTrips.resetTrips();
        // });
    };
  });
