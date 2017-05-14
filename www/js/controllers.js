angular.module('breakfast.controllers', ['breakfast.services'])

.controller('MainCtrl', function($scope,$ionicLoading, groupon) {
    
    $scope.products =[];
    
    $scope.baseURL = groupon.baseURL;
    
      // helper functions for loading
    var showLoading = function() {
      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>',
        noBackdrop: true
      });
    };
  
    var hideLoading = function() {
      $ionicLoading.hide();
    };
  
    // set loading to true first time while we retrieve songs from server.
    showLoading();
    
    /*postmanCode();*/
    
    groupon.login().then(function(){
      groupon.populateBreakfastProducts().then(function(){
         $scope.products = groupon.products;
         hideLoading();
      });
    });
    
    $scope.getImage = function(imgSrc){
        return groupon.baseURL + imgSrc;
    };
    $scope.openWebBrowser = function(targetURL){
    window.open(targetURL, '_system', 'location=yes');
  };
});