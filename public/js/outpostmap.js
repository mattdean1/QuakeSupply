$(document).ready(function(){
  //get latest significant quake to centre the map around
  $.getJSON('/api/earthquakes', function(json){
    console.log(json);
    initMap(json);
  });
})

function initMap(json){
  var quake = json.features[0];
  var coordinates = quake.geometry.coordinates;
  var long = coordinates[0];
  var lat = coordinates[1];

  //map and tiles
  var map = L.map('map').setView([lat, long],4);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'deanmatt.196lfc2a',
    accessToken: 'pk.eyJ1IjoiZGVhbm1hdHQiLCJhIjoiY2lzamdpdXJxMDAzMTJ0cm5nOWNyb3pnMSJ9.z8vZUaEEP1a4Akowh6Vzlw'
  }).addTo(map);

  //epicentre label
  var magnitude = quake.properties.mag;
  var time      = (new Date(quake.properties.time)).toUTCString(); //convert to human readable
  var epicentre = "<b>Epicentre</b><br>";
      epicentre+= "Magnitude: "+magnitude+"<br>";
      epicentre+= "Time: "+time;
  var popup = L.popup({closeOnClick:false, closeButton: false})
    .setContent(epicentre);
  var marker = L.marker([lat, long]).addTo(map);
    marker.bindPopup(popup);
    marker.openPopup();

  //map onclick if toggle is set
  function onMapClick(e){
    if(addoutpost){
      swal( {   title: "Create Outpost!",
                text: "Give your outpost a name:",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Outpost name"
              },
              function(inputValue){   if (inputValue === false) return false;
                                      if (inputValue === "") {swal.showInputError("You need to write something!");return false }
                                      addOutpost(inputValue, e.latlng.lat, e.latlng.lng);
                                      swal("Nice!", "You created the " + inputValue + " outpost", "success");
                                      populateOutposts(map);
                                    }
            );
      toggle();
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
        var content = "<b>"+outpost.name+"</b><br>";
            content+= "Food: "+outpost.supplies.food+"<br>";
            content+= "Water: "+outpost.supplies.water+"<br>";
            content+= "Tarpaulin: "+outpost.supplies.tarpaulin+"<br><br>";
            content+= "<div style='text-align:right'><a href='"+window.location.origin+"/editoutpost/"+outpost._id+"'>Edit</a></div>";
        var popup = L.popup({closeButton: false})
          .setContent(content);
        var marker = L.marker([lat, long]).addTo(map);
          marker.bindPopup(popup);
      }catch(e){
      }
    }
  });
}

//toggle for adding outposts to map onclick
var addoutpost = false;
function toggle(){
  addoutpost = !addoutpost;
  var checkbox = $('#myonoffswitch')[0];
  checkbox.checked = !checkbox.checked;
}
