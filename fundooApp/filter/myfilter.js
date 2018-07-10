app.filter('unique1',function()
{
  // This will return a function that will take in a collection and a key name
  return function(collection,key)
  {
    // we define filterArray that will store all the values
    var filteredArray = [];

    // initilally the collection is not defined so we make it undefined
    if(collection !=undefined){

    for(var i=0; i<collection.length; i++)
    {
      var item=collection[i];
      var flag=false;
      if(i==0)
      {
        // push this item in the filterArray if it comes for the first time.
        filteredArray.push(item);
      }
      else{
        for(var j=0;j<filteredArray.length;j++){
          var filteritem=filteredArray[j];
          if(item.specs[key]==filteritem.specs[key])  {
            flag=true;
          }
        }
          if(!flag){
            // if flag is false push the item in the filterArray
            filteredArray.push(item);
          }
        }
      }
    }
    //console.log(filteredArray);
return filteredArray;
};
});
