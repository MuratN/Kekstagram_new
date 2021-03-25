'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var galleryOverlay = document.querySelector('.gallery-overlay');
var pictureTemplate = document.querySelector('#picture-template').content;
var miniPicture = pictureTemplate.querySelector('.picture');
var galleryClose = document.querySelector('.gallery-overlay-close');
var filters = document.querySelector('.filters');
var filterRecommend = document.getElementById('filter-recommend');
var filterPopular = document.getElementById('filter-popular');
var filterDiscussed = document.getElementById('filter-discussed');
var filterRandom = document.getElementById('filter-random');
var images = [];
var newImages = [];

filters.classList.remove('hidden');

var getPicture = function(pic) {
  var pictureElement = miniPicture.cloneNode(true);

  pictureElement.querySelector('.picture-src').src = pic.url;
  pictureElement.querySelector('.picture-likes').textContent = pic.likes;
  pictureElement.querySelector('.picture-comments').textContent = pic.comments.length;

  return pictureElement;
};

var renderImages = function() {
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
  picturesContainer.innerHTML = '';
  picturesContainer.appendChild(fragment);
};

window.load(function(images) {
  window.images = images;
  newImages = images.slice();

  filters.addEventListener('click', function() {
    if (filterRecommend.checked) {
      sortRecommend();
      renderImages();
    } else if (filterPopular.checked) {
      sortPopular();
      renderImages();
    } else if (filterDiscussed.checked) {
      sortDiscussed();
      renderImages();
    } else if (filterRandom.checked) {
      sortRandom();
      renderImages();
    }
  });
  renderImages();
});

var sortRecommend = function() {
  images = newImages.slice();
};

var sortPopular = function() {
  images.sort(function(left, right) {
    return right.likes - left.likes;
  });

};

var sortDiscussed = function() {
  images.sort(function(left, right) {
    return right.comments.length - left.comments.length;
  });
};

var getRandom = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var sortRandom = function() {
  images.sort(function() {
    return getRandom(0, 100) - getRandom(0, 100);
  });
};

var onPictureEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePicture();
  }
};

var openPicture = function(index) {

  galleryOverlay.querySelector('.comments-count').textContent = images[index].comments.length;
  galleryOverlay.querySelector('.likes-count').textContent = images[index].likes;
  galleryOverlay.querySelector('.gallery-overlay-image').src = images[index].url;
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
