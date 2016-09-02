$(document).ready(function(){
  //get latest significant quake to centre the map around
  $.getJSON('/api/earthquakes', function(json){
    initMap(json);
  });
})
var addoutpost = false;
var map;
var layergroup;

function initMap(json){
  var quake = json.features[0];
  var coordinates = quake.geometry.coordinates;
  var long = coordinates[0];
  var lat = coordinates[1];

  //map and tiles
  map = L.map('map').setView([lat, long],5);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'deanmatt.196lfc2a',
    accessToken: 'pk.eyJ1IjoiZGVhbm1hdHQiLCJhIjoiY2lzamdpdXJxMDAzMTJ0cm5nOWNyb3pnMSJ9.z8vZUaEEP1a4Akowh6Vzlw'
  }).addTo(map);

  //map onclick (only activates if 'addoutpost' toggle is true)
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

  populateOutposts();
}

function populateOutposts(){
  layergroup = L.layerGroup();
  layergroup.addTo(map);
  //add a marker to the map for each outpost
  $.getJSON('/api/outposts', function(json){
    //outpost markers
    for(i=0; i<json.length; i++){
      var outpost = json[i];
      try{
        var lat = outpost.coords.lat;
        var long = outpost.coords.long;
        var content = "<b>"+outpost.name+"</b><br>";
            content+= "Food: "+outpost.supplies.food+"<br>";
            content+= "Water: "+outpost.supplies.water+"<br>";
            content+= "Tarpaulin: "+outpost.supplies.tarpaulin+"<br><br>";
            content+= "<div style='overflow:auto'>";
              content+= "<a class='right' href='"+window.location.origin+"/editoutpost/"+outpost._id+"'>Edit</a>";
              var string = 'del("'+outpost._id+'")';
              content+= "<a href='#' class='left' onclick='"
              content+= string;
              content+= "'>Delete</a>";
            content+= "</div>";
        var popup = L.popup({closeButton: false})
          .setContent(content);
        var marker = L.marker([lat, long]);
          marker.bindPopup(popup);
        layergroup.addLayer(marker);
      }catch(e){
      }
    }
    $.getJSON('/api/earthquakes', function(json){
      //epicentre marker
      var quake = json.features[0];
      var coordinates = quake.geometry.coordinates;
      var long = coordinates[0];
      var lat = coordinates[1];
      var magnitude = quake.properties.mag;
      var time      = (new Date(quake.properties.time)).toUTCString(); //convert to human readable
      var epicentre = "<b>Epicentre</b><br>";
          epicentre+= "Magnitude: "+magnitude+"<br>";
          epicentre+= "Time: "+time;
      var popup = L.popup({closeOnClick:false})
        .setContent(epicentre);
      //var marker = L.marker([lat, long]);
      var marker = L.circle([lat, long], 40000, {
                      color:'red',
                      fillColor:'#f03',
                      fillOpacity: 0.5
                  });
      marker.bindPopup(popup);
      layergroup.addLayer(marker);
      marker.openPopup();
    });
  });
}

//toggle for adding outposts to map onclick
function toggle(){
  addoutpost = !addoutpost;
  var checkbox = $('#myonoffswitch')[0];
  checkbox.checked = !checkbox.checked;
}

function del(outpostid){
  deleteOutpost(outpostid);
  map.removeLayer(layergroup);
  populateOutposts();
}
