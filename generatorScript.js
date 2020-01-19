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
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    // console.log(response.results[0]);
    var results = response.results;
    $('#recipe-dump').empty();
    for (var i = 0; i < results.length; i++) {
      var title = results[i].title;
      var ingredients = results[i].ingredients;
      var thumbnail = results[i].thumbnail;
      var link = results[i].href;
      appendRecipe(title, link, ingredients, thumbnail);
    }
  });
}

$foodForm.on("submit", handleFormSubmit);

function appendRecipe(title, link, ingredients, thumbnail) {
  // var alink = $('<a />', {
  //   href: link,
  //   target: "_blank"
  // });

  var divCard = $('<div />', {
    class: "card",
  });
  //alink.append(divCard);

  var divCardContent = generateDiv('card-content');
  divCard.append(divCardContent);

  divMedia = generateDiv('media');
  divCardContent.append(divMedia);

  var divMediaLeft = generateDiv('media-left clickable');
  divMediaLeft.click(function () {
    window.open(link, '_blank');
  });
  divMedia.append(divMediaLeft);

  var figImage = $('<figure />', {
    class: "image is-48x48"
  });
  divMediaLeft.append(figImage);

  var imgThumbnail = $('<img />', {
    src: thumbnail,
    alt: "Placeholder image"
  });
  figImage.append(imgThumbnail);

  var divMediaContent = generateDiv('media-content clickable');
  divMediaContent.click(function () {
    window.open(link, '_blank');
  });
  divMedia.append(divMediaContent);

  var divMediaRight = generateDiv('media-right');
  divMedia.append(divMediaRight);

  var btnSave = $('<button />', {
    class: "ButtonSave",
    html: "Add",
  });
  btnSave.click(function () {
    saveAsFavorite(title, link, ingredients, thumbnail);
  });

  divMediaRight.append(btnSave);

  var pTitle = $('<p />', {
    class: "title is-4",
    html: title
  });
  divMediaContent.append(pTitle);

  var divContent = $('<div />', {
    class: "content",
    html: ingredients
  });
  divCardContent.append(divContent);


  $('#recipe-dump').append(divCard);
}

function generateDiv(className) {
  var div = $('<div />', {
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

