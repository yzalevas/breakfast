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
    
    $scope.purchaseProduct = function(productId){
        $state.go('purchase',{ productId: productId});
  };
})

.controller('PurchaseCtrl',function($scope,$stateParams,$ionicHistory,$sce,$cordovaSocialSharing,groupon) {
   
   $scope.purchaseProduct = {};
   $scope.productUrl  = '';
   
    $scope.$on('$ionicView.enter', function(){
        $scope.purchaseProduct = groupon.products[$stateParams.productId];
        $scope.productUrl =  $sce.trustAsResourceUrl( $scope.purchaseProduct.product_url); 
  });
   
   $scope.viewInit = function(){
       
   };
   
    $scope.getImage = function(imgSrc){
        return groupon.baseURL + imgSrc;
    };
   
    $scope.goBack = function() {
      $ionicHistory.goBack();
   };
   
   $scope.share = function(){
         $cordovaSocialSharing.share($scope.purchaseProduct.short_title + ' ' +$scope.purchaseProduct.title, $scope.purchaseProduct.short_title,
                                     $scope.getImage($scope.purchaseProduct.image), 
                                     $scope.purchaseProduct.product_url);
   };
});