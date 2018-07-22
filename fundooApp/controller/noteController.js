app
  .controller('noteCtrl', function(noteservice, $scope, $state, $location, $window) {
    var baseUrl = "http://localhost:9090/fundoo/";

    $scope.noteModel = function() {
      var note = {
        title: $scope.title,
        description: $scope.description,
        color: "white",
        isArchive: false,
        isPin: false,
        isTrash: false
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

    $scope.notes = [];

    $scope.getAllNote = function() {
      console.log("r1");
      var url = baseUrl + "user/displayNote";
      noteservice.getService(url)
        .then(function successCallback(response) {
          console.log(response);
          $scope.notes = response.data;
          console.log("noteinfo", $scope.notes);
          console.log("note successfully added");

        }, function errorCallback(response) {
          console.log(response, "note cannot be displayed");

        });
    };

    $scope.updateNote = function(note, t1) {
      var updatenote = {

        title: note.title,
        description: note.description,
        color: t1,
        isArchive: false,
        isPin: false,
        isTrash: false,
        createdBy: note.createdBy,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        lastupdatedAt: note.lastupdatedAt,
        image: note.image
      };

      console.log("color set is", updatenote);
      localStorage.getItem("token")
      var url = baseUrl + "user/updateNote";

      noteservice.putService(url, updatenote)
        .then(function successCallback(response) {
          console.log(response);
          $scope.putNoteData = response.data;
          console.log($scope.putNoteData);
          console.log("note successfully updated");
        }, function errorCallback(response) {
          console.log("cannot update note", response);
        });
    };

    //$('#txt').text('Take a note');


    $scope.deleteNote = function(note, option) {
      switch (option) {
        case 'Delete forever':
          var url = baseUrl + "user/deleteNote/" + notes.id;

          noteservice.getDeleteService(notes, url)
            .then(function successCallback(response) {
              $scope.getAllNote();
              console.log(response);
              console.log("Note deleted");
              console.log("note successfully updated");
            }, function errorCallback(response) {
              console.log("cannot delete note", response);
            })
          break;
        case 'Restore':
          $scope.isTrash(note);
          break;
      }
    }


    $scope.customerData = [
      [{
        name: "#FFFFFF"
      }, {
        name: "#339E42"
      }, {
        name: "#039BE5"
      }],
      [{
        name: "#EF6C00"
      }, {
        name: "#A1887F"
      }, {
        name: "#607D8B"
      }],
      [{
        name: "#039BE5"
      }, {
        name: "#009688"
      }, {
        name: "#536DFE"
      }],
      [{
        name: "#AB47BC"
      }, {
        name: "#E53935"
      }, {
        name: "#3F51B5"
      }]
    ];

    $scope.isTrash = function(notes) {
      if (user.isTrash === false) {
        user.isTrash = true
      } else {
        user.isTrash = false;
      }
      noteservice.postService(url, note)
        .then(function successCallback(response) {
          $scope.getAllNote();
          console.log("Note deleted");
          console.log("note successfully updated");
        }, function errorCallback(response) {
          console.log("cannot delete note", response);
        });
    }

    $scope.showArchiveNote;
    $scope.isArchive = function(note) {
var url=baseUrl+ "user/updateNote";
      if (note.isArchive === false) {
        $scope.showArchiveNote=true;
        note.isArchive = true;
      } else {
        $scope.showArchiveNote=false;
        note.isArchive = false;
      }

      noteservice.postService(note,url)
        .then(function successCallback(response) {
          $scope.getAllNote();

          console.log("note successfully updated");
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


    $scope.isPin = function(notes) {

      if (note.isPin === false) {
        note.isPin = true;
      } else {
        note.isPin = false;
      }
      noteservice.postService(url, note)
        .then(function successCallback(response) {
          $scope.getAllNote();

          console.log("note successfully updated");
        }, function errorCallback(response) {
          console.log("cannot update note", response);
        });
    }

    $scope.actionFunction = function(option,note) {
      switch (option) {
        case 'Delete note':
          $scope.isTrash(note);
          break;
        case 'Add label':
          break;
        case 'Make a copy':
          break;
        case 'Show checkboxes':
          break;
        case 'Copy to Google Docs':
          break;
      }
    }

    $scope.activateEdit = function (item) {
            item.editable = true;
        };
        $scope.deactivateEdit = function (item) {
            item.editable = false;
        };

$scope.more=['Delete note','Add label','Make a copy','Show checkboxes','Copy to Google Docs'];
  });
