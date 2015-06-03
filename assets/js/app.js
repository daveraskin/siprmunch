siprmnchAngular = angular.module('siprmnchAngular', ['ngMaterial', 'ngRoute','ngResource', 'bootstrap.fileField'])

siprmnchAngular.run(['$rootScope', 'userService',function($rootScope, userService) {


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
  .when('/createPost', {
    templateUrl: 'views/pages/createPost.html',
    controller: 'homeCtrl'
  })
  .when('/businesses/:businessId', {
    templateUrl: 'views/pages/businessShow.html',
    controller: 'photoCtrl'
  })

  $locationProvider.hashPrefix('!')

}])