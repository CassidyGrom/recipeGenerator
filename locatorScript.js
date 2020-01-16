mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxleHJvc2Vua3JhbnoiLCJhIjoiY2s1ZWtzOWVsMGwzeDNub2JueHA1bmo4NiJ9.0stCrhSLQYc36UANV3WfWw";
var map = new mapboxgl.Map({
  container: "map", // Container ID
  style: "mapbox://styles/mapbox/streets-v11", // Map style to use
  center: [-122.25948, 37.87221], // Starting position [lng, lat]
  zoom: 12 // Starting zoom level
});

const $searchBtn = document.querySelector("#search-btn");
const $searchInput = document.querySelector("#search-input");

const getLatLng = searchTerm => {
  const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=4089f4064051788f3dc75b639c3e0619`;
  
  console.log(queryUrl);
  fetch(queryUrl)
    .then(res => (res.ok ? res.json() : new Error("problem!")))
    .then(({ coord: { lat, lon} }) => {
      console.log(lat,lon);
      searchMap(lat,lon);
    }).catch(err => console.log(err));
};

const searchMap = (lat, lon) => {
  const queryUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/grocery.json?proximity=${lon},${lat}&access_token=pk.eyJ1IjoiYWxleHJvc2Vua3JhbnoiLCJhIjoiY2s1ZWtzOWVsMGwzeDNub2JueHA1bmo4NiJ9.0stCrhSLQYc36UANV3WfWw`;
  
  fetch(queryUrl)
    .then(res => res.ok ? res.json() : new Error('issue!'))
    .then(mapBoxRes => {
    console.log(mapBoxRes);
  })
  .catch(err => console.log(err));
}

$searchBtn.addEventListener("click", event => {
  event.preventDefault();
  const searchTerm = $searchInput.value;

  if (!searchTerm) return;
  console.log(searchTerm);
  getLatLng(searchTerm);
});