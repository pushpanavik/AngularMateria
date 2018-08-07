app
  .controller('noteCtrl', function(noteservice, $scope, $state, $location, $window,$mdDialog,$mdSidenav,$rootScope) {
    var baseUrl = "http://localhost:9090/fundoo/";

    var regex= /(<([^>]+)>)/ig;

    $scope.gotoTrashPage=function(){
      $state.go("home.trash");
    }

    $scope.goToNote=function(){
      $state.go("home.dashboard");
    }

    $scope.goToArchive=function(){
      $state.go("home.archive");
    }
    $scope.goToReminder=function(){
      $state.go("home.reminder");
    }

    if (localStorage.getItem('token')===null) {
      $state.go('Login');
    }

      $scope.goToLogin=function(){
        $window.localStorage.clear();
       $state.go('Login');
      }


    $scope.mdIconProvider=function(){
      $mdIconProvider
         .iconSet('call', 'img/icons/sets/communication-icons.svg', 24);
    }


   $scope.changeColor = function() {
       if ($state.is('home.dashboard')) {
         $scope.htitle = "Google keep";
             $scope.definedColor = {
                 'background-color': '#fb0',
                 'color': 'black'
       }
     }
        else if ($state.is('home.archive')) {
         $scope.htitle = "Archive";
             $scope.definedColor = {
                 'background-color': '#607d8b',
                 'color': '#ffffff'
             };
           }
        else if ($state.is("home.trash")) {
          $scope.htitle="Trash";
          $scope.definedColor = {
              'background-color': '#636363',
              'color': '#ffffff'
          };
       }
       else if($state.is('home.reminder')){
            $scope.htitle = "Reminder";
                $scope.definedColor = {
                    'background-color': '#607d8b',
                    'color': '#ffffff'
                };
              }
     };
     $scope.changeColor();



    $scope.showAdvanced = function(ev,note) {
console.log("comes under showAdvance from archive call");
        $mdDialog.show({

          controller: DialogController,
          templateUrl: 'templates/popupnote.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen : $scope.customFullscreen,
          locals:{
              mydata : note
            },
  })
    };
    function DialogController($scope,mydata){
      $scope.mydata= mydata;
      console.log('in dialog controller in mydata',mydata);
    }
    $scope.goToLabel=function(){
      $state.go('home.label');
    }

    $scope.createlabelDialog = function(ev,label) {
console.log("comes under showAdvance from archive call");
        $mdDialog.show({

          controller: DialogController2,
          templateUrl: 'templates/createLabel.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen : $scope.customFullscreen,
          locals:{
              labelpopup : label
            },
  })
    };
    function DialogController2($scope,labelpopup){

            $scope.labelpopup=labelpopup;
      console.log('in dialog controller in labelpopup',labelpopup);

      $scope.addLabel=function(label){
        console.log('inside add label');

        var label={

              name:$scope.name
        };
        console.log("label info",label);

        var url=baseUrl+"/user/addLabel";
        console.log("label info",label);

        if(label.name!=undefined){

          noteservice.postService(label,url)
          .then(function successCallback(response) {
            $scope.getAllLabel();
            console.log("successfully label added", response);


          }, function errorCallback(response) {
            console.log("label cannot be  added", response);

          });
        }

      }
      $scope.deleteLabel=function(label){
        console.log("label info inside delete function",label)
        var url=baseUrl + "user/delete/" +label.labelId;

        noteservice.getDeleteService(label,url)
        .then(function successCallback(response) {
          console.log("successfully label dleted", response);

            $scope.getAllLabel();
        }, function errorCallback(response) {
          console.log("label cannot be  dleted", response);

        });

      }


      $scope.updateLabel=function(label){

        console.log("inside update label method",label);
        var url=baseUrl + "user/updateLabel";
        noteservice.putService(url,label)
        .then(function successCallback(response) {
          console.log("label updated ", response);

          $scope.getAllLabel();
        }, function errorCallback(response) {
          console.log("label cannot be updated", response);

        });
      }

      $scope.getlabels=[];

         $scope.getAllLabel=function(){
           console.log("in get ll label");
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
         $scope.getAllLabel();
    }


    function dialogControl($scope,$mdDialog){
      $scope.cancel=function(){
        $mdDialog.cancel();
      };

      $scope.removeLabelOnNote=function(label,note){
        console.log("label in dashboard ", label);
        console.log("note in dashboard:", note);
        console.log('noteid in dashboard',note.id);
        var index=note.listOfLabels.findIndex(x => x.labelname===label.name);
        if (idx > -1) {
                 note.listOfLabels.splice(idx, 1);
             }
             else {
                 note.listOfLabels.push(label);
             }
             var url=baseUrl +"user/deleteLabel/" +note.id/+label.labelId;
             noteservice.getDeleteService(note,url)
             .then(function successCallback(response) {
               console.log(response);
               $scope.getAllLabels();
             }, function errorCallback(response) {
               console.log("error" + response);
             })
      }
      $scope.addlabelNote=function(label){
        console.log("label in dashboard ", label);
        console.log("note in dashboard:", noteobj);
        console.log('noteid in dashboard',noteobj.id);

        var idx=noteobj.listOfLabels.findIndex(x => x.labelname===label.name);
        if (idx > -1) {
                 noteobj.listOfLabels.splice(idx, 1);
             }
             else {
                 noteobj.listOfLabels.push(label);
             }

             var url= baseUrl +"user/updateNoteLabel/" +noteobj.id/ +label.labelId;
             console.log('url under allLabelNote',url);
             noteservice.putService(url, note)
               .then(function successCallback(response) {
                 console.log("relation on label and note is updated",response);
                $scope.getAllLabels();
               }, function errorCallback(response) {
                 console.log("cannot update note", response);
               });
      }

      $scope.getLabelNote=[];
      $scope.getLabelOnNote=function(){
        console.log("label id in getLabelOnNote", label.id);

        var url=baseUrl +"user/labelNote/" +label.id;
        noteservice.getService(url)
        .then(function successCallback(response) {
        console.log(response);
        $scope.getAllLabels();
      }, function errorCallback(response) {
        console.log("error" + response);
      });
      }

    }

    $scope.noteModel = function() {
        var note = {
        title: $scope.title,
        description: $scope.description,
        reminderDat:'',
        reminderTime:'',
        color: $scope.mycolor,
        archive: false,
        pin: false,
        trash: false
      };
      var url = baseUrl + "user/addNote";

      console.log("user info",note);
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

    $scope.notes = [];

    $scope.getAllNote = function() {

      var url = baseUrl + "user/displayNote";
      noteservice.getService(url)
        .then(function successCallback(response)
        {
          // shownhide();
            console.log("get all notes"+response);
          $scope.notes = response.data;

        }, function errorCallback(response) {
          console.log(response, "note cannot be displayed");

        });
    };
    $scope.retireveLabels=[];
      $scope.getAllLabels=function(){

        var url=baseUrl + "user/displayLabel";
        noteservice.getService(url)
        .then(function successCallback(response) {
        $scope.retireveLabels=response.data;
        console.log(response);

      }, function errorCallback(response) {
        console.log("error" + response);
      });
    }

    $scope.isVisible = false;
         $scope.clickProfile = function() {
           console.log('inside profile');

          if($scope.isVisible ===false){
            $scope.isVisible=true;
            var tokenL = localStorage.getItem('token');
            console.log('token inside getUser from token',tokenL);
            var user = {};
            if (tokenL !== undefined) {
                var encode = tokenL.split('.')[1];
                userDetail = JSON.parse(tokenDecode(encode));

                  console.log('hjdfsdhfsdf',userDetail.iss);
                  $scope.userDetails=userDetail;
                  console.log($scope.userDetails);
                } else {
                  $location.path('Login');
                }

              } else {
                $scope.isVisible = false;
              }
            }


    $scope.changeView=false;
        $scope.toggleView=function()
        {
          console.log('inside toggleView');
            $scope.changeView = !$scope.changeView;
            var notes = document.getElementsByClassName("dashboard");
            if($scope.changeView)
            {
                for (i = 0; i < notes.length; i++) {
                    notes[i].style.width = "79%";
                    notes[i].style.marginLeft="10%";
                }
            }
            else
            {
                for (i = 0; i < notes.length; i++) {
                    notes[i].style.width = "30%";
                    notes[i].style.marginLeft="0%";
                }
            }
        }

$scope.text="Title";

$scope.showWhenClicked=false;
$scope.open = function () {
  console.log('inside open');
  $scope.showWhenClicked = true;
};

    $scope.updateColor = function(note, t1) {
    if(note===undefined){
    $scope.mycolor=t1;

        console.log('color is',$scope.mycolor);
      }
        else{

          note.color=t1;
      var url = baseUrl + "user/updateNote";
      noteservice.putService(url, note)
        .then(function successCallback(response) {
          console.log("note successfully updated",response);
          $scope.getAllNote();
        }, function errorCallback(response) {
          console.log("cannot update note", response);
        });
  }

}

$scope.updateNoteTitleDescripn=function(note){
  var url = baseUrl + "user/updateNote";
  console.log('inside update method of title and description',note);
  noteservice.putService(url, note)
    .then(function successCallback(response) {
      console.log("note successfully updated",response);
      $scope.getAllNote();
    }, function errorCallback(response) {
      console.log("cannot update note", response);
    });
};
$scope.goToSearch = function() {
  $state.go('home.search');
}

function tokenDecode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        return window.atob(output);
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


    $scope.hoverIn = function(ev) {
    	    this.hoverEdit = true;
    	  };

    	  $scope.hoverOut = function(ev) {
    	    this.hoverEdit = false;
    	  };



    $scope.activateEdit = function (item) {
            item.editable = true;
        };
        $scope.deactivateEdit = function (item) {
            item.editable = false;
        };

$scope.more=['Delete note','Add label'];

$scope.mList = [{
      option: 'Delete note'
    },
    {
      option: 'Add Label'
    }
  ];

  $scope.openMenu = function($mdMenu, ev) {

     ev.preventDefault();
     ev.stopPropagation();
     $mdMenu.open(ev);
   };

   $scope.closeMenu=function($mdMenu,ev){
     $mdMenu.close(ev);
   }

  $scope.today = new Date();
  $scope.todayReminder = function(note) {
       note.reminderDate="Today,8:00 PM";
        $scope.UpdateReminderDate(note);
        console.log('pushpa note info',note);
    }




  $scope.tomorrowReminder = function(note) {
     note.reminderDate="Tomorrow,8:00 AM";
    $scope.UpdateReminderDate(note);
  }

  $scope.nextWeekReminder = function(note) {
    console.log("inside nextWeekReminder");
    $scope.nextWeek = new Date();

    $scope.nextWeek.setDate($scope.nextWeek.getDate() + 7);
    $scope.nextWeek.setHours(08);
    note.reminderDate = $scope.nextWeek;
    console.log('note.reminderDate',note);
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


   // $scope.isReminderVisible=false;
   //  $scope.clickReminder = function(note) {
   //      $scope.isReminderVisible = !$scope.isReminderVisible;
   //
   //      console.log("Reminder",$scope.isReminderVisible);
   //
   //      note.editable=$scope.isReminderVisible;
   //      //=$scope.isReminderVisible;
   //  };


    $scope.Time=[
        {'name':'Morning   ','value':'8:00 AM'},
       {'name':'Afternoon ','value':'1:00 PM'},
       {'name':'Evening  ','value':'6:00 PM'},
       {'name':'Night    ','value':'8:00 PM'},
       {'name':'custom','value':''}

    ]


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

     updatePin(note);
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

$scope.goToLabelPage=function(label){
  if(event!==undefined){
        event.stopPropagation();}
  console.log("go to label page");
  var labelid=label.id;
  $state.go('home.label',{labelid:label.id});
  $scope.getLabelOnNote(label);
}

$scope.close = false;
    $scope.done = false;
    $scope.add = true;
    $scope.isClicked = false;
    $scope.changeIcon = function() {
      $scope.isClicked = !$scope.isClicked;
      if ($scope.isClicked) {
        $scope.add = true;
        $scope.close = false;
        $scope.done = false;
      } else {
        $scope.add = false;
        $scope.close = true;
        $scope.done = true;
      }
    }


var noteobj=[];
$scope.showlabeldialog=function(event,note,noteservice){
  console.log("inside showlabeldialog:  ",note);
  noteobj=note;

  $mdDialog.show({
    locals:{mydata1 :note},
    controller: dialogControl,
    templateUrl :'templates/labelDialog.html',
    parent: angular.element(document.body),
    targetEvent:event,
    clickOutsideToClose:true

  })
  console.log('dialog event mydata1..........',mydata1);
}





  });
