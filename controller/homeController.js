app.controller('homeCtrl',function ($scope,$mdSidenav,$state,$rootScope,$http,JsonService,$filter) {

  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }

// to keep track of selected item from manufactureArray and store it in selectedManufactur
var selectedManufactur=[];
// to keep track of selected item from  storageArray and store it in selectedStorage
var selectedStorage=[];
// to keep track of selected item from osArray and store it in selectedOS
var selectedOS=[];
//to keep track of selected item from cameraArray and store it in selectedCamera
var selectedCamera=[];

$scope.readJson=JsonService.read();
$scope.readJson.then(function(response){
$scope.jsonRecord = response.data;
//console.log($scope.jsonRecord);
})
       $scope.sendLogin = function() {
         $state.go('login');
};

$scope.toggle=function(selectOption, selectedItem) {
  switch(selectOption)
  {
    case 'manufacturer':

   var manufactureindex=selectedManufactur.indexOf(selectedItem);
        if (manufactureindex > -1) {
    selectedManufactur.splice(manufactureindex, 1);
        }
        else {
          selectedManufactur.push(selectedItem);
        }
        break;
    case 'storage':
        var storageindex=selectedStorage.indexOf(selectedItem);
            if (storageindex > -1) {
              selectedStorage.splice(storageindex, 1);
            }
            else {
              selectedStorage.push(selectedItem);
            }
            break;
   case 'OS':
            var osindex=selectedOS.indexOf(selectedItem);
                if (osindex > -1) {
                  selectedOS.splice(osindex, 1);
                }
                else {
                  selectedOS.push(selectedItem);
                }

                break;
  case 'camera':
                var cameraindex=selectedCamera.indexOf(selectedItem);
                    if (cameraindex > -1) {
                      selectedCamera.splice(cameraindex, 1);
                    }
                    else {
                      selectedCamera.push(selectedItem);
                    }
                    break;
}
};
var manufactureArray=selectedManufactur;
var storageArray=selectedStorage;
var osArray=selectedOS;
var cameraArray=selectedCamera;
});

app.filter('customFilter',function()
{
  return function(items,manufactureArray,storageArray,osArray,cameraArray){
    var filtered=[];
    var temarray=[];

  if(manufactureArray.length>0 ||storageArray.length>0 || osArray.length>0 ||cameraArray.length>0)
   {
     for(var j=0;j<items.length;j++)
     {
       var item=items[j];
       for(var i=0;i<manufacturearray.length;i++)
       {
         var selectedItem=manufacturearray[i];
         if(item.specs.manufacturer==selectedItem||item.specs.storage==selectedItem||
           item.specs.os==selectedItem|| item.specs.camera)
           {
             filtered.push(item);
           }
        }
      }
      if(filtered.length>0)
      {
        temarray=filtered;
        filtered=[];
      }else
      {
       temarray=items;
      }
      if(storagearray.length>0)
      {
        for(var j=0;j<temarray.length;j++)
        {
          var item=temarray[j];
          for(var i=0;i<storagearray.length;i++)
          {
            var selectedItem=storagearray[i];
            if(item.specs.manufacturer==selectedItem||item.specs.storage==selectedItem||
              item.specs.os==selectedItem|| item.specs.camera)
              {
                filtered.push(item);
              }
           }
        }
          temarray=filtered;
          filtered=[];
      }

        if(osarray.length>0)
        {
          for(var j=0;j<temarray.length;j++)
          {
            var item=temarray[j];
            for(var i=0;i<osarray.length;i++)
            {
              var selectedItem=osarray[i];
              if(item.specs.manufacturer==selectedItem||item.specs.storage==selectedItem||
                item.specs.os==selectedItem|| item.specs.camera)
                {
                  filtered.push(item);
                }
            }
          }
            temarray=filtered;
            filtered=[];
          }

            if(cameraarray.length>0)
            {
              for(var j=0;j<cameraarray.length;j++)
              {
                var item=temarray[j];
                for(var i=0;i<cameraarray.length;i++)
                {
                  var selectedItem=cameraarray[i];
                  if(item.specs.manufacturer==selectedItem||item.specs.storage==selectedItem||
                    item.specs.os==selectedItem|| item.specs.camera)
                    {
                      filtered.push(item);
                    }
                }
              }
                temarray=filtered;
                filtered=[];
              }
        }
            else {
    temarray=items;
    }
  console.log(temarray);
return temarray;
};
});
