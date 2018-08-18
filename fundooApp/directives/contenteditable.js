// app.directive('contenteditable', function() {
//     return {
//       restrict: 'A', // only activate on element attribute
//       require: '?ngModel', // get a hold of NgModelController
//       link: function(scope, element, attrs, ngModel) {
//         if(!ngModel) return; // do nothing if no ng-model
//
//         // Specify how UI should be updated
//         ngModel.$render = function() {
//           element.html(ngModel.$viewValue || '');
//         };
//
//         // Listen for change events to enable binding
//         element.on('blur keyup change', function() {
//           scope.$apply(read);
//         });
//         read(); // initialize
//
//         // Write data to the model
//         function read() {
//           var html = element.html();
//           // When we clear the content editable the browser leaves a <br> behind
//           // If strip-br attribute is provided then we strip this out
//           if( attrs.stripBr && html == '<br>' ) {
//             html = '';
//           }
//         / ngModel.$setViewValue(html);
//         }
//       }
//     };
//   });

app.directive('newcontenteditable', function() {
  return {
      require: '?ngModel',
      scope: {
      },
      link: function(scope, element, attrs, ctrl,ngModel) {
        if(ngModel!=null){
          element.bind('blur', function() {
              scope.$apply(function() {
               ctrl.$setViewValue(element.html());
              });
          });
          ctrl.$render = function() {
              element.html(ctrl.$viewValue);
          };
          ctrl.$render();
          scope.$on('$destroy', function() {
              element.unbind('blur');
              element.unbind('paste');
              element.unbind('focus');
          });
      }
    }
  };
});
