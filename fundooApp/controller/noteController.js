app.controller('noteCtrl', function(noteservice, $scope, $state, $location, $timeout, Upload, $window, $mdPanel, $mdDialog, $mdSidenav, $rootScope) {
  var baseUrl = "http://localhost:9090/fundoo/";
  $scope.gotoTrashPage = function() {
    $state.go("home.trash");
  }
  window.onpopstate = function(e) {
    window.history.forward(1);
  }
  $scope.goToNote = function() {
    $state.go("home.dashboard");
  }
  $scope.goToSearch = function() {
    $state.go('home.search');
  }
  $scope.goToArchive = function() {
    $state.go("home.archive");
  }
  $scope.goToReminder = function() {
    $state.go("home.reminder");
  }

  var path = $location.path();
  $scope.paramvalue = path.split('/')[3];

  $scope.IsVisible = false;
  $scope.ShowHide = function() {
    //If DIV is visible it will be hidden and vice versa.
    $scope.IsVisible = $scope.IsVisible ? false : true;
  }


  $scope.enableEdit = function(item) {
    item.edit = true;
    item.labelIcon = false;
    item.showDelete = true;
    item.showLabel = false;
  }
  $scope.showCreate = true


  $scope.disableEdit = function(item) {
    item.edit = false
    item.labelIcon = true;
    item.showDelete = false;
    item.showLabel = true;
  };

  if (localStorage.getItem('token') === null) {
    $state.go('login');
  }
  $scope.toggleLeft = buildToggler('left');

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();

      var isOpen = $mdSidenav(componentId).isOpen();
      if (isOpen) {
        document.getElementById("sidenavId").style.marginLeft = "200px";
      } else {
        document.getElementById("sidenavId").style.marginLeft = "0px";
      }
    }
  }
  $scope.goToLogin = function() {
    $window.localStorage.clear();
    $state.go('login');
  }
  $scope.mdIconProvider = function() {
    $mdIconProvider
      .iconSet('call', 'img/icons/sets/communication-icons.svg', 24);
  }
  $scope.openMenu = function($mdMenu, ev) {
    ev.preventDefault();
    ev.stopPropagation();
    $mdMenu.open(ev);
  };

  $scope.closeMenu = function($mdMenu, ev) {
    $mdMenu.close(ev);
  }

  $scope.getInitials = function (name) {
                var canvas = document.createElement('canvas');
                canvas.style.display = 'none';
                canvas.width = '32';
                canvas.height = '32';
                document.body.appendChild(canvas);
                var context = canvas.getContext('2d');
                context.fillStyle = "green";
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.font = "16px Arial";
                context.fillStyle = "#ccc";
                var first;
                if (name && name !=undefined) {
                  console.log("under first name");
                    first = name.charAt(0);
                    console.log(first);
                        var initials = first;
                        context.fillText(initials.toUpperCase(), 10, 23);
                    var data = canvas.toDataURL();
                    document.body.removeChild(canvas);
                    return data;
                } else {
                    return false;
                }
        }

  $scope.showAdvanced = function(ev, note) {
    $mdDialog.show({

      controller: DialogController,
      templateUrl: 'templates/popupnote.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen,
      locals: {
        mydata: note
      },
    })
  };

  function DialogController($scope, mydata) {
    $scope.mydata = mydata;
  }




  $scope.createlabelDialog = function(ev, label) {

    console.log('label insde create label', $scope.getlabels);
    $mdDialog.show({
      controller: DialogController2,
      templateUrl: 'templates/createLabel.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen,
      locals: {
        labelpopup: $scope.getlabels
      },
    })
  };
  $scope.goToLabel = function(label) {
    $state.go("home.label", {
      name: label.name
    });
  }

  function DialogController2($scope, labelpopup) {
    $scope.labelpopup = labelpopup;

    $scope.addLabel = function() {
      console.log('inside add label');
      var label = {
        name: $scope.name
      };
      var flag = false;
      for (var i = 0; i < $scope.getlabels.length; i++) {
        var labels = $scope.getlabels[i];
        if (labels == undefined && labels.name===label.name ) {
          flag = true;
        } else {}
      }
      if (flag == false && label.name!=undefined) {
        var url = baseUrl + "/user/addLabel";
        console.log("label info", label);
        noteservice.postService(label, url)
          .then(function successCallback(response) {
            $scope.getAllLabel();

            console.log("successfully label added", response);
          }, function errorCallback(response) {
            console.log("label cannot be  added", response);

          });
      }
    }

$scope.hideDialogue = function() {
      $mdDialog.hide();
}

    $scope.deleteLabel = function(label) {
      console.log("label info inside delete function", label)
      var url = baseUrl + "user/delete/" + label.labelId;

      noteservice.getDeleteService(label, url)
        .then(function successCallback(response) {
          $scope.getAllLabel();
        }, function errorCallback(response) {
          console.log("label cannot be  dleted", response);

        });

    }


    $scope.updateLabel = function(label) {

      console.log("inside update label method", label);
      var url = baseUrl + "user/updateLabel";
      noteservice.putService(url, label)
        .then(function successCallback(response) {
          console.log("label updated ", response);

          $scope.getAllLabel();
        }, function errorCallback(response) {
          console.log("label cannot be updated", response);

        });
    }

    $scope.getlabels = [];
    $scope.getAllLabel = function() {
      console.log("in get ll label");
      var url = baseUrl + "user/displayLabel";

      noteservice.getService(url)
        .then(function successCallback(response) {
          console.log("get all labels" + response);
          $scope.getlabels = response.data;

        }, function errorCallback(response) {
          console.log(response, "get all labels cannot be displayed");

        });
    }
    $scope.getAllLabel();
  }
  $scope.goToLabelPage = function(label) {
    if (event !== undefined) {
      event.stopPropagation();
    }
    console.log("go to label page");
    var labelid = label.id;
    $state.go('home.label', {
      labelid: label.id
    });
    $scope.getLabelOnNote(label);
  }
  $scope.retireveLabels = [];
  $scope.getAllLabels = function() {

    var url = baseUrl + "user/displayLabel";
    noteservice.getService(url)
      .then(function successCallback(response) {
        $scope.retireveLabels = response.data;

      }, function errorCallback(response) {
        console.log("error" + response);
      });

  }

  var noteobj = [];
  $scope.showlabelDialog = function(event, note) {
    console.log("inside showlabeldialog:  ", note);
    noteobj = note;

  var position = $mdPanel.newPanelPosition()
    .relativeTo(event.target)
    .addPanelPosition($mdPanel.xPosition.ALIGN_START, $mdPanel.yPosition.BELOW);
  console.log("position of panel ", position);
  var config = {
    locals: {
          mydata1: note,
          mydata3: $scope.retireveLabels
        },
    attachTo: angular.element(document.body),
    controller:PanelMenuCtrl,
    templateUrl: 'templates/labelDialog.html',
    position: position,
    openFrom: event,
    clickOutsideToClose: true,
    escapeToClose: true,
    focusOnOpen: false,
    zIndex: 2,
  };
  $mdPanel.open(config);
}
  function PanelMenuCtrl($scope, mydata1, mydata3) {

    $scope.mydata1 = mydata1;
    $scope.mydata3 = mydata3;

    $scope.selected = noteobj.listOfLabels;
  var arrayList=$scope.selected;
  console.log('list of labelarray'+arrayList);

    $scope.exists = function(item, list) {
      for (var i = 0; i < list.length; i++) {
        var selectobj = list[i];
        if (selectobj.name == item.name) {
          return true;
        }
      }
      return false;
    };
    console.log('selected list of labels',$scope.selected);

       $scope.toggle = function (item, list) {
         var idx = list.indexOf(item);
         if (idx > -1) {
           list.splice(idx, 1);
                   }
         else {
           list.push(item);
           $scope.addlabelNote(item);
         }
       };


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
    $scope.addlabelNote = function(label) {
      if (label.name != $scope.name) {
          var url = baseUrl + "user/updateNoteLabel/" + noteobj.id + " /" + label.labelId;
        console.log('url under allLabelNote', url);
        noteservice.putService(url, label)
          .then(function successCallback(response) {
            console.log("relation on label and note is updated", response);
            $scope.listOflabelsAdded = response;
            console.log($scope.listOflabelsAdded);

          }, function errorCallback(response) {
            console.log("cannot update note", response);
          });
      }
    }
    $scope.retireveLabels = [];
    $scope.getAllLabels = function() {

      var url = baseUrl + "user/displayLabel";
      noteservice.getService(url)
        .then(function successCallback(response) {
          $scope.retireveLabels = response.data;
          console.log('response', $scope.retireveLabels);

        }, function errorCallback(response) {
          console.log("error" + response);
        });
    }
    $scope.getAllLabels();
  }


  $scope.removeLabelOnNote = function(label, note) {
    var url = baseUrl + "user/deleteLabel/" + note.id + "/" + label.labelId;
    noteservice.getDeleteService(note, url)
      .then(function successCallback(response) {
              console.log("calling get All Note");

      }, function errorCallback(response) {
        console.log("error" + response);
      })
  }

  function tokenDecode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    return window.atob(output);
  }
  $scope.myVar = false;
  $scope.showProfileCard = function() {
    $scope.myVar = $scope.myVar ? false : true;
  }


  $scope.clickProfile = function() {
    var tokenL = localStorage.getItem('token');
    var user = {};
    if (tokenL !== undefined) {
      var encode = tokenL.split('.')[1];
      userDetail = JSON.parse(tokenDecode(encode));
      $scope.userDetails = userDetail;

    } else {
      $location.path('Login');
    }

  }


  $scope.changeView = false;
  $scope.toggleView = function() {
    console.log('inside toggleView');
    $scope.changeView = !$scope.changeView;
    var notes = document.getElementsByClassName("dashboard");
    if ($scope.changeView) {
      for (i = 0; i < notes.length; i++) {
        notes[i].style.width = "79%";
        notes[i].style.marginLeft = "10%";
      }
    } else {
      for (i = 0; i < notes.length; i++) {
        notes[i].style.width = "30%";
        notes[i].style.marginLeft = "0%";
      }
    }
  }
  $scope.noteModel = function() {
    var note = {
      title: $scope.title,
      description: $scope.description,
      reminderDat: '',
      reminderTime: '',
      color: $scope.mycolor
    };
    var url = baseUrl + "user/addNote";
    if(note.title===null ||note.description!=null){
      noteservice.postService(note, url)
        .then(function successCallback(response) {
          var responseData = response.data;
          console.log(responseData);
          $scope.getAllNote();
        }, function errorCallback(response) {
          console.log("note cannot be  added", response);

        });
    }
    else{
      if(note.title!=null ||note.description===null){
        noteservice.postService(note, url)
          .then(function successCallback(response) {
            var responseData = response.data;
            console.log(responseData);
            $scope.getAllNote();
          }, function errorCallback(response) {
            console.log("note cannot be  added", response);

          });
      }
    }
    if (note.title != null && note.description != null) {
      console.log('condition check');
      noteservice.postService(note, url)
        .then(function successCallback(response) {
          var responseData = response.data;
          console.log(responseData);
          $scope.getAllNote();
        }, function errorCallback(response) {
          console.log("note cannot be  added", response);

        });
    }
  }
  $scope.cancel=function(){
    $mdDialog.hide();
  }


  var urls = [];
  $scope.checkUrl = function(note) {
    var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;
    var url = note.description.match(urlPattern);
    var link = [];

    if (note.size == undefined) {
      note.size = 0;
      note.url = [];
      note.link = [];
    }

    if ((url != null || url != undefined) && note.size < url.length) {
      for (var i = 0; i < url.length; i++) {
        note.url[i] = url[i];
        noteservice.postUrlData(url[i],note)
          .then(function successCallback(response) {
            var responseData = response.data;
              if (responseData.title.length > 30) {
              responseData.title = responseData.title.substr(0,20) + '..';
            }
            link[note.size] = {
              title: responseData.title,
              url: note.url[note.size],
              imageUrl: responseData.imageUrl,
              domain: responseData.domain
            }

            note.link[note.size] = link[note.size];
            note.size = note.size + 1;

          }, function errorCallback(response) {
            console.log("data cannot come");
          });
      }
    }
  }

  $scope.removeUrl = function(note) {
    console.log("note to remove ",note);
    note.url="";
    note.link="";
        console.log('notedddddddddddddd',note);
        var url=baseUrl + "user/removeUrl";
        noteservice.removeUrlData(note,url)
          .then(function successCallback(response) {

          console.log("response from remove url",response)
          }, function errorCallback(response) {
            console.log("data cannot come");
          });
      }

  $scope.customerData = [
    [{
      name: "#FFFFFF"
    }, {
      name: "rgb(255, 138, 128)"
    }, {
      name: "rgb(255, 209, 128)"
    }],
    [{
      name: "rgb(255, 255, 141)"
    }, {
      name: "rgb(204, 255, 144)"
    }, {
      name: "rgb(167,255,235)"
    }],
    [{
      name: "rgb(128, 216, 255)"
    }, {
      name: "rgb(130, 177, 255)"
    }, {
      name: "rgb(179, 136, 255)"
    }],
    [{
      name: "rgb(248, 187, 208)"
    }, {
      name: "rgb(215, 204, 200)"
    }, {
      name: "rgb(207, 216, 220)"
    }]
  ];

  $scope.updateColor = function(note, t1) {
    if (note === undefined) {
      $scope.mycolor = t1;

      console.log('color is', $scope.mycolor);
    } else {

      note.color = t1;
      var url = baseUrl + "user/updateNote";
      noteservice.putService(url, note)
        .then(function successCallback(response) {
          console.log("note successfully updated", response);
          $scope.getAllNote();
        }, function errorCallback(response) {
          console.log("cannot update note", response);
        });
    }

  }
  $scope.updateNoteTitleDescripn = function(note) {
    var url = baseUrl + "user/updateNote";
    console.log('inside update method of title and description', note);
    noteservice.putService(url, note)
      .then(function successCallback(response) {
        console.log("note successfully updated", response);
        $scope.getAllNote();
      }, function errorCallback(response) {
        console.log("cannot update note", response);
      });
  };

  $scope.mList = [{
      option: 'Delete note'
    },
    {
      option: 'Add Label'
    }
  ];

  $scope.isTrash = function(note) {
    var url = baseUrl + "user/updateNote";
    console.log("before method call inside trash", note.trash);
    if (note.trash === false) {
      note.trash = true;
      note.pin = false;
      note.archive - false;
    } else {
      note.trash = false;
    }
    noteservice.putService(url, note)
      .then(function successCallback(response) {
        $scope.getAllNote();
        console.log("note successfully updated", response);
      }, function errorCallback(response) {
        console.log("cannot delete note", response);
      });
  }

  $scope.showArchiveNote = false;
  $scope.isArchive = function(note) {
    console.log('note info inside archive ', note);
    var url = baseUrl + "user/updateNote";
    if (note.archive === false) {
      $scope.showArchiveNote = true;
      note.archive = true;
      note.pin = false;
    } else {
      $scope.showArchiveNote = false;
      note.archive = false;
    }
    noteservice.putService(url, note)
      .then(function successCallback(response) {
        $scope.getAllNote();

      }, function errorCallback(response) {
        console.log("cannot update note", response);
      });
  }

  $scope.UpdateReminderDate = function(note) {

    if (note !== undefined) {
      var url = baseUrl + "user/updateNote";
      noteservice.putService(url, note)
        .then(function successCallback(response) {

          $scope.getAllNote();
        }, function errorCallback(response) {
          console.log("cannot update note", response);
        });
    }
  }

  $scope.today = new Date();
  $scope.todayReminder = function(note) {
    if ($scope.today.getHours() > 20 && $scope.today.getHours() < 8) {
      $scope.today.setHours(08);
      $scope.today.setMinutes(00);
    } else if ($scope.today.getHours() < 20 && $scope.today.getHours() > 8) {
      $scope.today.setHours(20);
      $scope.today.setMinutes(00);
    }
    note.reminderDate = $scope.today;
    $scope.UpdateReminderDate(note);
  }

  $scope.tomorrowReminder = function(note) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(8);
    tomorrow.setMinutes(00);
    note.reminderDate = tomorrow;
    $scope.UpdateReminderDate(note);
    $scope.getAllNote();

  }

  $scope.nextWeekReminder = function(note) {
    var nextWeek = new Date();
    var day = nextWeek.getDay();
    var numberofdays = 7 - day + 1;
    nextWeek.setDate(nextWeek.getDate() + numberofdays);
    nextWeek.setHours(8);
    nextWeek.setMinutes(00);
    note.reminderDate = nextWeek;

    $scope.UpdateReminderDate(note);
    $scope.getAllNote();

  }

  $scope.removeReminder = function(note) {
    console.log("inside remove reminder method...");
    note.reminderDate = null;
    note.reminderTime = null;
    $scope.UpdateReminderDate(note);
  }
  $scope.addTime = [{
      'name': 'Morning   8:00 AM',
      'value': '8:00 AM'
    },
    {
      'name': 'Afternoon 1:00 PM',
      'value': '1:00 PM'
    },
    {
      'name': 'Evening   6:00 PM',
      'value': '6:00 PM'
    },
    {
      'name': 'Night     8:00 PM',
      'value': '8:00 PM'
    },
    {
      'name': 'custom',
      'value': 'custom'
    }
  ];


  $scope.ReminderDate = function(note) {
    console.log("reminderTime", note);
    $scope.today = new Date();
    var myDate = new Date(note.reminderDat);
    console.log('mydate', myDate);

    if (note.reminderTime.split(':')[1].split(' ')[1] === 'PM') {
      var a = note.reminderTime.split(':')[0];
      console.log('a', a);
      var b = 12;
      var time24 = addTime(a, b);
      console.log("time in 24 hr" + time24);
      myDate.setHours(time24);
      myDate.setMinutes(note.reminderTime.split(':')[1].split(' ')[0]);

      console.log("date and time " + myDate + " " + myDate.getHours() + " " + myDate.getMinutes());
    } else {
      myDate.setHours(note.reminderTime.split(':')[0]);
      myDate.setMinutes(note.reminderTime.split(':')[1].split(' ')[0]);

      console.log("date and time " + myDate + " " + myDate.getHours() + " " + myDate.getMinutes());
    }

    console.log("myDate with time", myDate + note.reminderTime.split(':')[1].split(' ')[1]);

    note.reminderDate = myDate;

    $scope.UpdateReminderDate(note);

  };

  function addTime(a, b) {
    console.log("value of a and b", a + " " + b);
    var count = 0;
    while (count < a) {
      b++;
      count++;

    }
    return b;
  }
  var deleteNoteforever = function(note) {

    console.log("In delte forever", note);
    var url = baseUrl + 'user/deleteNote/' + note;

    noteservice.getDeleteService(note, url)
      .then(function successCallback(response) {
        console.log(response);
        $scope.getAllNote();
      }, function errorCallback(response) {
        console.log("erorr.................");
        console.log("error" + response);
      })
  }

  var restoreNote = function(note, data) {
    console.log(note + "in restore");
    note.trash = false;
    var url = baseUrl + 'user/updateNote';
    noteservice.putService(url, note).then(function successCallback(response) {

      console.log(response);
      $scope.getAllNote();
    }, function errorCallback(response) {
      console.log("erorr.................");
      console.log("error" + response.msg);
    })
  }

  $scope.ctrlNote = function(index, note) {
    console.log("in ctrl note");
    if (index == 0) {
      console.log("index");
      trashNote(note);
    } else if (index == 1) {
      console.log("index");
      addLabel(label);
    }
  }

  $scope.trashNote = function(index, note) {
    console.log("in ctrl trash");
    if (index == 0) {
      deleteNoteforever(note.id);
    }
    if (index == 1) {
      restoreNote(note, false)
    }
  }


      function checkPinnedNote(note)
      {
          var keepGoing = true;
          angular.forEach(note,function(value){
              if(keepGoing)
              {
                  if(value.pin)
                  {
                      $scope.showPinedNote=true;
                      keepGoing=false;
                  }
              }
          })
      };

      function checkOtherNote(note)
    {
        var keepGoing = true;
        angular.forEach(note,function(value){
            if(keepGoing) {
                if (!value.pin && !value.archive && !value.trash) {
                    $scope.showOtherNote = true;
                    keepGoing=false;
                }
            }
        })

    };

  $scope.updatePin = function(note) {
    console.log('note for pin',note.pin);
     if (note.pin === false) {
      console.log("In update pin for false");
     note.pin = true;
      note.archive = false;
      note.trash = false;

      var url = baseUrl + 'user/updateNote';
      noteservice.putService(url, note)
        .then(function successCallback(response) {
            console.log('update pin',response);
          $scope.getAllNote();
        }, function errorCallback(response) {
          console.log("error" + response.data);
            console.log('error while updfate pin',response);

        })
    } else {
      console.log('update pin if true');
      note.pin = false;
      var url = baseUrl + 'user/updateNote';
      noteservice.putService(url, note)
        .then(function successCallback(response) {
          console.log('update pin',response);
          $scope.getAllNote();
        }, function errorCallback(response) {
          console.log("error" + response);
          console.log('error while updfate pin',response);
        })
    }

  }
  $scope.zoom = function() {
    var imageId = document.getElementById('zoomView');
    console.log(imageId);
    if (imageId.style.width == "400px") {
      imageId.style.width = "300px";
      imageId.style.height = "300px";

    } else {
      imageId.style.width = "400px";
      imageId.style.height = "400px";
    }
  }
  var getImageUrl = '';
  $scope.imageSelect = function(event, note) {
    console.log('goes under imge', event);
    console.log('note info', note);
    if (event != undefined) {
      event.stopPropagation();
    }
    document.addEventListener("change", function(event) {
      console.log('inside document');
      var form = new FormData();
      console.log("form", event.target.files[0]);

      form.append("file", event.target.files[0]);
      console.log("form after appending", event.target.files[0]);
      var url = baseUrl + "uploadFile";
      console.log("url", url);
      noteservice.postImageService(form, url).then(function successCallback(response) {
        console.log("Upload Successfully done", response);
        note.image = response.data.msg;
        console.log('getImageUrl', note.image);
        updateImage(note);
      }, function errorCallback(response) {
        console.log(" Upload failed", response);
      });
    });
  };

  function updateImage(note) {
    console.log("In update image...............");

    var url = baseUrl + 'user/updateNote';
    console.log('url inside update image', url);
    noteservice.putService(url, note).then(function successCallback(response) {

      console.log(response);
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }
  $scope.removeImage = function(note) {
    console.log("note info ", note);
    console.log("image link", note.image);
    note.image = null;
    $scope.getAllNote();
    updateImage(note);

  };

  $scope.getCollaborators = [];
  $scope.getAllCollaborators = function() {
    var commonUrl = "http://localhost:9090/fundoo/";
    var url = commonUrl + "getAllCollaboratedNotes";
    noteservice.getService(url).then(
      function successCallback(response) {
        $scope.getCollaborators = response.data;
            },
      function errorCallback(response) {
        console.log("Error occur", response);
        return response;
      });
  }
  $scope.getAllCollaborators();

  $scope.notes = [];
  $scope.getAllNote = function() {
    var url = baseUrl + "user/displayNote";
    noteservice.getService(url)
      .then(function successCallback(response) {
            $scope.notes1 = response.data;
         $scope.getAllCollaborators();
        $scope.notes = $scope.notes1.concat($scope.getCollaborators);
        checkPinnedNote($scope.notes);
        checkOtherNote($scope.notes);
        // showHideheader();
      }, function errorCallback(response) {
        console.log(response, "note cannot be displayed");

      });
  };
  $scope.getAllNote();

  $scope.onClick=function(){
    console.log("in statae reload...................");
    $state.reload()

  }

  $scope.removeCollaboratoronNote = function(note) {
    var user = getUser();
    var url = baseUrl + "removeCollaboratorOnNote/" + user.userId + "/" + note.id;
    console.log(url);
    noteservice.getService(url).then(
      function successCallback(response) {
      },
      function errorCallback(response) {
        console.log("Error occur", response);
      });
  }

  $scope.showCollaborator = function(note) {
    $mdDialog.show({
      controller: dialogCollaboratorController,
      templateUrl: 'templates/collaborator.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen,
      locals: {
        userInfo: $scope.userInfo,
        noteoj: note,
        collaberatedNote:$scope.notes
      },
    })
  };

  function dialogCollaboratorController($scope, $mdDialog, userInfo, noteoj,collaberatedNote) {
    console.log(collaberatedNote);
    $scope.userInfo = userInfo;
    $scope.noteoj = noteoj;

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    console.log("collaberatedNote" + collaberatedNote);
    $scope.collaberatedNote = collaberatedNote;
    var commonUrl = "http://localhost:9090/fundoo/";

    $scope.addCollaboratorOnNote = function(user) {
      var url = commonUrl + "addCollaboratorOnNote/" + user.userId + "/" + noteoj.id;

      console.log(url);
      noteservice.getService(url).then(
        function successCallback(response) {
    var noteid=response.data.status;
    console.log(noteid);
    $scope.getCollaboratedUser(noteid);

        },
        function errorCallback(response) {
          console.log("Error occur", response);
        });
    }

    $scope.removeCollaboratoronNote = function(user) {

      var url = commonUrl + "removeCollaboratorOnNote/" + user.userId + "/" + noteoj.id;
      console.log(url);
      noteservice.getService(url).then(
        function successCallback(response) {
          $scope.getAllCollaboratedNote();
        },
        function errorCallback(response) {
          console.log("Error occur", response);
        });
    }
    $scope.getUserInfo = [];
    $scope.getallUsers = function() {
      var commonUrl = "http://localhost:9090/fundoo/";
      var url = commonUrl + "getAllUsers";

      noteservice.getService(url).then(
        function successCallback(response) {
          $scope.getUserInfo = response.data;
          console.log('User info', $scope.getUserInfo);
        },
        function errorCallback(response) {
          console.log("Error occur", response);
          return response;
        });
    }

    $scope.getallUsers();
    $scope.collaboratedUser=[];
        $scope.getCollaboratedUser = function(noteid) {
          console.log('id' +noteid);
          var url = baseUrl + "getAllCollaboratedUsers/" + noteid;
          noteservice.getService(url)
            .then(function successCallback(response) {
              console.log(response);
              $scope.collaboratedUser = response.data;
              console.log("collaberate note" + $scope.collaboratedUser);
              // showHideheader();
            }, function errorCallback(response) {
              console.log(response, "note cannot be displayed");

            });
        };
        $scope.getCollaboratedUser();


$scope.collaboratednote=[];
    $scope.getAllCollaboratedNote = function() {
      var url = baseUrl + "getAllCollaboratedNotes" ;
      noteservice.getService(url)
        .then(function successCallback(response) {
          console.log(response);
          $scope.collaboratednote = response.data;
        //  $scope.getCollaboratedUser(response.data)
          console.log("collaberate note" + $scope.collaboratednote);
          // showHideheader();
        }, function errorCallback(response) {
          console.log(response, "note cannot be displayed");

        });
    };
    $scope.getAllCollaboratedNote();
  }






  $scope.changeColor = function() {
    if ($state.is('home.dashboard')) {
      $scope.title = "Fundoo Notes";
      $scope.CustomColor = {
        'backgroundcolor': '#fb0',
        'color': 'black'
      }
    } else if ($state.is('home.archive')) {
      $scope.title = "Archive";
      $scope.CustomColor = {
        'backgroundcolor': '#A09E98',
        'color': 'white'
      }
    } else if ($state.is('home.trash')) {
      $scope.title = "Trash";
      $scope.CustomColor = {
        'backgroundcolor': 'rgb(99, 99, 99)',
        'color': 'white'
      }
    } else if ($state.is('home.reminder')) {
      $scope.title = "Reminder";
      $scope.CustomColor = {
        'backgroundcolor': 'rgb(96, 125, 139)',
        'color': 'white'
      }
    } else if ($state.is('home.label')) {
      $scope.title = "Label";
      $scope.CustomColor = {
        'backgroundcolor': 'rgb(96, 125, 139)',
        'color': 'white'
      }
    }
  };


  $scope.showProfilePic = function(event) {
    console.log('inside profile');
    $mdDialog.show({
      controller: profileUplodController,
      templateUrl: 'templates/profileDialog.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen,
    });
  }

  function profileUplodController($scope, $timeout) {
    $scope.myImage = '';
    $scope.myCroppedImage = '';
    $scope.filename = "";
    var handleFileSelect = function(evt) {
      var file = evt.target.files[0];
      $scope.filename = evt.target.files[0].name;
      var reader = new FileReader();
      reader.onload = function(evt) {
        $scope.$apply(function($scope) {
          $scope.myImage = evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    $timeout(function() {
      angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
    }, 3000, false);

    const dataURLtoFile = (dataurl, filename) => {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n) {
        u8arr[n - 1] = bstr.charCodeAt(n - 1)
        n -= 1 // to make eslint happy
      }
      return new File([u8arr], filename, {
        type: mime
      });
    }

    $scope.uploadProfilePic = function functionName(myCroppedImage) {

      const file = dataURLtoFile(myCroppedImage, $scope.filename);
      var form1 = new FormData();
      form1.append("file", file);
      var url = baseUrl + 'uploadFile';
      noteservice.postImageService(form1, url).then(function successCallback(response) {
        console.log(response);
        var image = response.data.msg;
        updateUserProfile(image);
      }, function errorCallback(response) {
        console.log("error" + response.data);
      });
    }

    getUser();

    function updateUserProfile(image) {
      console.log('image info' + image);
      var user = getUser();
      console.log('user is', user);
      user.profilepicImage = image;
      console.log(user.profilepicImage);
      var url = baseUrl + 'updateUser';
      noteservice.putService(url, user).then(function successCallback(response) {
        getUser();
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })

    }
    $scope.hideDialogue = function() {
      $mdDialog.hide();
    }
  }

  getUser();
  var userInfo = "";
  $scope.userInfo = '';

  function getUser() {

    var url = baseUrl + "getUser";
    noteservice.getService(url)
      .then(function successCallback(response) {
        $scope.userInfo = response.data;
        userInfo = $scope.userInfo;

      }, function errorCallback(response) {
        console.log(response, "user details cannot be displayed");

      });
    return userInfo;
  }
  getUser();




});

app.filter('dateformat', function($filter) {

  return function(reminderDate) {
    if (!reminderDate) {
      return;
    }

    reminderDate = new Date(reminderDate);
    var dt = "";
    var todatedate = new Date();

    var ltempToday = new Date(todatedate.getFullYear(), todatedate.getMonth(), todatedate.getDate());

    var ltempTom = new Date(todatedate.getFullYear(), todatedate.getMonth(), todatedate.getDate() + 1);
    var ltempYes = new Date(todatedate.getFullYear(), todatedate.getMonth(), todatedate.getDate() - 1);

    var ltempRD = new Date(reminderDate.getFullYear(), reminderDate.getMonth(), reminderDate.getDate());
    if ((ltempToday - ltempRD) == 0) {
      dt += "Today";
    } else if ((ltempTom - ltempRD) == 0) {
      dt += "Tomorrow";
    } else if ((ltempYes - ltempRD) == 0) {
      dt += "Yesterday";
    } else {
      dt = $filter('date')(reminderDate, 'MMM dd, yyyy');
      dt = dt.replace(", " + todatedate.getFullYear(), '');
    }
    // append time
    var time = $filter('date')(reminderDate, 'hh:mm a');
    dt += ", " + time;
    return dt;
  };
});

app.filter('parseUrlFilter', function() {

  var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;

  return function(text, target) {

    return text.replace(urlPattern, '<a target="' + target + '" href="$&">$&</a>');
  };

});


app.filter('customFilter', function() {
  return function(label,arrayList ) {
    var filteredArray = [];
    var temparray = [];
    if (x != undefined) {
      if (arrayList > 0 ) {
        filteredArray = GenericArray(arrayList, label);
      }
      if (filteredArray.length > 0) {
        temparray = filteredArray;
        filteredArray = [];
      } else {
        temparray = x;
      }
      return temparray;
    }
  }
});
