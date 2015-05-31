siprmnchAngular = angular.module('siprmnchAngular', ['ngMaterial', 'ngRoute','ngResource'])

siprmnchAngular.run(['$rootScope', 'userService',function($rootScope, userService) {
  userService.check(function(data){
    console.log(userService.loggedIn)
    $rootScope.loggedIn = userService.loggedIn
  })

}])

siprmnchAngular.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $routeProvider
  .when('/', {
    templateUrl: 'views/homeView.html',
    controller: 'homeCtrl'
  })
  .when('/login', {
    templateUrl: 'views/auth/login.html',
    controller: 'authCtrl'
  })
  .when('/register', {
    templateUrl: 'views/auth/register.html',
    controller: 'authCtrl'
  })

  $locationProvider.hashPrefix('!')

}])