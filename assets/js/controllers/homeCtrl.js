siprmnchAngular.controller('homeCtrl', ['$scope', '$http', 'userService', 'yelpService','$q', '$location', function($scope, $http, userService, yelpService, $q, $location){
  console.log('home CTrl loaded')

  $scope.posts;
  $scope.yelpTerm;
  $scope.postData = {
    body: null,
    location: null,
    type: null,
    currentAttending: null,
    maxAttending: null
  }
  $scope.yelpResults = [];
  $scope.currentUser = {
    firstName: null,
    lastName:null,
    email: null,
    avatar: null,
    username: null
  }
  $scope.loggedIn;


  $scope.isLoggedIn = function(){
    $http.get('/authenticate')
    .success(function(data){
      if(data.authenticated === true){
        $scope.loggedIn = true
      }else{
        $scope.loggedIn = false
      }
    })
  }
  $scope.isLoggedIn();


// Load posts
  $scope.loadPosts = function(){
    io.socket.get('/api/post', function(data, jwRes) {
      $scope.$evalAsync(function(){
        $scope.posts = data;
  })

  })
  }

  $scope.loadPosts();

  io.socket.on('post', function(msg){
    if(msg && msg.verb){
          $scope.$evalAsync(function(){
            $scope.posts.push(msg.data)
          });
        }
      })

  $scope.usernameFinder = function(userId){
    $http.get('/api/user')
    .success(function(data){
      console.log(data)
    })
  }
// end load posts

// create post
  $scope.createPost = function(){
    var userId;
    $http.get('/authenticate')
    .success(function(data){
      userId = data.user;
      userInfoId = data.userInfo.id;
      console.log('location', $scope.postData.location)
      var currentAttending = parseInt($scope.postData.currentAttending);
      var maxAttending = parseInt($scope.postData.maxAttending);
      $http.post('/api/userInfo/'+userInfoId+'/posts', {body: $scope.postData.body, locationName: $scope.postData.location.name, locationId: $scope.postData.location.id, type: $scope.postData.type, currentAttending: currentAttending, maxAttending: maxAttending})
      .success(function(data){
      console.log(data)
      $location.path('/')
      })
      .error(function(error){
        console.log(error)
        alert(error)
      })
    })
  }
//

// Yelp and autocomplete bullshit

  $scope.yelpSearch = function(term){
    var deferred = $q.defer();
    $http.get('/api/yelp/'+term)
    .success(function(data){
      console.log(data)
      deferred.resolve( data.data.businesses );
    }).error(function(data) {
      deferred.resolve([]);
    })
    return deferred.promise;
  }

// file load

 $scope.doUpload = function(){

        console.log('title',$scope.title);
        console.log('uploadFile',$scope.uploadFile);
        var fd = new FormData();
        fd.append('newPicture', $scope.uploadFile);

        $http.post('/api/fileUpload', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
            console.log(data);
        })
        .error(function(err){
            alert('there was an error uploading the file.');
            console.log(err);
        });
    }

}])