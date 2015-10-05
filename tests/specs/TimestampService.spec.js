'use strict';

describe("Timestamp Service", function() {
    beforeEach( function() {
    	module('PottyPottyPotty');
    });

	describe('Epcoh & UTC api', function() {
	    beforeEach( function() {
	    });

		it('returns current UTC time as seconds since epoch', inject(function(TimestampService) {
			TimestampService.setNowProvider(function() {
				return new Date("1 Jan 1970 00:01:00");
			});

			expect(TimestampService.now.epochSecs.utc()).toEqual(60);
		}));

		it('returns current local time as seconds since epoch', inject(function(TimestampService) {
			TimestampService.setNowProvider(function() {
				return new Date("1 Jan 1970 01:00:00");
			});

			TimestampService.setTimezoneOffsetProvider( function() {
				return -60 * 60; // BST
			});

			var twoHoursAsSeconds = 2 * 60 * 60;
			expect(TimestampService.now.epochSecs.local()).toEqual(twoHoursAsSeconds);
		}));

		it('converts local time in seconds to utc in seconds', inject(function(TimestampService) {
			TimestampService.setTimezoneOffsetProvider( function() {
				return -60 * 60; // BST
			});

			expect(TimestampService.convert.toUtc(7200)).toEqual(3600);
		}));

		it('converts utc time in seconds to local time in seconds', inject(function(TimestampService) {
			TimestampService.setTimezoneOffsetProvider( function() {
				return -60 * 60; // BST
			});

			expect(TimestampService.convert.toLocal(3600)).toEqual(7200);
		}));

		it('converts time in seconds to date', inject(function(TimestampService) {
			expect(TimestampService.convert.secsToDate(3600))
											.toEqual(new Date("1 Jan 1970 01:00:00"));
		}));		

		it('sets timestamp to todays date', inject(function(TimestampService) {
			TimestampService.setNowProvider(function() {
				return new Date("July 14, 1998 03:24:00");
			});

			expect(TimestampService.convert.toTodaysDate(new Date("1 Jan 1970 01:00:00")))
											.toEqual(new Date("14 Jul 1998 01:00:00"));
		}));
	});
});
