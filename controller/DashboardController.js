app.controller('DashboardCtrl',function($scope,$mdDialog){
  $scope.showAdvanced = function(ev,item) {
      $mdDialog.show({

        controller: DialogController,
        templateUrl: 'templates/DialogImage.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals:{
            mydata : item
      }
})
  };
function DialogController($scope,mydata){
  $scope.mydata=mydata;
}

});
