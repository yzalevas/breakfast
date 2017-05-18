// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('breakfast', ['ionic', 'breakfast.controllers','jett.ionic.filter.bar'])


.run(function($ionicPlatform,$rootScope,$state) {
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
    
    /*if (typeof window.ga !== 'undefined'){
      window.ga.startTrackerWithId("UA-99370608-1");
      window.ga.trackView('app');
      window.alert('Analytics 1 was added');
    }
    else {
      window.alert('Google Analytics plugin could not be loaded.');
    }*/
    
    $rootScope.$on('$stateChangeSuccess', function () {
        if(typeof analytics !== 'undefined') {
          analytics.startTrackerWithId("UA-99370608-1");
          analytics.trackView($state.current.name);
        } 
      });
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$ionicFilterBarConfigProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MainCtrl'
  })

    .state('app.main', {
      url: '/main',
       views: {
        'menuContent': {
          templateUrl: 'templates/main.html',
        }
       }
    })
  
    .state('purchase',{
       url: '/purchase',
       templateUrl:'templates/purchase.html',
       controller:'PurchaseCtrl',
       params: {
          productId: 0
        }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
  
//  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicFilterBarConfigProvider.placeholder('הזן מיקום או שם בית עסק');
})
.constant('GROUPON', {
  // Groupon server
  url: 'https://affiliate.grouponisrael.co.il/affiliate/server/1.0/',
  userName: 'saleshiran',
  password: '12345678',
  breakfastCategory:206,
  baseURL: 'https://www.grouponisrael.co.il'
})
.constant('app',{
  rateUrl:'https://play.google.com/store/apps/details?id=com.ionicframework.myapp640224'
});
