// See post: http://asmaloney.com/2014/01/code/creating-an-interactive-map-with-leaflet-and-openstreetmap/

var map = L.map( 'map', {
  center: [55.9, -3.0],
  minZoom: 2,
  zoom: 9
})

L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c']
}).addTo( map )

var myURL = jQuery( 'script[src$="leaf-demo.js"]' ).attr( 'src' ).replace( 'leaf-demo.js', '' )

var myIcon = L.icon({
  iconUrl: myURL + 'images/pin24.png',
  iconRetinaUrl: myURL + 'images/pin48.png',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
})

 var counter=0;

// for ( var i=0; i < markers.length; ++i )
// {
//  L.marker( [markers[i].Latitude, markers[i].Longitude], {icon: myIcon} )
//   .bindPopup( 'Company name: ' + markers[i].CompanyName + '</br>'+ 
//   'Postcode: ' + markers[i].Postcode + '</br>'+
//   'Industry: ' + markers[i].Category + '</br>' )
//   .addTo( map );
//   counter++;
// }

var markerClusters = L.markerClusterGroup();

for ( var i = 0; i < markers.length; ++i )
{
  var popup = 'Company name: ' + markers[i].CompanyName + '</br>'+ 
     'Postcode: ' + markers[i].Postcode + '</br>'+
     'Industry: ' + markers[i].Category + '</br>';

  try{
    var m = L.marker( [Number(markers[i].Latitude), Number(markers[i].Longitude)], {icon: myIcon} )
    .bindPopup( popup );
  }catch(e){
    console.log(e);
  }

  markerClusters.addLayer( m );
}

map.addLayer( markerClusters );