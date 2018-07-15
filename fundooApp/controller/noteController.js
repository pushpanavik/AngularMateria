app
.controller('noteCtrl',function (userservice,$scope,$state, $stateParams,$location,$window) {
	var baseUrl="http://localhost:9090/fundoo/";

  $scope.noteModel=function(){
    var createNote={
title:$scope.title,
description:$scope.description,
color:"white",
isArchive:false,
isPin:false,
isTrash:false
};
var url=baseUrl + "user/addNote";
userservice.postModel(createNote,url)
.then(function successCallback(response) {
  console.log(response +"successfully note added");

  // $window.alert("Check your mail to activate your account ");
}, function errorCallback(response) {
  console.log(response +"note cannot be  added");
});


  }
});
