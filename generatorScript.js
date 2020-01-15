// Initial array of cities
var cities = ["Chicken", "pasta", "rice"];

// Function for displaying movie data
function renderButtons() {
  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of cities
  for (var i = 0; i < cities.length; i++) {
    // Then dynamicaly generating buttons for each city in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of city-btn to our button
    a.addClass("city-btn");
    // Adding a data-attribute
    a.attr("data-name", cities[i]);
    // Providing the initial button text
    a.text(cities[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a city button is clicked
$("#add-integrediant").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var newLocation = $("#food-input")
    .val()
    .trim();

  // Adding movie from the textbox to our array
  cities.push(newLocation);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

$(document).on("click", ".city-btn", function(event) {
  var ingredient = $(this).text();
  var queryURL = buildQueryURL(ingredient);
  console.log(queryURL);
});

/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for WEATHER API based on form inputs
 */

function buildQueryURL(ingredient) {
  console.log(ingredient);
  // queryURL is the url we'll use to query the API
  var queryURL = "http://www.recipepuppy.com/api/?i=" + ingredient;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });

  return queryURL;
  console.log(queryURL);
}

// FOR LATERS
// Adding a click event listener to all elements with a class of "city-btn" this is what it said in movies: $(document).on("click", ".city-btn", displayDataInfo);
$(document).on("click", ".city-btn");

// Calling the renderButtons function to display the initial buttons
renderButtons();
