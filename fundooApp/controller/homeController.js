app.controller('homeCtrl',function($state,$scope,$window){

  function dialogController($cope,$mdDialog,noteservice){
    $scope.cancel=function(){
      $mdDialog.cancel();
    }

    $scope.createLabel=function(){
      var label={
            name:$scope.labelname
      };
      console.log("label info",label);

      var url=baseUrl+"/user/addLabel";
      console.log("label info",label);
      if(label.name!=undefined){
        noteservice.postService(label,url)
        .then(function successCallback(response) {
          console.log("successfully note added", response);
          console.log("title for note is", response);
          $scope.getAllNote();
        }, function errorCallback(response) {
          console.log("note cannot be  added", response);

        });
      }

    }

    $scope.getAllLabel=function(){
      var url=baseUrl +"user/displayLabel";

        noteservice.getService(url)
        .then(function successCallback(response)
        {
              console.log("get all labels"+response);
          $scope.getlabels = response.data;

        }, function errorCallback(response) {
          console.log(response, "get all labels cannot be displayed");

        });
    }

    $scope.deleteLabel=function(label){
      console.log("label info inside delete function",label)
      var url=baseUrl + "user/delete" +label.id;

      noteservice.getDeleteService(label,url)
      .then(function successCallback(response) {
        console.log("successfully label dleted", response);

        $scope.getAllNote();
      }, function errorCallback(response) {
        console.log("label cannot be  dleted", response);

      });

    }

    $scope.updateLabel=function(label){
      console.log("inside update label method",label);
      var url=baseUrl + "user/updateLabel";
      noteservice.putService(url,data)
      .then(function successCallback(response) {
        console.log("label updated ", response);

        $scope.getAllNote();
      }, function errorCallback(response) {
        console.log("label cannot be updated", response);

      });
    }
  }









   })
