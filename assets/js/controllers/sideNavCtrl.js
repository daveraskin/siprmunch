siprmnchAngular.controller('sideNavCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
$scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };




}])