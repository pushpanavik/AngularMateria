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

  $scope.changeColor = function()
   {
       $scope.colorValue={};
       $scope.currentcolor = $state.currentColor;
       // console.log("name",$scope.currentcolor.name);
       // console.log("url",$scope.currentcolor.url);
       console.log("current color is",$scope.currentColor);

       switch ($scope.currentcolor) {
           case 'home.dashboard':  $scope.title = "Google keep";
               $scope.definedColor = {
                   'background-color': '#fb0',
                   'color': 'black'
               };
               break;
           case 'home.reminder':  $scope.title = "Reminders";
               $scope.definedColor = {
                   'background-color': '#607d8b',
                   'color': '#ffffff'
               };
               break;
           case 'home.archive':    $scope.title = "Archive";
               $scope.definedColor = {
                   'background-color': '#607d8b',
                   'color': '#ffffff'
               };
               break;
           case 'home.trash'  :    $scope.title = "Trash";
               $scope.definedColor = {
                   'background-color': '#636363',
                   'color': '#ffffff'
               };
               break;

       }
       $scope.colorValue=$scope.definedColor;
       console.log("colorValue",angular.toJson($scope.colorValue));
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
