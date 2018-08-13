app.controller('noteCtrl', function(noteservice, $scope, $state, $location, $timeout, Upload, $window, $mdDialog, $mdSidenav, $rootScope) {
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

var path=$location.path();
console.log("path is ",path);
$scope.paramvalue=path.split('/')[3];
console.log("url paramvalue",$scope.paramvalue);


  $scope.cancel = function() {
    $mdDialog.cancel();
  };
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
    $state.go('Login');
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
    $state.go('Login');
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
  $scope.showAdvanced = function(ev, note) {
    console.log("comes under showAdvance", note);
    console.log("comes in showAdvance scope value", note);
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
    console.log('in dialog controller in mydata', mydata);

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
    console.log('inside go label');
    $state.go("home.label", {
      name: label.name
    });
  }

  function DialogController2($scope, labelpopup) {
    $scope.labelpopup = labelpopup;
    console.log('in dialog controller in labelpopup', labelpopup);

    $scope.addLabel = function() {
      console.log('inside add label');

      var label = {
        name: $scope.name
      };
      console.log("name of label", $scope.name);
      if (label.name != name) {

        var url = baseUrl + "/user/addLabel";
        console.log("label info", label);

        if ($scope.name != undefined) {
          noteservice.postService(label, url)
            .then(function successCallback(response) {
              $scope.getAllLabel();
              console.log("successfully label added", response);


            }, function errorCallback(response) {
              console.log("label cannot be  added", response);

            });
        }
      }
    }
    $scope.deleteLabel = function(label) {
      console.log("label info inside delete function", label)
      var url = baseUrl + "user/delete/" + label.labelId;

      noteservice.getDeleteService(label, url)
        .then(function successCallback(response) {
          console.log("successfully label dleted", response);

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
        console.log('response', $scope.retireveLabels);

      }, function errorCallback(response) {
        console.log("error" + response);
      });

  }

  var noteobj = [];
  $scope.showlabelDialog = function(event, note) {
    console.log("inside showlabeldialog:  ", note);

    noteobj = note;
    console.log('display label', $scope.retireveLabels);
    $mdDialog.show({
      locals: {
        mydata1: note,
        mydata3: $scope.retireveLabels
      },
      controller: DialogController3,
      templateUrl: 'templates/labelDialog.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true
    })
  }

  function DialogController3($scope, mydata1, mydata3) {
    $scope.mydata1 = mydata1;
    $scope.mydata3 = mydata3;
    console.log('mydata3333', $scope.mydata3);
    console.log("in dilogcontroller 333333");


    $scope.addlabelNote = function(label) {
      if (label.name != $scope.name) {
        console.log("label in dashboard ", label);
        console.log("note in dashboard:", noteobj);
        console.log('noteid in dashboard', noteobj.id);
        console.log('note obj of list of labels', noteobj.listOfLabels);

        var idx = noteobj.listOfLabels.findIndex(x => x.labelname === label.name);
        if (idx > -1) {
          noteobj.listOfLabels.splice(idx, 1);
        } else {
          noteobj.listOfLabels.push(label);
        }

        var url = baseUrl + "user/updateNoteLabel/" + noteobj.id + " /" + label.labelId;
        console.log('url under allLabelNote', url);
        noteservice.putService(url, label)
          .then(function successCallback(response) {
            console.log("relation on label and note is updated", response);

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
  }
  $scope.selected=[];
  $scope.toggle = function (item, list) {
          var i = list.indexOf(item);
          if (i > -1) {
            list.splice(i, 1);
          }
          else {
            list.push(item);
          }
        };

$scope.exists=function(item,list){
  console.log("list in exist",list);
  return list.indexof(item)> -1;
};

  $scope.removeLabelOnNote = function(label, note) {
    console.log("label in dashboard ", label);
    console.log("note in dashboard:", note);
    console.log('noteid in dashboard', note.id);

    var url = baseUrl + "user/deleteLabel/" + note.id + "/" + label.labelId;
    noteservice.getDeleteService(note, url)
      .then(function successCallback(response) {
              $scope.getAllLabels();

      }, function errorCallback(response) {
        console.log("error" + response);
      })
  }
  // $scope.getLabelNote = [];
  // $scope.getLabelOnNote = function(label) {
  //
  //   console.log("label id in getLabelOnNote");
  //
  //   var url = baseUrl + "user/listlabelNote/" + label.labelId;
  //   noteservice.getService(url)
  //     .then(function successCallback(response) {
  //       console.log(response);
  //       $scope.getLabelNote = response.data;
  //     }, function errorCallback(response) {
  //       console.log("error" + response);
  //     });
  // }
  function tokenDecode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    return window.atob(output);
  }
  $scope.isVisible = false;
  $scope.clickProfile = function() {
    console.log('inside profile');

    if ($scope.isVisible === false) {
      $scope.isVisible = true;
      var tokenL = localStorage.getItem('token');
      console.log('token inside getUser from token', tokenL);
      var user = {};
      if (tokenL !== undefined) {
        var encode = tokenL.split('.')[1];
        userDetail = JSON.parse(tokenDecode(encode));

        console.log('hjdfsdhfsdf', userDetail.iss);
        $scope.userDetails = userDetail;
        console.log($scope.userDetails);
      } else {
        $location.path('Login');
      }

    } else {
      $scope.isVisible = false;
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
      color: $scope.mycolor,
      archive: false,
      pin: false,
      trash: false,
      image: ''
    };
    var url = baseUrl + "user/addNote";

    console.log("note info", note);
    console.log($scope.title);
    console.log($scope.description);
    if ($scope.title != null && $scope.description != null) {
      console.log('condition check');
      noteservice.postService(note, url)
        .then(function successCallback(response) {
          console.log("successfully note added", response);
          console.log("title for note is", response);
          $scope.getAllNote();
        }, function errorCallback(response) {
          console.log("note cannot be  added", response);

        });
    }
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


  var isMark = function() {

  }
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
        console.log("note  is inside archive ");
      }, function errorCallback(response) {
        console.log("cannot update note", response);
      });
  }

  $scope.UpdateReminderDate = function(note) {

    if (note !== undefined) {
      console.log('note under updateReminderDate', note);

      var url = baseUrl + "user/updateNote";
      noteservice.putService(url, note)
        .then(function successCallback(response) {
          console.log("response from update reminder..........." + response);
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

   $scope.nextWeekReminder= function(note) {
     var nextWeek = new Date();
     var day=nextWeek.getDay();
     var numberofdays=7-day+1;
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
  $scope.addTime = [{'name': 'Morning   8:00 AM','value': '8:00 AM'},
                    {'name': 'Afternoon 1:00 PM','value': '1:00 PM'},
                    {'name': 'Evening   6:00 PM','value': '6:00 PM'},
                    {'name': 'Night     8:00 PM','value': '8:00 PM'},
                    {'name': 'custom','value': ''}];


  $scope.ReminderDate = function(note) {
    console.log("reminderTime", note);
    $scope.today = new Date();
    var myDate = new Date(note.reminderDat);
    console.log('mydate', myDate);

    if (note.reminderTime.split(':')[1].split(' ')[1] === 'PM')
    {
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

  $scope.isPinNote = function(note) {
    if (note.pin === false) {
      $scope.showPinNote = false;
    } else {
      $scope.showOtherNote = true;
    }

    $scope.updatePin(note);
  };
  $scope.updatePin = function(note) {
    if (note.pin === false) {
      console.log("In update false");
      note.pin = true;
      note.archive = false;
      note.trash = false;

      var url = baseUrl + 'user/updateNote';
      noteservice.putService(url, note)
        .then(function successCallback(response) {
          console.log(response);
          $scope.getAllNote();
        }, function errorCallback(response) {
          console.log("error" + response.data);
        })
    } else {
      note.pin = false;
      var url = baseUrl + 'user/updateNote';
      noteservice.putService(url, note)
        .then(function successCallback(response) {
          console.log(response);
          $scope.getAllNote();
        }, function errorCallback(response) {
          console.log("error" + response);
        })
    }

  }

var getImageUrl='';
  $scope.imageSelect = function(event, note) {
    console.log('goes under imge', event);
    if (event!= undefined) {
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
     note.image= response.data.msg;
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
      console.log('url inside update image',url);
      noteservice.putService(url,note).then(function successCallback(response) {

        console.log(response);
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    }
  $scope.removeImage = function(note) {

    console.log("image link", note.image);
    note.image = null;
    $scope.updateNote(note);

  };

  $scope.notes = [];
  $scope.getAllNote = function() {

    var url = baseUrl + "user/displayNote";
    noteservice.getService(url)
      .then(function successCallback(response) {
        // shownhide();

        console.log("get note response data", response.data);
        $scope.notes = response.data;

        console.log("getAllNote", $scope.notes);

      }, function errorCallback(response) {
        console.log(response, "note cannot be displayed");

      });
  };


     $scope.showCollaborator = function(ev) {
  console.log("comes under showAdvance from archive call");
         $mdDialog.show({

           controller: dialogCollaboratorController,
           templateUrl: 'templates/collaborator.html',
           parent: angular.element(document.body),
           targetEvent: ev,
           clickOutsideToClose:true,
           fullscreen : $scope.customFullscreen,
            })
     };
     function dialogCollaboratorController($scope,$mdDialog) {
     	  $scope.cancel = function() {
     	      $mdDialog.cancel();

     	    };
     	    var commonUrl = "http://localhost:9090/fundoo/";
     		$scope.createCollaborator = function() {
     			console.log("cvcxvxcvashds");
     			var collaborator = {
     					email : $scope.email,

     			};
     	         console.log("collaborator:",collaborator);
     			var url = commonUrl + "addCollaborator";
     			if(collaborator.email!=null){
     				console.log("inside if...", collaborator.email)

     			noteservice.postService(collaborator, url).then(
     					function successCallback(response) {

     						console.log("success", response.data);
     						$scope.getallCollaborators();
     						return response.data;

     					}, function errorCallback(response) {
     						console.log("Error occur", response);
     						return response;

     					});
     		}
     		}

     		$scope.getallCollaborators =function() {

     		    var url = commonUrl + "getallCollaborators";

     			noteservice.getService(url).then(
     					function successCallback(response) {

     						$scope.getCollaborators=response.data;
     						console.log('Collaborators: ', $scope.getCollaborators)
     						//console.log("success", response.data);
     						return response.data;

     					}, function errorCallback(response) {
     						console.log("Error occur", response);
     						return response;

     					});
     		}

     		$scope.deleteCollaborator =function(collaborator){

     			 console.log("collaborator:"+collaborator);
     			 var collaboratorid=collaborator.id;
     			 console.log("collaboratorid:"+collaboratorid)


     			 var url = commonUrl + "deleteCollaborator/"+collaborator.id;


     			userservice.notepostmethod(url).then(
     					function successCallback(response) {

     						console.log("success", response.data);
     						return response.data;

     					}, function errorCallback(response) {
     						console.log("Error occur", response);
     						return response;

     					});
     		}


       $scope.addCollaboratorOnNote=function(collaborator){
     	  console.log("collaborator:"+collaborator);
     		 var collaboratorid=collaborator.id;
     		 console.log("collaboratorid:"+collaboratorid)
     		console.log("noteid  in dashboard:",noteobject);
     	  var index=noteobject.listofCollaborator.findIndex(x => x.email===collaborator.email);
     	 if (index > -1) {
      	  noteobject.listofCollaborator.splice(index, 1);
        }
        else {
      	  noteobject.listofCollaborator.push(collaborator);
        }
     		 var url = commonUrl + "noteandcollaborator/"+noteobject.id+"/"+collaborator.id;
     		 console.log(url);
     		labelservice.labelputmethod(url).then(
     				function successCallback(response) {

     					console.log("success", response);
     					return response;

     				}, function errorCallback(response) {
     					console.log("Error occur", response);
     					return response;

     				});
     	}
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

});

app.filter('dateformat', function ($filter) {

	   return function (reminderDate) {

		   console.log("inside filter", reminderDate);
		   if( !reminderDate )
		   {
			   	return;
		   }

		   reminderDate = new Date( reminderDate );

		   var dt = "";
		   var todatedate = new Date();
		   console.log(todatedate.getMonth(), todatedate.getDate() );
		   var ltempToday = new Date( todatedate.getFullYear(), todatedate.getMonth(), todatedate.getDate() );

		   var ltempTom = new Date( todatedate.getFullYear(), todatedate.getMonth(), todatedate.getDate()+1 );
		   var ltempYes = new Date( todatedate.getFullYear(), todatedate.getMonth(), todatedate.getDate()-1 );

		   var ltempRD = new Date( reminderDate.getFullYear(), reminderDate.getMonth(), reminderDate.getDate() );

		   console.log(ltempRD);
		   console.log(ltempTom);

		   if( (ltempToday - ltempRD) == 0  )
		   {
			   dt += "Today";
		   }
		   else if( (ltempTom - ltempRD) == 0  ) {
			   dt += "Tomorrow";
		   }
		   else if( (ltempYes - ltempRD) == 0  ) {
			   dt += "Yesterday";
		   }
		   else
		   {
			   dt = $filter('date')(reminderDate, 'MMM dd, yyyy');
			   dt = dt.replace(", "+todatedate.getFullYear(),'');
		   }
		   // append time
		   var time = $filter('date')(reminderDate, 'hh:mm a');
		   dt += ", "+ time;
		   return dt;
	   };
	});
