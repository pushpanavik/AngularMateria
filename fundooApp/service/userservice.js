app.factory('userservice', function($http,$window) {
var baseUrl="http://localhost:9090/fundoo/";
	var serviceobj =[];

	serviceobj.postService = function(data,url) {
		console.log(data);
		return $http({
			method : "POST",
			headers:{
				"Content-Type":"application/json",
				'token': localStorage.getItem("token")
			},
			url : url,
			data:angular.toJson(data)
		})
	}
	serviceobj.resetService=function(data,token,url){
		return $http({
			method : "POST",
			url : baseUrl+ "user/resetPassword",
			data:mydata,
			headers:{
			 	'token': token
			 }
		})
	}
	serviceobj.getService=function(url){
	  return $http({
	    method : "GET",
	    url : url,
	    headers:{
	      'token': localStorage.getItem('token')
	     }
	   })
	}

				 return serviceobj;
		})
