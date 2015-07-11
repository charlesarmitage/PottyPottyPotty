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
      getObject: function(key, defaultValue) {
        var value = $window.localStorage[key];
        if(value === undefined ){
          return defaultValue;
        }
        return JSON.parse(value || '{}');
      }
    };
  }]
);
