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

})
