'use strict';

angular.module('PottyPottyPotty')
  // use factory for services
  .factory('TimestampService', function() {

    var nowUtcMs = function() {
      return new Date();
    };

    var setNowProvider = function(newNowProvider) {
      nowUtcMs = newNowProvider;
    };

    var timezoneOffsetSecs = function () {
      return new Date().getTimezoneOffset() * 60;
    };

    var setTimezoneOffsetProvider = function(newTimezoneOffsetProvider) {
      timezoneOffsetSecs = newTimezoneOffsetProvider;
    };

    var epochUTCTimeSecs = function() {
      return nowUtcMs() / 1000;
    };

    var epochLocalTimeSecs = function() {
      return toLocal(epochUTCTimeSecs());
    };

    var toUtc = function (localTimeSeconds) {
      return localTimeSeconds + timezoneOffsetSecs();
    };

    var toLocal = function (utcTimeSeconds) {
      return utcTimeSeconds - timezoneOffsetSecs();
    };

    var secsToDate = function (secondsSinceEpoch) {
      return new Date(secondsSinceEpoch * 1000);
    };

    var toTodaysDate = function(date) {
      var today = new Date(nowUtcMs());
      date.setDate(today.getDate());
      date.setMonth(today.getMonth());
      date.setYear(today.getYear());
      return date;
    };

    // public api
    return {
      setNowProvider: setNowProvider,
      setTimezoneOffsetProvider : setTimezoneOffsetProvider,
      now : {
        epochSecs : {
          utc :  epochUTCTimeSecs,
          local : epochLocalTimeSecs
        }
      },
      convert : {
        toUtc : toUtc,
        toLocal : toLocal,
        secsToDate : secsToDate,
        toTodaysDate : toTodaysDate
      }
    };

  });
