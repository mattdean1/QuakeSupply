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
  console.log(outpostid);
  var outpost = {outpostname: getVal("name"),
                 food: getVal("food"),
                 water: getVal("water"),
                 tarpaulin: getVal("tarpaulin")
               };
  console.log(outpost);
  $.ajax({
    type: "PUT",
    data: outpost,
    url: window.location.origin+"/api/outposts/"+outpostid
  });
}
function getVal(id){
  var elem = $('#'+id);
  var val;
  if(elem.val()==""){
    val = elem.attr("placeholder");
  }else{
    val = elem.val();
  }
  return val;
};
