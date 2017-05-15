angular.module('breakfast.controllers', ['breakfast.services','ionic', 'jett.ionic.filter.bar'])

.controller('MainCtrl', function($scope,$ionicLoading, groupon, $ionicFilterBar,$timeout) {
    
    $scope.products =[];
    
    $scope.baseURL = groupon.baseURL;
    
      // helper functions for loading
    var showLoading = function() {
      $ionicLoading.show({
        template: '<i class="ion-loading-c"></i>' + 'טוען הצעות...',
        noBackdrop: false,
        animation: 'fade-in',
        showDelay: 0
      });
    };

    var hideLoading = function() {
      $ionicLoading.hide();
    };
  
    // set loading to true first time while we retrieve songs from server.
    showLoading();
    
    groupon.login().then(function(){
      groupon.populateBreakfastProducts().then(function(){
         $scope.products = groupon.products;
         hideLoading();
      });
    });
    
    $scope.showFilterBar = function(){
       $ionicFilterBar.show({
        items: $scope.products,
        update: function (filteredItems, filterText) {
          $scope.products = filteredItems;
          if (filterText) {
            console.log(filterText);
          }
        }
      });
    };
    
    $scope.getImage = function(imgSrc){
        return groupon.baseURL + imgSrc;
    };
    $scope.openWebBrowser = function(targetURL){
    window.open(targetURL, '_system', 'location=yes');
  };
});