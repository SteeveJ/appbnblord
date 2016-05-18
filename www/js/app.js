// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'ngMaterial', 'ngCordova', 'md.data.table',
  // Addons
  'ui.router', 'angular-storage', 'angular-jwt',
  // Controllers
  'login.controllers', 'menu.controllers', 'profile.controllers', 'missionDetail.controllers', 'TakeAPhoto.controllers',
  // Services
  'servicesJWT', 'servicesLogin', 'servicesMissions'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
      //cordovaPlugin.someFunction().then(success, error);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    // Page de Login
    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "LoginCtrl",
      controllerAs: 'vm'
    })
    .state('app', {
      abstract: true,
      url: "/app",
      templateUrl: "templates/menu.html",
      controller: "MenuCtrl",
      controllerAs: 'vm',
      cache: false
    })
    .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: "ProfileCtrl",
          controllerAs: 'vm'
        }
      },
      cache: false
    })
    .state('app.missionDetail', {
      url: "/detail/:id",
      views: {
        'menuContent': {
          templateUrl: 'templates/missionDetail.html',
          controller: "MissionDetailCtrl",
          controllerAs: 'vm'
        }
      },
      cache: false
    })
    .state('app.travellerArrived', {
      url: "/travellerArrived/:id",
      views: {
        'menuContent': {
          templateUrl: 'templates/travellerArrived.html',
          controller: "MissionDetailCtrl",
          controllerAs: 'vm'
        }
      },
      cache: false
    })
    .state('app.travellerNotArrived', {
      url: "/travellerNotArrived/:id",
      views: {
        'menuContent': {
          templateUrl: 'templates/travellerNotArrived.html',
          controller: "MissionDetailCtrl",
          controllerAs: 'vm'
        }
      },
      cache: false
    })
    .state('app.delivery', {
      url: "/delivery/:id",
      views: {
        'menuContent': {
          templateUrl: 'templates/delivery.html',
          controller: "MissionDetailCtrl",
          controllerAs: 'vm'
        }
      },
      cache: false
    })
    .state('app.bedding', {
      url: "/bedding/:id",
      views: {
        'menuContent': {
          templateUrl: 'templates/bedding.html',
          controller: "MissionDetailCtrl",
          controllerAs: 'vm'
        }
      },
      cache: false
    })
    .state('app.inventory', {
      url: "/inventory/:id",
      views: {
        'menuContent': {
          templateUrl: 'templates/inventory.html',
          controller: "TakeAPhotoCtrl",
          controllerAs: 'vm'
        }
      },
      cache: false
    })
    .state('app.problem', {
      url: "/problem/:id",
      views: {
        'menuContent': {
          templateUrl: 'templates/problem.html',
          controller: "TakeAPhotoCtrl",
          controllerAs: 'vm'
        }
      },
      cache: false
    })
  ;
  $urlRouterProvider.otherwise('/login');
});
