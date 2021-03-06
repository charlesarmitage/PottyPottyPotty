'use strict';

/**
 * @ngdoc overview
 * @name PottyPottyPotty
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('PottyPottyPotty', ['angularMoment', 'ionic', 'ngCordova', 'ngResource', 'ionic-timepicker'])

  .run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {
      // save to use plugins here
    });

    // add possible global event handlers here

  })

  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');

    // Application routing
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/main.html',
        controller: 'MainController'
      })
      .state('app.home', {
        url: '/home',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/home.html',
            controller: 'HomeController'
          }
        }
      })
      .state('app.addTrip', {
        url: '/add',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/add.html',
            controller: 'AddTripController'
          }
        }
      })
      .state('app.settings', {
        url: '/settings',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/settings.html',
            controller: 'SettingsController'
          }
        }
      })
      .state('app.about', {
        url: '/about',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/about.html',
            controller: 'AboutController'
          }
        }
      })
      .state('app.debug', {
        url: '/debug',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/debug.html',
            controller: 'DebugController'
          }
        }
      });

    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/app/home');
  });


