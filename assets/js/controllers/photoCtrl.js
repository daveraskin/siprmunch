siprmnchAngular.controller('photoCtrl', ['$scope', '$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http){
  $scope.businessData;
  console.log('photoCtrl running.')
  console.log($routeParams.businessId)
  $http.get('/api/yelpBusiness/'+$routeParams.businessId)
  .success(function(data){
    console.log(data)
    $scope.businessData = data
  })




}])