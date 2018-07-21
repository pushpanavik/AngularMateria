app.controller('homeCtrl',function($mdSidenav,$state,$scope,$window){

  if (localStorage.getItem('token')===null) {
    $state.go('Login');
  }

  $scope.toggleLeft = buildToggler('left');

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();

      var isOpen=$mdSidenav(componentId).isOpen();
      if(isOpen){
      document.getElementById("sidenavId").style.marginLeft="200px";
    }else {
      document.getElementById("sidenavId").style.marginLeft="0px";
    }
    }
  }

  $scope.logout = function() {
    $window.localStorage.clear();
  $state.go('Login');
  }

$scope.gotoTrashPage=function(){
  $state.go("Trash");
}

$scope.goToNote=function(){
  $state.go("Note");
}

$scope.goToArchive=function(){
  $state.go("Archive");
}
$scope.goToReminder=function(){
  $state.go("Reminder");
}
$scope.mdIconProvider=function(){
  $mdIconProvider
     .iconSet('call', 'img/icons/sets/communication-icons.svg', 24);
}
})
