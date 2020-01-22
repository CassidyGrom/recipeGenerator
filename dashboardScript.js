var localStorageKey = "RecipeGeneratorFavorites";
displayFavorites();

function displayFavorites() {
  $('#recipe-dump').empty();
  var favorites = localStorage.getItem(localStorageKey);
  if (favorites != null) {
  var arr = JSON.parse(favorites);
    for (var i = 0; i < arr.length; i++) {
      var k = arr[i];
      var title = k.title;
      var link = k.href;
      var ingredients = k.ingredients;
      var thumbnail = k.thumbnail;
      appendRecipe(title, link, ingredients, thumbnail);
    }
  }
}

function deleteFavorite(title, link, ingredients, thumbnail) {
  var favorites = localStorage.getItem(localStorageKey);
  if (favorites != null) {
    var arr = JSON.parse(favorites);
    for (var i = arr.length -1; i >= 0; i--) {
      var k = arr[i];
      if (k.title == title && k.href == link && k.ingredients == ingredients && k.thumbnail == thumbnail) {
        arr.splice(i, 1);
      }
    }
    var strValue = JSON.stringify(arr);
    localStorage.setItem(localStorageKey, strValue);
    displayFavorites();
  }
}

function appendRecipe(title, link, ingredients, thumbnail) {

  var divCard = $('<div />', {
    class: "card",
  });

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

  if (thumbnail) {
    var imgThumbnail = $('<img />', {
      src: thumbnail,
      alt: "Placeholder image"
    });
    figImage.append(imgThumbnail);
  }

  var divMediaContent = generateDiv('media-content clickable');
  divMediaContent.click(function () {
    window.open(link, '_blank');
  });
  divMedia.append(divMediaContent);

  var divMediaRight = generateDiv('media-right');
  divMedia.append(divMediaRight);

  var btnDelete = $('<button />', {
    class: "ButtonSave",
    html: "Delete",
  });
  btnDelete.click(function () {
    deleteFavorite(title, link, ingredients, thumbnail);
  });

  divMediaRight.append(btnDelete);

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