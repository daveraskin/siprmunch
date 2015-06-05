siprmnchAngular.controller('authCtrl', ['$scope', '$http', '$location', 'userInfo', '$mdBottomSheet', '$rootScope', function($scope, $http, $location, userInfo, $mdBottomSheet, $rootScope){


  console.log('authCtrl loaded');
  $scope.formData = {
    email: null,
    username: null,
    password: null,
    firstName: null,
    lastName: null
  }
  $rootScope.error = false;

  $scope.logIn = function(provider, identifier, password){
    if(provider === null || provider === 'firstLogin'){
      $http.post('/auth/local', {identifier: identifier, password: password})
      .success(function(data){
        if(data.success === true){
           $rootScope.error = false;
           $mdBottomSheet.hide()
           $rootScope.loggedIn = true;
           if(provider === 'firstLogin'){
            $location.path('/newProfPic')
          }else{
           $location.path('/')
          }
         }else{
          $rootScope.error = true;
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
    $http.post('/auth/local/register', {username: $scope.formData.username, email: $scope.formData.email, password: $scope.formData.password})
    .success(function(data){
      if(data.success === true){
        $http.post('/api/userInfo', {
          email: $scope.formData.email,
          username: $scope.formData.username,
          firstName: $scope.formData.firstName,
          lastName: $scope.formData.lastName,
          user: data.user,
          attending: null,
          profPic: 'tcw4zivjx6th0s97hnmo'
        })
        $scope.logIn('firstLogin', $scope.formData.username, $scope.formData.password)
      }else{
        $rootScope.error = true
      }
    })

  }
  $scope.closeBottomSheet = function(){
    $mdBottomSheet.hide()
  }


}])