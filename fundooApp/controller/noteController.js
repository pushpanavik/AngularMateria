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

      $scope.myVar = false;
          $scope.logOut = function() {
              $scope.myVar = !$scope.myVar;
          };

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
        color: "white",
        archive: false,
        pin: false,
        trash: false
      };
      var url = baseUrl + "user/addNote";
      console.log(localStorage.getItem("token"));
      if ($scope.title != null && $scope.description != null) {
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
          $scope.notes = response.data;
          console.log("noteinfo", $scope.notes);
        }, function errorCallback(response) {
          console.log(response, "note cannot be displayed");

        });
    };
    $scope.changeView=false;
        $scope.toggelView=function()
        {
            $scope.changeView = !$scope.changeView;
            var notes = document.getElementsByClassName("mycard");
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

    $scope.updateNote = function(note, t1) {

      console.log("before note Info",note);
      note.color=t1;
      console.log("note inside update method",note.id);
      var url = baseUrl + "user/updateNote";

      noteservice.putService(url, note)
        .then(function successCallback(response) {
          console.log("note successfully updated",response);
          $scope.getAllNote();
        }, function errorCallback(response) {
          console.log("cannot update note", response);
        });
    };

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


    $scope.customerData = [
      [{
        name: "#FFFFFF"
      }, {
        name: "#ff0000"
      }, {
        name: "#FFA500"
      }],
      [{
        name: "#FFFF00"
      }, {
        name: "#008000"
      }, {
        name: "#008080"
      }],
      [{
        name: "#0000FF"
      }, {
        name: "#003366"
      }, {
        name: "#800080"
      }],
      [{
        name: "#AB47BC"
      }, {
        name: "#E53935"
      }, {
        name: "#3F51B5"
      }]
    ];

    $scope.isTrash = function(note)
     {
      var url=baseUrl + "user/updateNote";
      console.log("before method call",note);
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

    $scope.showArchiveNote;
    $scope.isArchive = function(note) {
      console.log('note info inside archive ',note.archive);
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

        $scope.archiveNote = function(notes) {
           if (notes === undefined) {
             $scope.isArchive = true;
           } else if (notes.archive=== false) {
             console.log("In archived false");
             notes.archive = true;

             var url = baseurl + 'user/updateNote' ;
            noteservice.postService(note, url).then(function successCallback(response) {
               console.log(response);
               getAllNote();
             }, function errorCallback(response) {
               console.log("erorr.................");
               console.log("error" + response.data);
             })
           } else {
             notes.archive = false;
             var url = baseurl + 'updateNote/';
            noteservice.postService(note, url)
             .then(function successCallback(response) {
               console.log(response);
                 $scope.getAllNote();

             }, function errorCallback(response) {
               console.log("error" + response.data);
             })
           }
         }
$scope.more=['Delete note','Add label','Make a copy','Show checkboxes','Copy to Google Docs'];

$scope.mList = [{
      option: 'Delete note'
    },
    {
      option: 'Add Label'
    }
  ];
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
        trashNote(note)
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

    var shownhide = function() {
   var array1 = $scope.notes;
   console.log(array1);
   for (var i = 0; i < array1.length; i++) {
     var noteI = array1[i];
     if (noteI.pin === true) {
         $scope.showOnePin = true;
     } else if (noteI.pin === false) {
       $scope.showOtherPin = true;
     }
   }
 }
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
