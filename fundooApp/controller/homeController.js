app.controller('homeCtrl',function($mdSidenav,$state,$scope){

  $scope.toggleLeft = buildToggler('left');

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }

  $scope.Logout = function() {
    $state.go('Login');
  }

$scope.mdIconProvider=function(){
  $mdIconProvider
     .iconSet('call', 'img/icons/sets/communication-icons.svg', 24);
}
})
