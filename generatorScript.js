//nav bar java
$(document).ready(function() {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
    $(".navbar-menu").toggleClass("darkBackground");
  });
});

//end nav bar java

var $foodInput = $("#food-input");

var foodinp = document.getElementById("food-input");

foodinp.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addIngredient();
    $foodInput.val("");
  }
});

function addIngredient() {
  var searchInput = $foodInput.val();
  if (!searchInput) {
    return;
  }

  var divIngredient = generateDiv("ingredientButton");
  var lbl = $("<label />", {
    html: searchInput + "  ",
    id: "lblIngredient"
  });
  divIngredient.append(lbl);

  var divDelete = generateDiv("delete is-small");
  divDelete.click(function() {
    divIngredient.remove();
  });
  divIngredient.append(divDelete);
  $("#ingredientBox").append(divIngredient);
  $foodInput.val("");
}

function searchRecipes() {
  var searchValue = "";

  var x = document
    .getElementById("ingredientBox")
    .querySelectorAll(".ingredientButton");
  x.forEach(function(z) {
    var lbl = z.querySelector("#lblIngredient");
    var txt = lbl.innerHTML;
    searchValue += txt + ",";
  });

  if (!searchValue) {
    return;
  }
  searchValue = searchValue.substring(0, searchValue.length - 1);

  var queryURL = `https://alex-rosencors.herokuapp.com/?url=http://www.recipepuppy.com/api/?i=${searchValue}`;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    // console.log(response.results[0]);
    var results = response.results;
    $("#recipe-dump").empty();
    for (var i = 0; i < results.length; i++) {
      var title = results[i].title;
      var ingredients = results[i].ingredients;
      var thumbnail = results[i].thumbnail;
      var link = results[i].href;
      appendRecipe(title, link, ingredients, thumbnail);
    }
  });
}

function appendRecipe(title, link, ingredients, thumbnail) {
  var divCard = $("<div />", {
    class: "card"
  });

  var divCardContent = generateDiv("card-content");
  divCard.append(divCardContent);

  divMedia = generateDiv("media");
  divCardContent.append(divMedia);

  var divMediaLeft = generateDiv("media-left clickable");
  divMediaLeft.click(function() {
    window.open(link, "_blank");
  });
  divMedia.append(divMediaLeft);

  var figImage = $("<figure />", {
    class: "image is-48x48"
  });
  divMediaLeft.append(figImage);

  if (thumbnail) {
    var imgThumbnail = $("<img />", {
      src: thumbnail,
      alt: "Placeholder image"
    });
    figImage.append(imgThumbnail);
  }
  var divMediaContent = generateDiv("media-content clickable");
  divMediaContent.click(function() {
    window.open(link, "_blank");
  });
  divMedia.append(divMediaContent);

  var divMediaRight = generateDiv("media-right");
  divMedia.append(divMediaRight);

  var btnSave = $("<button />", {
    class: "ButtonSave",
    html: "Add"
  });
  btnSave.click(function() {
    saveAsFavorite(title, link, ingredients, thumbnail);
  });

  divMediaRight.append(btnSave);

  var pTitle = $("<p />", {
    class: "title is-4",
    html: title
  });
  divMediaContent.append(pTitle);

  var divContent = $("<div />", {
    class: "content",
    html: ingredients
  });
  divCardContent.append(divContent);

  $("#recipe-dump").append(divCard);
}

function generateDiv(className) {
  var div = $("<div />", {
    class: className
  });
  return div;
}

function saveAsFavorite(title, link, ingredients, thumbnail) {
  var localStorageKey = "RecipeGeneratorFavorites";
  var favorites = localStorage.getItem(localStorageKey);
  var arr = [];
  if (favorites != null) {
    arr = JSON.parse(favorites);
  }
  arr.push({
    title: title,
    href: link,
    ingredients: ingredients,
    thumbnail: thumbnail
  });
  var strValue = JSON.stringify(arr);
  localStorage.setItem(localStorageKey, strValue);
}
