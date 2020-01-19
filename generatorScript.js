var $foodInput = $("#food-input");
var $foodForm = $("#food-form");

function handleFormSubmit(event) {
  console.log(event);

  event.preventDefault();

  var searchInput = $foodInput.val();

  if (!searchInput) {
    return false;
  }
  var queryURL = `https://alex-rosencors.herokuapp.com/?url=http://www.recipepuppy.com/api/?i=${searchInput}`;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    // console.log(response.results[0]);
    var results = response.results;
    $('#recipe-dump').empty();
    for (var i = 0; i < results.length; i++){
      var title = results[i].title;
      var ingredients = results[i].ingredients;
      var thumbnail = results[i].thumbnail;
      var link = results[i].href;
      appendRecipe(title, link, ingredients, thumbnail);
    }

    // printArr(response.results);
  });

  function printArr(recipeList) {
    console.log(recipeList);
    for (var i = 0; i < recipeList.length; i++) {
      console.log(recipeList[i]);
    }
  }

  return queryURL;
  console.log(queryURL);
}

$foodForm.on("submit", handleFormSubmit);

// // Function for displaying movie data
// function renderButtons() {
//   // Deleting the movies prior to adding new movies
//   // (this is necessary otherwise you will have repeat buttons)
//   $("#buttons-view").empty();

//   // Looping through the array of cities
//   for (var i = 0; i < cities.length; i++) {
//     // Then dynamicaly generating buttons for each city in the array
//     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
//     var a = $("<button>");
//     // Adding a class of city-btn to our button
//     a.addClass("city-btn");
//     // Adding a data-attribute
//     a.attr("data-name", cities[i]);
//     // Providing the initial button text
//     a.text(cities[i]);
//     // Adding the button to the buttons-view div
//     $("#buttons-view").append(a);
//   }
// }

// // This function handles events where a city button is clicked
// $("#food-form").on("submit", function(event) {
//   event.preventDefault();
//   // This line grabs the input from the textbox
//   var newLocation = $("#food-input")
//     .val()
//     .trim();

//   // Adding movie from the textbox to our array
//   cities.push(newLocation);

//   // Calling renderButtons which handles the processing of our movie array
//   renderButtons();
// });

// $(document).on("click", ".city-btn", function(event) {
//   var ingredient = $(this).text();
//   var queryURL = buildQueryURL(ingredient);
//   console.log(queryURL);
// });

// /**
//  * pulls information from the form and build the query URL
//  * @returns {string} URL for recipe API based on form inputs
//  */

// function buildQueryURL(ingredient) {
//   console.log(ingredient);
//   // queryURL is the url we'll use to query the API
//   var queryURL =
//     "https://alex-rosencors.herokuapp.com/?url=http://www.recipepuppy.com/api/?i=$" +
//     ingredient;
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     console.log(response);
//     $("#recipe-dump").text(JSON.stringify(response));
//   });

//   return queryURL;
//   console.log(queryURL);
// }

// // FOR LATERS
// // Adding a click event listener to all elements with a class of "city-btn" this is what it said in movies: $(document).on("click", ".city-btn", displayDataInfo);
// $(document).on("click", ".city-btn");

// // Calling the renderButtons function to display the initial buttons
// renderButtons();

function appendRecipe(title, link, ingredients, thumbnail) {
  var alink = $('<a />', {
    href: link,
    target: "_blank"
  });

  var divCard = $('<div />',{
    class: "card",
  });
  alink.append(divCard);
  
  var divCardContent = generateDiv('card-content');
  divCard.append(divCardContent);

  divMedia = generateDiv('media');
  divCardContent.append(divMedia);

  var divMediaLeft = generateDiv('media-left');
  divMedia.append(divMediaLeft);

  var figImage = $('<figure />',{
    class: "image is-48x48"
  });
  divMediaLeft.append(figImage);

  var imgThumbnail = $('<img />',{
    src: thumbnail,
    alt: "Placeholder image"
  });
  figImage.append(imgThumbnail);

  var divMediaContent = generateDiv('media-content');
  divMedia.append(divMediaContent);

  var pTitle = $('<p />',{
    class: "title is-4",
    html: title
  });
  divMediaContent.append(pTitle);

  var divContent = $('<div />',{
    class: "content",
    html: ingredients
  });
  divCardContent.append(divContent);


  $('#recipe-dump').append(alink);
}

function generateDiv(className) {
  var div = $('<div />',{
    class: className
  });
  return div;
}

