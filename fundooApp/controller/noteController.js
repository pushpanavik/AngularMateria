app.controller('noteCtrl', function(noteservice, $scope, $state, $location, $timeout, Upload, $window, $mdDialog, $mdSidenav, $rootScope) {
  var baseUrl = "http://localhost:9090/fundoo/";
  $scope.gotoTrashPage = function() {
    $state.go("home.trash");
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

  $scope.goToLabel = function() {
    $state.go('home.label');
  }
  if (localStorage.getItem('token') === null) {
    $state.go('Login');
  }

  $scope.toggleLeft = buildToggler('left');

   function buildToggler(componentId) {
     return function() {
       $mdSidenav(componentId).toggle();

       var isOpen=$mdSidenav(componentId).isOpen();
       if(isOpen){
       document.getElementById("sidenavId").style.marginLeft="200px";
     }else {
       document.getElementById("sidenavId").style.marginLeft="0px";
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

   $scope.closeMenu=function($mdMenu,ev){
     $mdMenu.close(ev);
   }
  $scope.showAdvanced = function(ev, note) {
    console.log("comes under showAdvance from archive call");
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

    console.log('label insde create label', label);
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

  function DialogController2($scope, labelpopup) {

    $scope.labelpopup = labelpopup;
    console.log('in dialog controller in labelpopup', labelpopup);

    $scope.addLabel = function(label) {
      console.log('inside add label');

      var label = {

        name: $scope.name
      };

     if (label.name != $scope.name ) {

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
        .then(function successCallback(response){
          console.log("get all labels" + response);
          $scope.getlabels = response.data;

        }, function errorCallback(response) {
          console.log(response, "get all labels cannot be displayed");

        });
    }
    $scope.getAllLabel();
  }
  $scope.goToLabelPage=function(label){
    if(event!==undefined){
          event.stopPropagation();}
    console.log("go to label page");
    var labelid=label.id;
    $state.go('home.label',{labelid:label.id});
    $scope.getLabelOnNote(label);
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

    $scope.removeLabelOnNote = function(label, note) {
      console.log("label in dashboard ", label);
      console.log("note in dashboard:", note);
      console.log('noteid in dashboard', note.id);
      var index = note.listOfLabels.findIndex(x => x.labelname === label.name);
      if (idx > -1) {
        note.listOfLabels.splice(idx, 1);
      } else {
        note.listOfLabels.push(label);
      }
      var url = baseUrl + "user/deleteLabel/" + note.id / +label.labelId;
      noteservice.getDeleteService(note, url)
        .then(function successCallback(response) {
          console.log(response);
          $scope.getAllLabels();
        }, function errorCallback(response) {
          console.log("error" + response);
        })
    }



    $scope.retireveLabels=[];
      $scope.getAllLabels=function(){

        var url=baseUrl + "user/displayLabel";
        noteservice.getService(url)
        .then(function successCallback(response) {
        $scope.retireveLabels=response.data;
        console.log('response', $scope.retireveLabels);

      }, function errorCallback(response) {
        console.log("error" + response);
      });
    }


    $scope.addlabelNote = function(label) {
      console.log("label in dashboard ", label);
      console.log("note in dashboard:", noteobj);
      console.log('noteid in dashboard', noteobj.id);

      var idx = noteobj.listOfLabels.findIndex(x => x.labelname === label.name);
      if (idx > -1) {
        noteobj.listOfLabels.splice(idx, 1);
      } else {
        noteobj.listOfLabels.push(label);
      }

      var url = baseUrl + "user/updateNoteLabel/" + noteobj.id / +label.labelId;
      console.log('url under allLabelNote', url);
      noteservice.putService(url, note)
        .then(function successCallback(response) {
          console.log("relation on label and note is updated", response);

        }, function errorCallback(response) {
          console.log("cannot update note", response);
        });
    }

    $scope.getLabelNote = [];
    $scope.getLabelOnNote = function(Label) {

      console.log("label id in getLabelOnNote");

      var url = baseUrl + "user/displayLabel" + label.id;
      noteservice.getService(url)
        .then(function successCallback(response) {
          console.log(response);
          $scope.getLabelNote = response.data;
        }, function errorCallback(response) {
          console.log("error" + response);
        });
    }
  }

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
      image:''
    };
    var url = baseUrl + "user/addNote";

    console.log("user info", note);
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

  $scope.showWhenClicked = false;
  $scope.open = function() {
    console.log('inside open');
    $scope.showWhenClicked = true;
  };

  $scope.customerData = [[{name: "#FFFFFF"},{name: "rgb(255, 138, 128)"}, {name: "rgb(255, 209, 128)"}],
                        [{name: "rgb(255, 255, 141)"},{name: "rgb(204, 255, 144)"}, {name: "rgb(167,255,235)"}],
                        [{name: "rgb(128, 216, 255)"}, {name: "rgb(130, 177, 255)"}, {name: "rgb(179, 136, 255)"}],
                        [{name: "rgb(248, 187, 208)"}, {name: "rgb(215, 204, 200)"}, {name: "rgb(207, 216, 220)"}]];

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
  $scope.isTrash = function(note)
     {
      var url=baseUrl + "user/updateNote";
      console.log("before method call inside trash",note.trash);
      if (note.trash === false) {
        note.trash = true;
        note.pin=false;
        note.archive-false;
      } else {
        note.trash = false;
      }
      noteservice.putService(url, note)
        .then(function successCallback(response) {
        $scope.getAllNote();
          console.log("note successfully updated",response);
        }, function errorCallback(response) {
          console.log("cannot delete note", response);
        });
    }

    $scope.showArchiveNote=false;
    $scope.isArchive = function(note) {
      console.log('note info inside archive ',note);
      var url=baseUrl+ "user/updateNote";
      if (note.archive === false) {
        $scope.showArchiveNote=true;
        note.archive = true;
        note.pin=false;
      } else {
        $scope.showArchiveNote=false;
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

$scope.UpdateReminderDate=function(note){

if(note!==undefined){
  console.log('note under updateReminderDate',note);

  var url=baseUrl+ "user/updateNote";
  noteservice.putService(url, note)
    .then(function successCallback(response) {
      console.log("response from update reminder..........." +response);
      $scope.getAllNote();
      }, function errorCallback(response) {
      console.log("cannot update note", response);
    });
}
}
$scope.reminder=false;
  $scope.today = new Date();
  $scope.todayReminder = function(note) {
      $scope.today.setHours('20');
     $scope.today.setMinutes('00');
     note.reminderDate=$scope.today;
    $scope.reminder=true;
        $scope.UpdateReminderDate(note);

        console.log('pushpa note info',note);
    }

  $scope.tomorrowReminder = function(note) {
    $scope.Tommorrow=new Date();
  //  $scope.Tommorrow.setDate()$scope.nextWeek.getDate()+1);
    $scope.Tommorrow.setHours('20');
   $scope.Tommorrow.setMinutes('00');
     note.reminderDate=$scope.Tommorrow;
      $scope.reminder=true;
    $scope.UpdateReminderDate(note);

  }

  $scope.nextWeekReminder = function(note) {
    console.log("inside nextWeekReminder");
    $scope.nextWeek = new Date();

    $scope.nextWeek.setDate($scope.nextWeek.getDate() + 7);
    $scope.nextWeek.setHours(08);
    note.reminderDate = $scope.nextWeek;
    console.log('note.reminderDate',note);
     $scope.reminder=true;
    $scope.UpdateReminderDate(note);

      }



  $scope.removeReminder = function(note) {
    console.log("inside remove reminder method...");
    note.reminderDat=null;
    note.reminderTime=null;
    $scope.UpdateReminderDate(note);
  }

   $scope.ReminderDate=function(note)
       {
         console.log("reminderTime",note);
         $scope.today = new Date();
         var myDate = new Date(note.reminderDat);
         console.log('mydate',myDate);

         if(note.reminderTime.split(':')[1].split(' ')[1]==='PM')

   {
       var a=note.reminderTime.split(':')[0];
       console.log('a',a);
       var b=12;
       var time24=addTime(a,b);
       console.log("time in 24 hr"+time24);
       myDate.setHours(time24);
       myDate.setMinutes(note.reminderTime.split(':')[1].split(' ')[0]);

       console.log("date and time "+myDate+" "+myDate.getHours()+" "+myDate.getMinutes());
   }
   else {
       myDate.setHours(note.reminderTime.split(':')[0]);
       myDate.setMinutes(note.reminderTime.split(':')[1].split(' ')[0]);

   console.log("date and time "+myDate+" "+myDate.getHours()+" "+myDate.getMinutes());
   }

       console.log("myDate with time",myDate+note.reminderTime.split(':')[1].split(' ')[1]);

 note.reminderDate=myDate;

     $scope.UpdateReminderDate(note);

   };

   function addTime(a,b)
    {
        console.log("value of a and b",a+" "+b);
        var count=0;
        while (count<a)
        {
            b++;
            count++;

        }
        return b;
    }
    var deleteNoteforever = function(note) {

         console.log("In delte forever",note);
         var url = baseUrl + 'user/deleteNote/' + note;

         noteservice.getDeleteService(note,url)
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
         noteservice.putService(url,note).then(function successCallback(response) {

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
          }
          else if(index==1){
            console.log("index");
            addLabel(note);
          }
        }

        $scope.trashNote = function(index, note) {
          console.log("in ctrl trash");
          if (index ==0 ) {
            deleteNoteforever(note.id);
          }
          if (index == 1) {
            restoreNote(note, false)
          }
        }

        $scope.isPinNote=function(note)
      {
          if(note.pin===false)
          {
              $scope.showPinNote=false;
          }
          else
          {
              $scope.showOtherNote=true;
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

        $scope.uploadFiles = function (files,evt) {
             $scope.files = files;

               var url= baseUrl+"uploadFile";
             if (files && files.length) {
                 Upload.upload({
                     url: url,
                     data: {
                         files: files,
                         method: "POST"
                     }
                 }).then(function (response) {
                     $timeout(function () {
                         $scope.result = response.data;
                     });
             });
           }
         };
        $scope.imageSelect=function(event,note)
           {
             console.log('goes under imge');
               if(event!=undefined)
               {
                   event.stopPropagation();
               }
     document.addEventListener("change",function(event){
     console.log('inside document');
       var form = new FormData();
       console.log("form",event.target.files[0]);

       form.append("file", event.target.files[0]);
       console.log("form is" +form);
       var url=baseUrl+"uploadFile";
       console.log("url",url);
       noteservice.postImageService(form,url).then(function successCallback(response) {
          console.log("Upload Successfully done",response);
          note.image=response.data;
       }, function errorCallback(response) {
           console.log(" Upload failed",response);
       });
     });
     };

     $scope.removeImage=function(note)
            {

                console.log("image link",note.image);
                note.image=null;
                $scope.updateNote(note);

            };
         $scope.Time=[
             {'name':'Morning   ','value':'8:00 AM'},
            {'name':'Afternoon ','value':'1:00 PM'},
            {'name':'Evening  ','value':'6:00 PM'},
            {'name':'Night    ','value':'8:00 PM'},
            {'name':'custom','value':''}

         ];

  $scope.notes = [];

  $scope.getAllNote = function() {

    var url = baseUrl + "user/displayNote";
    noteservice.getService(url)
      .then(function successCallback(response) {
        // shownhide();
        console.log("get all notes" + response);
        $scope.notes = response.data;

      }, function errorCallback(response) {
        console.log(response, "note cannot be displayed");

      });
  };


  //    $scope.showCollaborator = function(ev) {
  // console.log("comes under showAdvance from archive call");
  //        $mdDialog.show({
  //
  //          controller: DialogCollaboratorController,
  //          templateUrl: 'templates/collaboratorDialog.html',
  //          parent: angular.element(document.body),
  //          targetEvent: ev,
  //          clickOutsideToClose:true,
  //          fullscreen : $scope.customFullscreen,
  //           })
  //    };
  //
  // function DialogCollaboratorController{
  //
  // }

})
