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
        var indexOfManufacturer = selectedManufactur.indexOf(selectedItem);
        if (indexOfManufacturer > -1) {
          selectedManufactur.splice(indexOfManufacturer, 1);
        } else {
          selectedManufactur.push(selectedItem);
        }
        break;
      case 'storage':
        var indexOfStorage = selectedStorage.indexOf(selectedItem);
        if (indexOfStorage > -1) {
          selectedStorage.splice(indexOfStorage, 1);
        } else {
          selectedStorage.push(selectedItem);
        }
        break;
      case 'os':
        var indexOfOs = selectedOS.indexOf(selectedItem);
        if (indexOfOs > -1) {
          selectedOS.splice(indexOfOs, 1);
        } else {
          selectedOS.push(selectedItem);
        }
        break;
      case 'camera':
        var indexOfCamera = selectedCamera.indexOf(selectedItem);
        if (indexOfCamera > -1) {
          selectedCamera.splice(indexOfCamera, 1);
        } else {
          selectedCamera.push(selectedItem);
        }
        break;
    }
  };
  $scope.arrayManufacturer = selectedManufactur;
  $scope.arrayStorage = selectedStorage;
  $scope.osarray = selectedOS;
  $scope.cameraarray = selectedCamera;
});

app.filter('customFilter', function() {
  return function(items, arrayManufacturer, arrayStorage, osarray, cameraarray) {
    var filtered = [];
    var temarray = [];

    if (items != undefined) {
      if (arrayManufacturer.length > 0 || arrayStorage.length > 0 || osarray.length > 0 || cameraarray.length > 0) {

        for (var j = 0; j < items.length; j++) {
          var item = items[j];
          for (var i = 0; i < arrayManufacturer.length; i++) {
            var selectedItem = arrayManufacturer[i];
            if (item.specs.manufacturer == selectedItem || item.specs.storage == selectedItem ||
              item.specs.os == selectedItem || item.specs.camera==selectedItem) {
              filtered.push(item);
            }
          }
        }
        console.log(filtered);
        if (filtered.length > 0) {
          temarray = filtered;
          filtered = [];
        } else {
          temarray = items;
        }
        if (arrayStorage.length > 0) {
          for (var j = 0; j < temarray.length; j++) {
            var item = temarray[j];
            for (var i = 0; i < arrayStorage.length; i++) {
              var selectedItem = arrayStorage[i];
              if (item.specs.manufacturer == selectedItem || item.specs.storage == selectedItem ||
                item.specs.os == selectedItem || item.specs.camera==selectedItem) {
                filtered.push(item);
              }
            }
          }

          temarray = filtered;
          filtered = [];
        }

        if (osarray.length > 0) {
          for (var j = 0; j < temarray.length; j++) {
            var item = temarray[j];
            for (var i = 0; i < osarray.length; i++) {
              var selectedItem = osarray[i];
              if (item.specs.manufacturer == selectedItem || item.specs.storage == selectedItem ||
                item.specs.os == selectedItem ||item.specs.camera==selectedItem) {
                filtered.push(item);
              }
            }
          }

          temarray = filtered;
          filtered = [];
        }

        if (cameraarray.length > 0) {
          for (var j = 0; j < temarray.length; j++) {
            var item = temarray[j];
            for (var i = 0; i < cameraarray.length; i++) {
              var selectedItem = cameraarray[i];
              if (item.specs.manufacturer == selectedItem || item.specs.storage == selectedItem ||
                item.specs.os == selectedItem || item.specs.camera==selectedItem) {
                filtered.push(item);
              }
            }
          }
          console.log(filtered);
          temarray = filtered;
          filtered = [];
        }
      } else {
        temarray = items;
      }
    }

    return temarray;
  };
});
