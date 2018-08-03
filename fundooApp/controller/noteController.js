app
  .controller('noteCtrl', function(noteservice, $scope, $state, $location, $window,$mdDialog,$mdSidenav) {
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
    $scope.noteModel = function() {
        var note = {
        title: $scope.title,
        description: $scope.description,
        reminderDate:'',
        reminderTime:'',
        color: $scope.mycolor,
        archive: false,
        pin: false,
        trash: false
      };
      var url = baseUrl + "user/addNote";

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
            console.log("get all notes",response);
          $scope.notes = response.data;

        }, function errorCallback(response) {
          console.log(response, "note cannot be displayed");

        });
    };
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

$scope.isVisible = false;
     $scope.clickProfile = function() {
       console.log($scope.isVisible);
      $scope.IsVisible = !$scope.IsVisible;
      console.log('after',$scope.isVisible);
    };

$scope.profileInfo=function()
    {
        $scope.userData=noteservice.getUserToken();
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

  console.log("from UpdateReminderDate(): ",note);
  var url=baseUrl+ "user/updateNote";
  noteservice.putService(url, note)
    .then(function successCallback(response) {
      $scope.getAllNote();
      }, function errorCallback(response) {
      console.log("cannot update note", response);
    });
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

$scope.more=['Delete note','Add label','Make a copy','Show checkboxes','Copy to Google Docs'];

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

   $scope.getTodayTime = function() {
    var date = new Date();
    if (date.getHours() > 12) {
      $scope.todaystime = "8:00 PM";
    } else {
      $scope.todaystime = "8:00 AM";
    }
  }
  $scope.today = new Date();
  $scope.todayReminder = function(note) {
    if ($scope.today.getHours() > 20 && $scope.today.getHours() < 8) {
      note.reminderDate=$scope.today;
      $scope.today.setHours(08);
        $scope.UpdateReminderDate(note);
      // $scope.today.setMinutes(00);
    } else if ($scope.today.getHours() < 20 && $scope.today.getHours() > 8) {
        note.reminderDate=$scope.today;
      $scope.today.setHours(20);
      // $scope.today.setMinutes(00);
        $scope.UpdateReminderDate(note);
    }

  }


  $scope.tomorrowReminder = function(note) {
    $scope.tomorrow = new Date();

    $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
    $scope.tomorrow.setHours(08);
    note.reminderDate = $scope.tomorrow;
    $scope.UpdateReminderDate(note);
  }

  $scope.nextWeekReminder = function(note) {
    console.log("inside nextWeekReminder");
    $scope.nextWeek = new Date();

    $scope.nextWeek.setDate($scope.nextWeek.getDate() + 7);
    $scope.nextWeek.setHours(08);
    note.reminderDate = $scope.nextWeek;
    console.log('note.reminderDate',note.reminderDate);
    $scope.UpdateReminderDate(note);
      }




  $scope.removeReminder = function(note, key) {
    console.log("inside remove reminder method...");
    note.reminderDate='';
    note.reminderTime=null;
    $scope.UpdateReminderDate(note);
  }

   $scope.ReminderDate=function(note)
       {
         $scope.today = new Date();
         var myDate = new Date(note.reminderDate);
         console.log('reminderTime is',note.reminderTime);
                 if($scope.today.getHours() > 12){
               myDate.setHours(note.reminderTime.split(':')[0]);
               myDate.setMinutes(note.reminderTime.split(':')[1].split(' ')[0]);
           }else if($scope.today.getHours() < 12) {
               myDate.setHours('20');
               myDate.setMinutes('00');
           }
           // console.log("myDate with time",myDate+note.reminderTime.split(':')[1].split(' ')[1]);

     note.reminderDate=myDate;

     $scope.UpdateReminderDate(note);

   };


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
        {'name':'Morning   8:00 AM','value':'8:00 AM'},
       {'name':'Afternoon 1:00 PM','value':'1:00 PM'},
       {'name':'Evening   6:00 PM','value':'6:00 PM'},
       {'name':'Night     8:00 PM','value':'8:00 PM'},
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





  });
