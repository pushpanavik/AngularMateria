app.factory('noteservice', function($http,$window) {
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
serviceobj.getService=function(url){
  return $http({
    method : "GET",
    url : url,
    headers:{
      'token': localStorage.getItem('token')
     }
   })
 }


 serviceobj.putService=function(url,data){
	 console.log('data from reminder',data);
	 return $http({
    method : "PUT",
    url : url,
    data : data,
    headers:{
      'token':localStorage.getItem('token')
    }
 })
 console.log('data2: ',data);

}

serviceobj.getDeleteService=function(data,url){
	console.log("url is http ",url);
 return $http({
  method : "DELETE",
  url : url,
  data: data

})

}
return serviceobj;
});
