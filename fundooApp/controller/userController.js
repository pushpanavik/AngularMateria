app
.controller('userCtrl',function (userservice,$scope,$state, $stateParams,$rootScope,$location,$window) {
	var baseUrl="http://localhost:9090/fundoo/";

	$scope.registerModel=function(){
	var user={
		    firstname: $scope.fname,
		    lastname: $scope.lname,
		    emailId: $scope.emailId,
		    password: $scope.password,
		    address: $scope.address,
		    phoneNumber:$scope.phoneNumber,
				profilepicImage:''
		  };
			console.log(user);
      // localStorage.register="registerModel";

      // console.log(localStorage.register);
      localStorage.setItem("emailId",$scope.emailId)
      localStorage.setItem("password",$scope.password)
			var url=baseUrl + "user/registerUser";
		  userservice.postService(user,url)
			.then(function successCallback(response) {
				console.log(response);
						$state.go('home.dashboard');
				// $window.alert("Check your mail to activate your account ");
			}, function errorCallback(response) {
				console.log(response);
			});
	}

	$scope.loginModel=function(){

		var user={
				emailId: $scope.emailId,
				password: $scope.password
		};
				var url=baseUrl +"user/login";
		userservice.postService(user,url)
		.then (function successCallback(response){
		 var  checktoken=response.data.msg;
			$state.go('home.dashboard');
			console.log("response data is",response.data.msg);
		localStorage.setItem("token",response.data.msg)
			console.log("successfully login")



		},function errorCallback(response){
			$state.go('Login');
			console.log('login failure');
		});

	}

	$scope.forgotModel=function(){
		var user={
				emailId: $scope.emailId
		};
		var url=baseUrl +"user/forgotPassword";
		userservice.postService(user,url)
		.then (function successCallback(response){
			console.log(response);

			$window.alert("check your email for login");
		},function errorCallback(response){
			console.log(response.data)
		});
		console.log($scope.forgotModel);
		console.log($scope.emailId)

	}
	$scope.resetModel=function(){
		var searchObject = $location.search();
		console.log(searchObject.token)
		var user={
				newpassword: $scope.newpassword
		};

		userservice.resetService(user,searchObject.token)
		.then (function successCallback(response){
			console.log(response.data);
			$state.go('Login')

		},function errorCallback(response){
			console.log(response.data)
		});
		console.log($scope.newpassword);
	}


function getAllUser(){
	var url=baseUrl +"getAllUser";
	userservice.getService(url)
	.then (function successCallback(response){
		console.log(response.data);
		$scope.userInfo=response.data;
	},function errorCallback(response){
		console.log(response.data)
		console.log("cannot display user details");
	});
}

	});
