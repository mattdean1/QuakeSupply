$(document).ready(function(){
  initMap();
})

var addoutpost = false;
function toggle(){
  addoutpost = !addoutpost;
  var checkbox = $('#myonoffswitch')[0];
  checkbox.checked = !checkbox.checked;
}
function initMap(){
  var map = L.map('map').setView([40, 0],2);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'deanmatt.196lfc2a',
    accessToken: 'pk.eyJ1IjoiZGVhbm1hdHQiLCJhIjoiY2lzamdpdXJxMDAzMTJ0cm5nOWNyb3pnMSJ9.z8vZUaEEP1a4Akowh6Vzlw'
  }).addTo(map);

  var popup = L.popup();

  function onMapClick(e){
    if(addoutpost){
      swal( {   title: "An input!",
                text: "Write something interesting:",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Write something"
              },
              function(inputValue){   if (inputValue === false) return false;
                                      if (inputValue === "") {swal.showInputError("You need to write something!");return false }
                                      addOutpost(inputValue, e.latlng.lat, e.latlng.lng);
                                      swal("Nice!", "You added " + inputValue, "success");
                                      populateOutposts(map);
                                    }
            );
    }
  }
  map.on('click', onMapClick);

  populateOutposts(map);
}

function populateOutposts(map){
  //add a marker to the map for each outpost
  $.getJSON('/api/outposts', function(json){
    console.log(json);
    for(i=0; i<json.length; i++){
      var outpost = json[i];
      try{
        var lat = outpost.coords.lat;
        var long = outpost.coords.long;
        var marker = L.marker([lat, long]).addTo(map);
        marker.bindPopup("<b>"+outpost.name+"</b>");
      }catch(e){
      }
    }
  });
}

function addOutpost(name, latitude, longitude){
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
