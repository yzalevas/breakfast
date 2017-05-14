angular.module('breakfast.services', [])
.factory('geolocation', ['$q',function($q) {
    
    var o = {
      currentLocation :{}  
    };
    
    o.getCurrentPosition = function () {
        var q = $q.defer();
        navigator.geolocation.getCurrentPosition(function(position) {
          o.currentLocation = {
            'lat': position.coords.latitude,
            'lon': position.coords.longitude
          };
          q.resolve(o.currentLocation);
        }, function(error) {
          console.log('Got error :' +error);
          q.reject('Failed to get coordinates of surrent position');
        });
        return q.promise;
      };
    
    o.distance = function(position1,position2) {
    	var radlat1 = Math.PI * position1.lat/180;
    	var radlat2 = Math.PI * position2.lat/180;
    	var theta = position1.lon-position2.lon;
    	var radtheta = Math.PI * theta/180;
    	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    	dist = Math.acos(dist);
    	dist = dist * 180/Math.PI;
    	dist = dist * 60 * 1.1515;
    	return dist * 1.609344;
    };
    
    return o;
  }
])
.factory('groupon',function($http,GROUPON,geolocation){
    var o = {
        token: '',
        products :[],
        baseURL: GROUPON.baseURL
    };
    
      o.login = function() {

         return $http({
          method: 'POST',
          url: GROUPON.url + 'loginUser',
          headers:{
              'Content-Type': "application/x-www-form-urlencoded",
          },
          data: "userName=saleshiran&password=12345678"
        }).success(function(response){
          // merge data into the queue
          o.token = response.data.token;
        }).error(function(data, status) {
            console.error('Repos error', status, data);
        });
      };
     // set session data
      o.populateBreakfastProducts = function() {
          
          if (!o.token) {
              throw "token is empty, please login";
          }
          
          return $http({
          method: 'GET',
          url: GROUPON.url + 'getProducts/',
          params: { token: o.token,
                    categoryId: GROUPON.breakfastCategory}
        }).success(function(response){
              geolocation.getCurrentPosition().then(function(position){
                  
                  var index = 0;
                  for (var key in response.data) {
                      var product = response.data[key];
                      product.distance =  geolocation.distance(position, product.gps);
                      
                      o.products[index] = product;
                      index++;
                  }
                  
                  o.products.sort(function(a,b){
                     return a.distance - b.distance;
                  });
              });
        });
      };

    return o;
});
