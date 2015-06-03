siprmnchAngular.factory('yelpService', ['$http', function($http){

    return {

      search: function(term, callback){
        var self = this;
        $http.post('/api/yelp', {term: term})
        .success(function(data){
          self.result = data
          callback(null, data)
        })
        .error(function(error){
          callback(error)
        })
      }
    }


}])