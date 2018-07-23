// app.directive("contenteditable", function() {
// 	return {
//         restrict: "A",
//         require: "ngModel",
//         link: function(scope, element, attrs, ngModel) {
//
//             function read() {
// 							var html = element.html();
// 							 html = html.replace(/&nbsp;/g, "\u00a0");
// 							 ngModel.$setViewValue(html);
//             }
//             // model -> view
//             ngModel.$render = function() {
//               element.html(ngModel.$viewValue || "");
//             };
//
//             element.bind("blur", function() {
//                 scope.$apply(read);
//             });
//
//         }
// 	};
// });
