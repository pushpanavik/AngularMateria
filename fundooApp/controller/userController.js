app
.controller('userCtrl',function (userservice,$scope,$state, $stateParams) {
	var baseUrl="http://localhost:8080/fundoo/user/";

	$scope.registerModel=function(){
	var user={
		    firstname: $scope.fname,
		    lastname: $scope.lname,
		    emailId: $scope.emailId,
		    password: $scope.password,
		    address: $scope.address,
		    phoneNumber:$scope.phoneNumber
		  };
      localStorage.register="registerModel";
      console.log(localStorage.register);
      localStorage.setItem("emailId",$scope.emailId)
      localStorage.setItem("password",$scope.password)

			var url=baseUrl + "registerUser";
		  userservice.registerModel(user,url)
			.then(function successCallback(response) {
				console.log(response.data)
				$window.alert("Check your mail to activate your account ");


			}, function errorCallback(response) {
				console.log(response);
			});
      $state.go('Login')
		  console.log(user);

	}

	console.log($stateParams);

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
        $state.go('home')
      // }
		userservice.loginModel(user)
		console.log(user);
	}

	$scope.forgotModel=function(){
		var user={
				emailId: $scope.emailId
		};
		userservice.forgotModel(user)
		console.log($scope.forgotModel);
		console.log($scope.emailId)

	}
	$scope.resetModel=function(){
		var user={
				newpassword: $scope.newpassword
		};
		userservice.resetModel(user)
		console.log($scope.newpassword);
	}


	});
