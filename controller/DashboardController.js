app.controller('DashboardCtrl',function($scope,$mdDialog){
  $scope.showAdvanced = function(ev,jsonRecord) {
      $mdDialog.show({

        controller: DialogController,
        templateUrl: 'templates/DialogImage.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals:{
      jsonRecord : jsonRecord
      },

      })
      };
 }
)
