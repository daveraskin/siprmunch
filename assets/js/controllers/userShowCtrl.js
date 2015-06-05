siprmnchAngular.controller('userShowCtrl', ['$scope', '$http', 'users', 'post', '$mdDialog', function($scope, $http, users, post, $mdDialog){


  $scope.users = users
  $scope.post = post
  $scope.creator;


  $http.get('/api/post/'+ $scope.post)
  .success(function(data){
    console.log('postData', data)
    console.log('users', users)
    $scope.creator = (data.user.id)
    $scope.guests = data.currentAttending - $scope.users.length
  })



}])