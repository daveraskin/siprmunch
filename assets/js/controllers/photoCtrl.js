siprmnchAngular.controller('photoCtrl', ['$scope', '$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http){
  $scope.businessData;
  console.log('photoCtrl running.')
  console.log($routeParams.businessId)
  $http.get('/api/yelpBusiness/'+$routeParams.businessId)
  .success(function(data){
    console.log(data)
    $scope.businessData = data
  })
  $http.post('/api/getPhotos', {businessId: $routeParams.businessId})
  .success(function(data){
    $scope.photos=data
  })


  $scope.doUpload = function(profile){

        console.log('title',$scope.title);
        console.log('uploadFile',$scope.uploadFile);
        var fd = new FormData();
        fd.append('newPicture', $scope.uploadFile);

        console.log()

      $http.get('/authenticate')
      .success(function(userData){
        if(userData.authenticated === true){
           $http.post('/api/fileUpload', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(pictureData){
          if(profile === true){
            $http.put('/api/userInfo/'+ userData.userInfo.id, {profPic: pictureData.public_id})
            .success(function(uploadData){
              $location.path('/')
            })

          }else{
            $http.post('/api/userInfo/' + userData.userInfo.id + '/pictures', {hash: pictureData.public_id, userInfo: userData.userInfo.id, business: $routeParams.businessId})
            .success(function(uploadData){
              console.log(uploadData)
              $location.path('/')
            })
          }
        })
        .error(function(err){
            alert('there was an error uploading the file.');
            console.log(err);
        });

        }else{
          alert("you're not logged in!")
        }
      })


    }



}])