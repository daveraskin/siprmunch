siprmnchAngular.controller('authCtrl', ['$scope', '$http', '$location', 'userInfo', '$mdBottomSheet', function($scope, $http, $location, userInfo, $mdBottomSheet){


  console.log('authCtrl loaded');
  $scope.formData = {
    email: null,
    username: null,
    password: null,
    firstName: null,
    lastName: null
  }
  $scope.error = false;

  $scope.logIn = function(provider, identifier, password){
    if(provider === null){
      $http.post('/auth/local', {identifier: identifier, password: password})
      .success(function(data){
        if(data.success === true){
           $scope.error = false;
           $mdBottomSheet.hide()
           $location.path('/')
         }else{
          $scope.error = true;
         }
      })
      .error(function(data){
        console.log(data)
      })
    }else{
      location.href = '/auth/'+provider

      }
     };
  $scope.register = function(){
    $http.post('/auth/local/register', {username: $scope.formData.username, email: $scope.formData.email, password: $scope.formData.password, attending: null})
    .success(function(data){
      if(data.success === true){
        $http.post('/api/userInfo', {
          email: $scope.formData.email,
          username: $scope.formData.username,
          firstName: $scope.formData.firstName,
          lastName: $scope.formData.lastName,
          user: data.user
        })
        $scope.logIn(null, $scope.formData.username, $scope.formData.password)
      }else{
        $scope.error = true
      }
    })

  }



}])