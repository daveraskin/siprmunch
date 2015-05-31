siprmnchAngular.controller('authCtrl', ['$scope', '$http', '$location', 'userInfo', function($scope, $http, $location, userInfo){


  console.log('authCtrl loaded');
  $scope.formData = {
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: ""
  }
  $scope.error = false;

  $scope.logIn = function(identifier, password){
      $http.post('/auth/local', {identifier: identifier, password: password})
      .success(function(data){
        if(data.success === true){
           $scope.error = false;
           $location.path('/')
         }else{
          $scope.error = true;
         }
      })
      .error(function(data){
        console.log(data)
      })
  };
  $scope.register = function(){
    $http.post('/auth/local/register', {username: $scope.formData.username, email: $scope.formData.email, password: $scope.formData.password})
    .success(function(data){
      if(data.success === true){
        $http.post('/userInfo', {
          userId: data.user,
          email: $scope.formData.email,
          username: $scope.formData.username,
          firstName: $scope.formData.firstName,
          lastName: $scope.formData.lastName
        })
        $location.path('/')
      }else{
        $scope.error = true
      }
    })

  }



}])