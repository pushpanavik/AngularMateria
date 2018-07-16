app
.controller('noteCtrl',function (noteservice,$scope,$state,$location,$window) {
	var baseUrl="http://localhost:9090/fundoo/";

  $scope.noteModel=function(){
    var note={
title:$scope.noteTitle,
description:$scope.noteDescription,
color:"white",
isArchive:false,
isPin:false,
isTrash:false
};
var url=baseUrl + "user/addNote";
noteservice.postService(note,url)
.then(function successCallback(response) {
  console.log(response +"successfully note added");

   $window.alert("Check your mail to activate your account ");
}, function errorCallback(response) {
  console.log(response +"note cannot be  added");
});
  }

	$scope.getAllNote=function(){
		var url=''
	};
	url=baseUrl +"user/displayNote";
	noteservice.getService(url)
	.then (function successCallback(response){
		console.log(response);
		var getNote=$scope.response;
		console.log(getNote);
		console.log("note successfully added");

	},function errorCallback(response){
		console.log(response);
		console.log("note cannot be added");
	});

});
