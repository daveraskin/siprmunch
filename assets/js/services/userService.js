siprmnchAngular.factory('userService', ['$http', function($http){

  return {

    check: function(callback){

      var self = this;

      $http.get('/authenticate')
      .success(function(data){
        if(data === true){
          self.loggedIn = true;
        }else{
          self.loggedIn = false;
        }
        callback(null, data)

      })
      .error(function(err){
        callback(err);
      })

    }

  }



}])