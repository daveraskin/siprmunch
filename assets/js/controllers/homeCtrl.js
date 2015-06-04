siprmnchAngular.controller('homeCtrl', ['$scope', '$http','$q', '$location', '$mdMedia', '$mdSidenav', '$mdBottomSheet', '$mdDialog', '$mdToast', function($scope, $http, $q, $location, $mdMedia, $mdSidenav, $mdBottomSheet, $mdDialog, $mdToast){
  console.log('home CTrl loaded')
  $scope.isChecked = {
    coffee: true,
    drink: true,
    bite: true,
    meal: true,
  }
  $scope.changeCheck = function(type){
    switch(type){
      case 'coffee':
        !$scope.isChecked.coffee
        break;
      case 'drink':
        !$scope.isChecked.drink
        break;
      case 'bite':
        !$scope.isChecked.bite
        break;
      case 'meal':
        !$scope.isChecked.meal
        break;
    }
  }
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
  $scope.isBig;

  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };

  $scope.openBottomSheet = function(view) {
    if(view === 'login'){
      $mdBottomSheet.show({
        templateUrl: 'views/auth/login.html',
        controller: 'authCtrl'
      });
    }else if(view === 'createPost'){
      $mdBottomSheet.show({
        templateUrl:'views/pages/createPostBottomSheet.html',
        controller: 'homeCtrl'
      })
    }else{
      $mdBottomSheet.show({
        template: '<md-bottom-sheet>Hello, world!</md-bottom-sheet>'
      })
    }

  };


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

 $scope.$watch(function() { return $mdMedia('gt-sm'); }, function(small) {
    $scope.smallScreen = small;
  });

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
      $mdBottomSheet.hide()
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

//chat initialization
$scope.joinChat = function(postId, ev){
  var info = postId
  io.socket.post('/api/chat/join', {postId: info}, function(data){
    console.log('made it this far', data)
    var chatLog = data
      $mdDialog.show({
        templateUrl: 'views/pages/chatRoom.html',
        controller: 'chatCtrl',
        locals: {postId: info, chatLog: chatLog},
        clickOutsideToClose: true,
        escapeToClose: true
      })
      .then(function(){
        console.log('hello!...right?')
      },function(){
        console.log('goodbye!')
      });


  })
};

$scope.rsvp = function(postId){
  $http.get('/api/post/'+postId)
  .success(function(data){
    if(data.currentAttending < data.maxAttending){
      $http.get('/authenticate')
      .success(function(userData){
        if(userData.userInfo.attending != null){
          $mdToast.show($mdToast.simple().content("RSVP Unsuccessful. You may only be attending one event at a time."))
        }else{
          $http.put('/api/userInfo/'+userData.userInfo.id, {attending: postId})
          .success(function(updatedUserData){
          var newAttendance = data.currentAttending + 1;
          newAttendance = parseInt(newAttendance);
          console.log('newAttendance', newAttendance)
          $http.put('/api/post/'+postId, {currentAttending: newAttendance})
          .success(function(updatedPostData){
            $mdToast.show($mdToast.simple().content("RSVP Successful!"));
            $scope.loadPosts()
            console.log(updatedPostData)
        })
          })

      }
      })
    }else{
      $mdToast.show($mdToast.simple().content("RSVP Unsuccessful. This group must be full!"))
    }
  })

}


}])