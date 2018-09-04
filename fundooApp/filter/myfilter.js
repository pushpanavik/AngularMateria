// app.filter('myfilter', function() {
//     return function(getUser,getCollaboratedUser)
//     {
//         var displayData = getUser;
//
//          console.log("dispaly Data      ",displayData);
//          console.log("Collabarator Data ",getCollaboratedUser);
//
//         if (getCollaboratedUser.length > 0 || getUser.length > 0)
//         {
//             if (getUser.length > 0)
//             {
//                 for(var i=0;i<getUser.length;i++)
//                 {
//                    console.log("All Users",getUser[i][1]);
//                     for(var j=0;j<getCollaboratedUser.length;j++)
//                     {
//                         console.log("All CollaboratorUsers",getCollaboratedUser[j].id);
//
//                         if(getUser[i][1]===getCollaboratedUser[j].id)
//                         {
//                             var index=displayData.indexOf(getUser[i]);
//                             displayData.splice(index,1);
//                         }
//                     }
//                 }
//
//             }
//         }
//
//         return displayData;
//
//     };
// });
