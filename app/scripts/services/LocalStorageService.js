'use strict';

angular.module('PottyPottyPotty')
  .factory('localstorage', ['$window', function($window) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        if($window.localStorage[key] === false ){
          return undefined;
        }
        return JSON.parse($window.localStorage[key] || '{}');
      }
    };
  }]
);
