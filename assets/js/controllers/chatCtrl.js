siprmnchAngular.controller('chatCtrl', ['$scope', '$http', '$location', 'postId', 'chatLog', '$mdDialog',  function($scope, $http, $location, postId, chatLog, $mdDialog){

  $scope.postId = postId;
  $scope.chatLog = chatLog.data;




  console.log('chatlog', $scope.chatLog)

  $scope.postMessage = function(){
    $http.get('/authenticate')
    .success(function(data){
      if(data.authenticated === true){
        console.log(data.userInfo.id)
        var postData = {post: $scope.postId, user: data.userInfo.id, body: $scope.messageBody};
        $scope.messageBody=""
        $http.post('/api/post/'+$scope.postId+'/messages', postData)
        .success(function(data){
           io.socket.post('/api/chat/post', postData, function(data, jwRes){
          console.log('posted data!', data)
        })
        })
      }else{
        alert("you're not logged in!")
      }
    })
  }

  console.log('mdDialog',$mdDialog);

  $scope.closeDialog = function(){

    $mdDialog.hide()
    .then(function(){
       io.socket.post('/api/chat/leave', {post: $scope.postId}, function(data, jwRes){
          console.log('posted data!', data)
        })
    });


  }

  io.socket.on('addchat',function(msg){
      $scope.$evalAsync(function(){
        console.log('msg', msg)
        $scope.chatLog.push(msg);
      });
    });


}])