app
.controller('LoginCtrl', function($scope,$http,$state) {
  $scope.login=function()
  {
  var usr=$scope.useremail;
    var ema=$scope.password;

      $state.go('home');

   console.log(usr);
   console.log(ema);
  }


});
