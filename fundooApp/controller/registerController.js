app
  .controller('RegisterCtrl', function($scope,$state) {
    $scope.showHints = true;
    $scope.register =function() {
    var firstname=$scope.firstname;
    var lastname=$scope.lastname;
    var email=$scope.email;
    var password=$scope.password;
    var phone=$scope.phone;
    var address=$scope.address;

      if(firstname=='' ||lastname=='' || email=='' || password=='' || phone=='' || address=='')
      {
        console.log("fields cannot be left blank");
        $scope.error="Fiels cannot be left balnk. Please fill all the fields";
      }
      else {
        $state.go('Login');
      }
    };

  });
