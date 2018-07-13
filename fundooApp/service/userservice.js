app.factory('userservice', function($http,$window) {

	var serviceobj =[];

	serviceobj.registerModel = function(user) {

		return $http({
			method : "POST",
			url : "url",
			data : user
		})
	}

	serviceobj.loginModel=function(user){
		return $http({
			method: "POST",
			url: "/user/login",
			data:user
		}).then (function successCallback(response){
			console.log(response.data);
			$window.alert("successfully login");

		},function errorCallback(response){
			console.log(response.data)
		});
	}


	serviceobj.forgotModel=function(user){
		return  $http({
			method:"POST",
			url:"user/forgotPassword",
			data:angular.toJson(user)
		}).then (function successCallback(response){
			console.log(response.data.message);

			console.log(token);

			$window.alert("check your email for login");
		},function errorCallback(response){
			console.log(response.data)
		});
	}

	serviceobj.resetModel=function(user){
		return $http({
			method: "POST",
			url:"user/resetPassword",
			data:angular.toJson(user)
		}).then (function successCallback(response){
			console.log(response.data);

			$window.alert("your password successfully updated");
		},function errorCallback(response){
			console.log(response.data)
		});
	}
	return serviceobj;

});
