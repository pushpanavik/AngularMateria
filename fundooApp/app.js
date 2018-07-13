var app=angular.module('fundooApp',['ui.router','ngMaterial']);
app.config(function($stateProvider,$urlRouterProvider)
{
  $stateProvider
  .state('Register',
  {
    url:'/Register',
    templateUrl:'templates/Register.html',
    controller:'userCtrl'
  })
  .state('Login',
{
  url:'/login',
  templateUrl:'templates/Login.html',
  controller:'userCtrl'
})
.state('forgotPassword',
{
  url:'/forgotPassword',
  templateUrl:'templates/forgotPassword.html',
  controller:'userCtrl'
})
.state('resetPassword',
{
url:'/resetPassword/:token',
templateUrl: 'templates/resetPassword.html',
controller:'userCtrl',
params: {
        token: null,
}
})
.state('home',
 {
   url:'/home',
   templateUrl:'templates/home.html',
   controller:'userCtrl'
})

  $urlRouterProvider.otherwise("/Register")
});
