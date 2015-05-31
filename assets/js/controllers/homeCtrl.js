siprmnchAngular.controller('homeCtrl', ['$scope', '$http', 'userService', 'yelpService', function($scope, $http, userService, yelpService){


  yelpService.search('mistral', function(data){
    console.log(yelpService.this)
  })

}])