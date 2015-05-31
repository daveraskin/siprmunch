siprmnchAngular.factory('userInfo',['$resource',function($resource){

  return $resource('/userInfo', null, {
    'update': { method:'PUT' }
  });

}]);