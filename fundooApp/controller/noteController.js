app
.controller('noteCtrl',function (userservice,$scope,$state,$location,$window) {
	var baseUrl="http://localhost:9090/fundoo/";

  $scope.noteModel=function(){
    var user={
title:$scope.noteTitle,
description:$scope.noteDescription,
color:"white",
isArchive:false,
isPin:false,
isTrash:false
};
var url=baseUrl + "user/addNote";
console.log(localStorage.getItem("token"));
userservice.postService(user,url)
.then(function successCallback(response) {
	console.log(response);
  console.log(response +"successfully note added");

   $window.alert("Check your mail to activate your account ");
}, function errorCallback(response) {
  console.log(response +"note cannot be  added");
});
  }

	$scope.getAllNote=function(){
		var url=baseUrl + "user/displayNote";
		userservice.getService(url)
		.then (function successCallback(response){
			console.log(response);
			$scope.getNote=response.data;
			console.log($scope.getNote);
			console.log("note successfully added");

		},function errorCallback(response){
			console.log(response);
			console.log("note cannot be added");
		});
	};



	$scope.colors = [
             "#339E42",
             "#039BE5",
             "#EF6C00",
             "#A1887F",
             "#607D8B",
             "#039BE5",
             "#009688",
             "#536DFE",
             "#AB47BC",
             "#E53935",
             "#3F51B5"
        ];

				$scope.getRandomColor = function () {
				$scope.bgColor = $scope.doc_classes_colors[Math.floor(Math.random() * $scope.doc_classes_colors.length)];
				    };

				    $scope.customerData = [{
				        name: "Mike"
				    }, {
				        name: "Tom"
				    }, {
				        name: "ASD"
				    }, {
				        name: "Lol"
				    },{
				        name: "Mike"
				    }, {
				        name: "Tom"
				    }, {
				        name: "ASD"
				    }, {
				        name: "Lol"
				    },{
				        name: "Mike"
				    }, {
				        name: "Tom"
				    }, {
				        name: "ASD"
				    }, {
				        name: "Lol"
				    },{
				        name: "Mike"
				    }, {
				        name: "Tom"
				    }, {
				        name: "ASD"
				    }, {
				        name: "Lol"
				    },{
				        name: "Mike"
				    }, {
				        name: "Tom"
				    }, {
				        name: "ASD"
				    }, {
				        name: "Lol"
				    }];



});
