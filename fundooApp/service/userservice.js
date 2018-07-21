app.factory('userservice', function($http,$window) {
var baseUrl="http://localhost:9090/fundoo/";
	var serviceobj =[];

	serviceobj.postService = function(user,url) {
		console.log(user);
		return $http({
			method : "POST",
			headers:{
				"Content-Type":"application/json",
				'token': localStorage.getItem("token")
			},
			url : url,
			data:angular.toJson(user)
		})
	}
	serviceobj.resetService=function(user,token,url){
		return $http({
			method : "POST",
			url : baseUrl+ "user/resetPassword",
			data:user,
			headers:{
			 	'token': token
			 }
		})
	}


				 return serviceobj;
		})
