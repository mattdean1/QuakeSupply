window.onload = init;

function init(){
  initMap();
}

function getjson(url){
  var httpreq = new XMLHttpRequest(); // a new request
  httpreq.open("GET",url,false);
  httpreq.send(null);
  return httpreq.responseText;
}

function testjson(){
  var json_obj = JSON.parse(getjson("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson"));
  console.log(json_obj);
}

function initMap(){
  var map = L.map('map').setView([51.505, -0.09], 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'deanmatt.196lfc2a',
    accessToken: 'pk.eyJ1IjoiZGVhbm1hdHQiLCJhIjoiY2lzamdpdXJxMDAzMTJ0cm5nOWNyb3pnMSJ9.z8vZUaEEP1a4Akowh6Vzlw'
  }).addTo(map);

}
