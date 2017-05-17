angular.module('breakfast.controllers', ['breakfast.services','ionic', 'jett.ionic.filter.bar','ngCordova'])

.controller('MainCtrl', function($scope,app, groupon, $ionicFilterBar,$state,$cordovaSplashscreen) { 
    
    $scope.products =[];
    
    $scope.baseURL = groupon.baseURL;
    
    if (groupon.products.length >0) {
      $scope.products = groupon.products;
    }
    else {
      groupon.login().then(function(){
        groupon.populateBreakfastProducts().then(function(){
           $scope.products = groupon.products;
//           navigator.splashscreen.hide();
           $cordovaSplashscreen.hide();
        });
      });
    }
    
    $scope.showFilterBar = function(){
       $ionicFilterBar.show({
        items: $scope.products,
        update: function (filteredItems, filterText) {
          $scope.products = filteredItems;
        }
      });
    };
    
    $scope.getImage = function(imgSrc){
        return groupon.baseURL + imgSrc;
    };
    
    $scope.rateUs = function() {
        window.open(app.rateUrl, '_system', 'location=yes');
    };
    
    $scope.openWebBrowser = function(targetURL){
        $state.go('purchase',{ productUrl:targetURL});
  };
})

.controller('PurchaseCtrl',function($scope,$stateParams,$ionicHistory,$sce) {
   $scope.productUrl =  $sce.trustAsResourceUrl( $stateParams.productUrl); 
   
    $scope.goBack = function() {
      $ionicHistory.goBack();
   };
});