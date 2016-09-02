function addOutpost(name, latitude, longitude){
  //add new outpost to the db using the api
  var outpost = {outpostname: name,lat: parseInt(latitude),long:parseInt(longitude)}
  $.ajax({
    type: 'POST',
    data: outpost,
    url: window.location.origin+'/api/addoutpost',
  })
}

function deleteOutpost(outpostid){
  $.ajax({
    type: "DELETE",
    url: window.location.origin+"/api/outposts/"+outpostid,
  });
}

function editOutpost(outpostid){
  var outpost = {outpostname: getVal("name"),
                 food: getVal("food"),
                 water: getVal("water"),
                 tarpaulin: getVal("tarpaulin")
               };
  $.ajax({
    type: "PUT",
    data: outpost,
    url: window.location.origin+"/api/outposts/"+outpostid
  });
}

//get the value/placeholder of an element from it's id
function getVal(id){
  var elem = $('#'+id);
  var val;
  if(elem.val()==""){ //if the value is blank, return the placeholder
    val = elem.attr("placeholder");
  }else{
    val = elem.val();
  }
  return val;
};
