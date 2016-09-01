//var initmap = require('./outpostmap.js');
function addOutpost(name, latitude, longitude){
  //add new outpost to the db using the api
  var outpost = {outpostname: name,lat: parseInt(latitude),long:parseInt(longitude)}
  $.ajax({
    type: 'POST',
    data: outpost,
    url: window.location.origin+'/api/addoutpost',
  }).done(function(response){
    if(response.message === 'outpost added'){
      console.log("success");
    }else{
      console.log("failure");
    }
  })
}
