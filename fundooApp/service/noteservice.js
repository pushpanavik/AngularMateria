app.factory('noteservice', function($http) {
  var baseUrl="http://localhost:9090/fundoo/";
  var serviceobj =[];

  serviceobj.postService = function(note,url) {
		console.log(note);
		return $http({
			method : "POST",
			url : url,
			data:note
		})
	}

  serviceobj.getService=function(url){

    return $http({
    method:"GET",
    url:url
  })
}
  return serviceobj;
})
