app.controller('homeCtrl',function($state,$scope,$window){





$scope.addLabel=function(labelModel)
        {
            var url=baseUrl+"addlabel";
            if(labelModel.labelName !== "")
            {
                labelService.postAPIWithHeader(url,labelModel).then(function successCallback(response)
                {
                    console.log("Add Label Successfully in Dialog",response);
                    $scope.labelModel.labelName="";
                    getAllLabelsInDialog();
                    getAllLabels();
                },function errorCallback(response){
                    console.log("Add Label failed in Dialog",response.data);
                })
            }
        };


       function getAllLabelsInDialog()
        {
            var url=baseUrl+"labels";

            labelService.getAPIWithHeader(url).then(function successCallback(response)
            {
                console.log("Get Label Successfully in Dialog",response);
                $scope.labelInfo=response.data;

                    $scope.labelDisplay=true;
            },function errorCallback(response){
                console.log("Get Label failed in Dialog",response.data);
            });
        };

        $scope.deleteLabel=function(labelInfo)
           {
               var url=baseUrl+"deletelabel/";
               labelService.deleteAPIWithHeader(url,labelInfo.id).then(function successCallback(response)
               {
                   $mdDialog.hide(response.data);
                   console.log("Delete Label Successfully",response);

               },function errorCallback(response){
                   console.log("Delete Label failed in Delete Dialog",response.data);
               })
           }


   })
