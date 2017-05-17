// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('breakfast', ['ionic', 'breakfast.controllers','jett.ionic.filter.bar'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$ionicFilterBarConfigProvider) {
  $stateProvider

    .state('main', {
    url: '/',
    templateUrl: 'templates/main.html',
    controller: 'MainCtrl'
    })
  
    .state('purchase',{
       url: '/purchase',
       templateUrl:'templates/purchase.html',
       controller:'PurchaseCtrl',
       params: {
          productUrl: ''
        }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
  
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicFilterBarConfigProvider.placeholder('הזן מיקום או שם בית עסק');
})
.constant('GROUPON', {
  // Groupon server
  url: 'https://affiliate.grouponisrael.co.il/affiliate/server/1.0/',
  userName: 'saleshiran',
  password: '12345678',
  breakfastCategory:206,
  baseURL: 'https://www.grouponisrael.co.il'
});
