app.controller('LoginCtrl', function($scope,$http,$state) {
  $scope.login=function()
  {
  var usr=$scope.useremail;
    var ema=$scope.password;
    if(usr!='' && ema!= '')
    {
      $state.go('home.Dashboard');
    }
   console.log(usr);
   console.log(ema);
  }
  $scope.showHints = true;
      $scope.user = {
        email: "",
        password: ""
      };

});
