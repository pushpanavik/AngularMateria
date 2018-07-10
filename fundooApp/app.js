var app=angular.module('fundooApp',['ui.router','ngMaterial']);
app.config(function($stateProvider,$urlRouterProvider)
{
  $stateProvider
  .state('Register',
  {
    url:'/Register',
    templateUrl:'templates/Register.html',
    controller:'RegisterCtrl'
  })
  .state('Login',
{
  url:'/login',
  templateUrl:'templates/Login.html',
  controller:'LoginCtrl'
})
.state('forgotPassword',
{
  url:'/forgotPassword',
  templateUrl:'templates/forgotPassword.html',
  controller:'forgotCtrl'
})

  $urlRouterProvider.otherwise("/Register")
});
