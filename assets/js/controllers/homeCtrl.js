siprmnchAngular.controller('homeCtrl', ['$scope', '$http','$q', '$location', '$mdMedia', '$mdSidenav', '$mdBottomSheet', '$mdDialog', '$mdToast', '$rootScope',  function($scope, $http, $q, $location, $mdMedia, $mdSidenav, $mdBottomSheet, $mdDialog, $mdToast, $rootScope){
  console.log('home CTrl loaded')
    $scope.coffee = true;
    $scope.drink = true;
    $scope.bite = true;
    $scope.meal = true;

   $scope.$on('coffee', function() {
    $scope.coffee = !$scope.coffee;
    $scope.loadPosts();
  });
    $scope.$on('drink', function() {
    $scope.drink = !$scope.drink;
    $scope.loadPosts();
  });
   $scope.$on('bite', function() {
    $scope.bite = !$scope.bite;
    $scope.loadPosts();
  });
    $scope.$on('meal', function() {
    $scope.meal = !$scope.meal;
    $scope.loadPosts();
  });

  $scope.buttonClass = function(){
    if($mdMedia('sm')){
      return 'md-mini'
    }
  }
  $scope.glyphClass = function(){
    if($mdMedia('gt-sm')){
      return 'fa-2x'
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

  $scope.isBig;



  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };

  $scope.hasRSVPed = function(postId) {
    if($scope.userInfo){
      return $scope.userInfo.attending === postId ? true : false
    }else{
      return false
    }

  }

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

  $scope.userShow = function(postId){
    var users = [];
    $http.get('/api/userInfo')
    .success(function(data){
      for(var i=0; i < data.length; i++){
        if(parseInt(data[i].attending) === postId){
          users.push(data[i])
        }
      }
      $mdDialog.show({
        templateUrl: 'views/pages/userShow.html',
        controller: 'userShowCtrl',
        locals: {users: users, post: postId},
        clickOutsideToClose: true,
        escapeToClose: true
      })
    })
  }



  $scope.isLoggedIn = function(){
    $http.get('/authenticate')
    .success(function(data){
      if(data.authenticated === true){
        $rootScope.loggedIn = true
        $scope.userInfo = data.userInfo
      }else{
        $rootScope.loggedIn = false
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
        $scope.filter($scope.posts)
      })
    })
  }

  $scope.filter = function(data){
       for(var i = 0; i < data.length; i++){
          if(data[i].type === "Coffee" && $scope.coffee != true){
            $scope.posts.splice(i,1);
            $scope.filter($scope.posts)
          }else if(data[i].type === "Drink" && $scope.drink != true){
            $scope.posts.splice(i,1)
            $scope.filter($scope.posts)
          }else if(data[i].type === "Bite" && $scope.bite != true){
            $scope.posts.splice(i,1)
            $scope.filter($scope.posts)
          }else if(data[i].type === "Meal" && $scope.meal != true){
            $scope.posts.splice(i,1)
            $scope.filter($scope.posts)
          }
        }
        return $scope.posts
  }

  $scope.loadPosts();

  io.socket.on('post', function(msg){
    if(msg && msg.verb){
          $scope.$evalAsync(function(){
            console.log('msg.data', msg.data)
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
      if(data.userInfo.attending === null){
        userId = data.user;
      userInfoId = data.userInfo.id;
      console.log('location', $scope.postData.location)
      var currentAttending = parseInt($scope.postData.currentAttending);
      var maxAttending = parseInt($scope.postData.maxAttending);
      $http.post('/api/userInfo/'+userInfoId+'/posts', {body: $scope.postData.body, locationName: $scope.postData.location.name, locationId: $scope.postData.location.id, type: $scope.postData.type, currentAttending: currentAttending, maxAttending: maxAttending, userInfo: data.userInfo})
      .success(function(postData){
        console.log('postDAta', postData)
        $http.put('/api/userInfo/'+userInfoId, {attending: postData.posts[postData.posts.length - 1].id})
        .success(function(attendingData){
          console.log(data)
          $mdBottomSheet.hide()
            location.href = '/'
        })
        .error(function(error){
        console.log(error)
        alert(error)
      })
      })
      }else{
        $mdToast.show($mdToast.simple().content("No one likes a flake: You cannot create an event if you're already schedule to attend one!"));
      }


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
$scope.joinChat = function(postId){
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
            $scope.hasRSVPed(postId)
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