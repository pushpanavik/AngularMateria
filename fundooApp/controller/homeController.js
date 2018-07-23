app.controller('homeCtrl',function($mdSidenav,$state,$scope,$window,$rootScope){

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

  $scope.logoutCard = false;
     $scope.logOut = function() {
       if ($scope.logoutCard === false) {
         $scope.logoutCard = true;
         $window.localStorage.clear();
       } else {
         $scope.logoutCard = false;
       }
     }



 $scope.changeColor = function() {
     if ($state.is('home.dashboard')) {
       $scope.title = "Google keep";
           $scope.definedColor = {
               'background-color': '#fb0',
               'color': 'black'
     }
   }
      else if ($state.is('home.archive')) {
       $scope.title = "Archive";
           $scope.definedColor = {
               'background-color': '#607d8b',
               'color': '#ffffff'
           };
         }
      else if ($state.is('home.trash')) {
        $scope.title="Trash";
        $scope.definedColor = {
            'background-color': '#636363',
            'color': '#ffffff'
        };
     }
     else if($state.is('home.reminder')){
          $scope.title = "Reminder";
              $scope.definedColor = {
                  'background-color': '#607d8b',
                  'color': '#ffffff'
              };
            }
   };
   $scope.changeColor();

$scope.gotoTrashPage=function(){
  $state.go("home.trash");
}

$scope.goToNote=function(){
  $state.go("home.note");
}

$scope.goToArchive=function(){
  $state.go("home.archive");
}
$scope.goToReminder=function(){
  $state.go("home.reminder");
}
$scope.mdIconProvider=function(){
  $mdIconProvider
     .iconSet('call', 'img/icons/sets/communication-icons.svg', 24);
}
})
