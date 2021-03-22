'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var galleryOverlay = document.querySelector('.gallery-overlay');
var pictureTemplate = document.querySelector('#picture-template').content;
var miniPicture = pictureTemplate.querySelector('.picture');
var galleryClose = document.querySelector('.gallery-overlay-close');

var getPicture = function(pic) {
  var pictureElement = miniPicture.cloneNode(true);

  pictureElement.querySelector('.picture-src').src = pic.url;
  pictureElement.querySelector('.picture-likes').textContent = pic.likes;
  pictureElement.querySelector('.picture-comments').textContent = pic.comments;

  return pictureElement;

};

window.load(function(images) {
  var picturesContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < images.length; j++) {
    var pictureElement = getPicture(images[j]);
    pictureElement.setAttribute('data-index', j);
    pictureElement.addEventListener('mousedown', function(evt) {
      var index = evt.currentTarget.getAttribute('data-index');
      openPicture(+index);
    });
    pictureElement.addEventListener('keydown', function(evt) {
      evt.preventDefault();
      var index = evt.currentTarget.dataset.index;
      if (evt.keyCode === ENTER_KEYCODE) {
        openPicture(+index);
      }
    });
    fragment.appendChild(pictureElement);
  }
  picturesContainer.appendChild(fragment);
  console.log(images);
});

var onPictureEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePicture();
  }
};

var openPicture = function(index) {

  galleryOverlay.querySelector('.comments-count').textContent = caption[index].comments;
  galleryOverlay.querySelector('.likes-count').textContent = caption[index].likes;
  galleryOverlay.querySelector('.gallery-overlay-image').src = caption[index].url;
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPictureEscPress);
};

var closePicture = function() {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPictureEscPress);
};

galleryClose.addEventListener('mousedown', function() {
  closePicture();
});

galleryClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePicture();
  }
});
