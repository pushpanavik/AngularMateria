app.factory('userservice', function($http,$window) {

	var serviceobj =[];

	serviceobj.postModel = function(user,url) {
		console.log(user);
		return $http({
			method : "POST",
			url : url,
			data:user
		})
	}

	serviceobj.resetModel=function(user,token,url){
		return $http({
			method : "POST",
			url : url,
			data:user
		})
	}
				 return serviceobj;
		})
