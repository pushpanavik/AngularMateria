app
.controller('forgotCtrl', function($scope,$http,$state) {
  $scope.login=function()
  {
  var email=$scope.useremail;
  $state.go('Login');
}
});
