app
.controller('userCtrl',function (userservice,$scope,$state, $stateParams,$location,$window) {
	var baseUrl="http://localhost:9090/fundoo/";

	$scope.registerModel=function(){
	var user={
		    firstname: $scope.fname,
		    lastname: $scope.lname,
		    emailId: $scope.emailId,
		    password: $scope.password,
		    address: $scope.address,
		    phoneNumber:$scope.phoneNumber
		  };
			console.log(user);
      // localStorage.register="registerModel";
      // console.log(localStorage.register);
      // localStorage.setItem("emailId",$scope.emailId)
      // localStorage.setItem("password",$scope.password)
			var url=baseUrl + "user/registerUser";
		  userservice.postService(user,url)
			.then(function successCallback(response) {
				console.log(response)
				$state.go('home');
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
		var email=localStorage.getItem("emailId")
		console.log(email);
		var password=localStorage.getItem("password")
		console.log(password);
			// if(email===$scope.emailId && password===$scope.password){
				$state.go('home.dashboard');
			// }
		var url=baseUrl +"user/login";
		userservice.postService(user,url)
		.then (function successCallback(response){
			console.log(response.data);
			console.log("successfully login");


		},function errorCallback(response){
			console.log(response)
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

	});
