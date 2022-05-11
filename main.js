//GET LOCATION + put marker with circle

if(!navigator.geolocation) {
    console.log("Your browser doesn't support geolocation feature!")
} else {
        navigator.geolocation.getCurrentPosition(getPosition)

}

var marker, circle;

function getPosition(position){
    console.log(position)
    var lat = position.coords.latitude
    var long = position.coords.longitude
    var accuracy = position.coords.accuracy

    if(marker) {
        map.removeLayer(marker)
    }

    if(circle) {
        map.removeLayer(circle)
    }

    marker = L.marker([lat, long])
    circle = L.circle([lat, long], {radius: accuracy})

    var featureGroup = L.featureGroup([marker, circle]).addTo(map)

    map.fitBounds(featureGroup.getBounds())

    console.log("Your coordinates are: Lat: "+ lat +" Long: "+ long+ " Accuracy: "+ accuracy)
}


  // Set up map
  var map = L.map('map', {
    center: [48.7053978, 15.8607614], 
    zoom: 11,  
    scrollWheelZoom: false,
    tap: false
  });

  //Control panal to switch map
  var controlLayers = L.control.layers( null, null, {
    position: "topright",
    collapsed: false
  }).addTo(map);

  // Light map
  var light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
  }).addTo(map);
  controlLayers.addBaseLayer(light, 'Carto Light basemap');

  //Terrain map
  var terrain = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
  }); 
  controlLayers.addBaseLayer(terrain, 'Stamen Terrain basemap');

  
//GET DATA from csv file
  $.get('./data.csv', function(csvString) {
    
    
    var data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
    console.log(data)


    for (var i in data) {
      var row = data[i];

      var marker = L.marker([row.Latitude, row.Longitude], {
        opacity: 1
      });
      marker.bindPopup("<img src='./images/kirche.jpeg' />", {maxWidth: 100});
      marker.addTo(map);
      

      //funktioniert nicht, dass man bilder aus csv ladet
/*      var popup = L.popup([row.Image], {
        maxWidth: 50,
        opacity: 1
      });
      marker.bindPopup(popup); */
    }
  });

      


 map.attributionControl.setPrefix(
   'View <a href="https://github.com/HandsOnDataViz/leaflet-map-csv" target="_blank">code on GitHub</a>'
  );