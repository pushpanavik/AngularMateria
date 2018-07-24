app.factory('noteservice', function($http,$window) {
var baseUrl="http://localhost:9090/fundoo/";
	var serviceobj =[];

serviceobj.postService = function(note,url) {
  console.log(note);
  return $http({
    method : "POST",
    headers:{
      "Content-Type":"application/json",
      'token': localStorage.getItem("token")
    },
    url : url,
    data:angular.toJson(note)
  })
}
serviceobj.getService=function(url){
	console.log("r2");
  return $http({
    method : "GET",
    url : url,
    headers:{
      'token': localStorage.getItem('token')
     }
   })
 }


 serviceobj.putService=function(url,note){

   console.log("after method call",note);
	 return $http({
    method : "PUT",
    url : url,
    data:note,
    headers:{
      'token':localStorage.getItem('token')
    }
 })
}

serviceobj.getDeleteService=function(note,url){
	console.log("url is http ",url);
console.log("note info", note);
 return $http({
  method : "DELETE",
  url : url,
  data: note

})

}
return serviceobj;
});
