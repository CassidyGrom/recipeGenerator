mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxleHJvc2Vua3JhbnoiLCJhIjoiY2s1ZWtzOWVsMGwzeDNub2JueHA1bmo4NiJ9.0stCrhSLQYc36UANV3WfWw";
var map = new mapboxgl.Map({
  container: "map", // Container ID
  style: "mapbox://styles/mapbox/streets-v11", // Map style to use
  center: [-74.8490528, 40.2762189], // Starting position [lng, lat]
  zoom: 12 // Starting zoom level
});

var marker = new mapboxgl.Marker() // initialize a new marker
  .setLngLat([-74.8490528, 40.2762189]) // Marker [lng, lat] coordinates
  .addTo(map); // Add the marker to the map

  var geocoder = new MapboxGeocoder({ // Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    placeholder: 'Search for grocery stores',
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
  });
  
  // Add the geocoder to the map
  map.addControl(geocoder);

  // After the map style has loaded on the page,
// add a source layer and default styling for a single point
map.on('load', function() {
  map.addSource('single-point', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  });

  map.addLayer({
    id: 'point',
    source: 'single-point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#448ee4'
    }
  });

  // Listen for the `result` event from the Geocoder
  // `result` event is triggered when a user makes a selection
  //  Add a marker at the result's coordinates
  geocoder.on('result', function(e) {
    map.getSource('single-point').setData(e.result.geometry);
  });
});