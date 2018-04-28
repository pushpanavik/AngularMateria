app.controller('homeCtrl', function($scope, $mdSidenav, $state, $rootScope, $http, JsonService, $filter) {
  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }

  // to keep track of selected item from manufactureArray and store it in selectedManufactur
  var selectedManufactur = [];
  // to keep track of selected item from  storageArray and store it in selectedStorage
  var selectedStorage = [];
  // to keep track of selected item from osArray and store it in selectedOS
  var selectedOS = [];
  //to keep track of selected item from cameraArray and store it in selectedCamera
  var selectedCamera = [];
  $scope.jsonRecord = []
  $scope.readJson = JsonService.read();
  $scope.readJson.then(function(response) {
    $scope.jsonRecord = response.data;
    //console.log($scope.jsonRecord);
  })
  $scope.sendLogin = function() {
    $state.go('login');
  };
// using switch to look for multiple features of a particular mobile
  $scope.toggleFunction = function(option, selectedItem) {
    switch (option) {
     case 'manufacturer':
       AcceptAnyData(selectedManufactur, selectedItem);
       break;
     case 'storage':
       AcceptAnyData(selectedStorage, selectedItem)
       break;
     case 'os':
       AcceptAnyData(selectedOS, selectedItem)
       break;
     case 'camera':
       AcceptAnyData(selectedCamera, selectedItem)
       break;
    }
  };
  $scope.arrayManufacturer = selectedManufactur;
  $scope.arrayStorage = selectedStorage;
  $scope.osarray = selectedOS;
  $scope.cameraarray = selectedCamera;
});
// function for switch case
AcceptAnyData = function(array, selectedItem) {
  var index = array.indexOf(selectedItem);
  if (index > -1) {
    array.splice(index, 1);
  } else {
    array.push(selectedItem);
  }
}

/*
 * @description filter for getting list of items based on selected options.
 * @return {array} filteredArray list using the selected items .
 */
GenericArray = function(array, option, x) {
    var filteredArray = [];
  for (var j = 0; j < x.length; j++) {
    var item = x[j];
    for (var i = 0; i < array.length; i++) {
      var selectedItem = array[i];
      if (item.specs[option] == selectedItem) {
        filteredArray.push(item);
      }
    }
  }
  return filteredArray;
}


app.filter('customFilter', function() {
  return function(x, arrayManufacturer, arrayStorage, osarray, cameraarray) {
    var filteredArray = [];
    var temparray = [];
    if (x != undefined) {
      if (arrayManufacturer.length > 0 || arrayStorage.length > 0 || osarray.length > 0 || cameraarray.length > 0) {
        filteredArray = GenericArray(arrayManufacturer, 'manufacturer', x);
      }
      if (filteredArray.length > 0) {
        temparray = filteredArray;
        filteredArray = [];
      } else {
        temparray = x;
      }
      // console.log("temparray", temparray);
      if (arrayStorage.length > 0) {
        for (var j = 0; j < temparray.length; j++) {
          var item = temparray[j];
          filteredArray = GenericArray(arrayStorage, 'storage', temparray);
        }
        temparray = filteredArray;
        filteredArray = [];
      }

      if (osarray.length > 0) {
        for (var j = 0; j < temparray.length; j++) {
          var item = temparray[j];
          filteredArray = GenericArray(osarray, 'os', temparray);
        }
        temparray = filteredArray;
        filteredArray = [];
      }

      if (cameraarray.length > 0) {
        for (var j = 0; j < temparray.length; j++) {
          var item = temparray[j];
          filteredArray = GenericArray(cameraarray, 'camera', temparray);
        }
        temparray = filteredArray;
        filteredArray = [];
      }
    } else {
      temparray = x;
    }
    return temparray;
  };
});
