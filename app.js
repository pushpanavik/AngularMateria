var app=angular.module('angularApp',['ui.router','ngMaterial']);
app.config(function($stateProvider,$urlRouterProvider)
{
  $stateProvider
  .state('Login',
  {
    url:'/Login',
    templateUrl:'templates/Login.html',
    controller:'LoginCtrl'
  })
  .state('home',
  {
    url:'/home',
    templateUrl:'templates/home.html',
    controller:'homeCtrl'
  })
  .state('home.Dashboard',
  {
    url:'/Dashboard',
    templateUrl:'templates/Dashboard.html',
    controller:'DashboardCtrl'
  });

  $urlRouterProvider.otherwise("Login")
});
