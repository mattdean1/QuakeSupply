function initMap(json){
  var map = L.map('map').setView([40, 0],2);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'deanmatt.196lfc2a',
    accessToken: 'pk.eyJ1IjoiZGVhbm1hdHQiLCJhIjoiY2lzamdpdXJxMDAzMTJ0cm5nOWNyb3pnMSJ9.z8vZUaEEP1a4Akowh6Vzlw'
  }).addTo(map);

  //add a marker to the map for each outpost
  for(i=0; i<json.length; i++){
    var lat = json[i].coords.lat;
    var long = json[i].coords.long;
    var marker = L.marker([long, lat]).addTo(map); //leaflet uses the coords like this
  }


}
