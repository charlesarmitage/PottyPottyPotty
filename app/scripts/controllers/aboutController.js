'use strict';

angular.module('PottyPottyPotty')
  .controller('AboutController', function($scope) {

    $scope.version = '???';

    if(typeof cordova !== 'undefined'){
        cordova.getAppVersion(function (appversion) {
            $scope.version = appversion;
        });
    }
});
