app.filter('unique1',function()
{
  return function(collection,key)
  {
    var filteredArray = [];
    if(collection !=undefined){
    for(var i=0; i<collection.length; i++)
    {
      var item=collection[i];
      var flag=false;
      if(i==0)
      {
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
            filteredArray.push(item);
          }
        }
      }
    }
    //console.log(filteredArray);
return filteredArray;
};
});
