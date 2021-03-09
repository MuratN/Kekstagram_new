'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var caption = [];

var galleryOverlay = document.querySelector('.gallery-overlay');
var pictureTemplate = document.querySelector('#picture-template').content;
var miniPicture = pictureTemplate.querySelector('.picture');
var galleryClose = document.querySelector('.gallery-overlay-close');
var formPreview = document.querySelector('.upload-form-preview');
var resizeDecrease = document.querySelector('.upload-resize-controls-button-dec');
var resizeIncrease = document.querySelector('.upload-resize-controls-button-inc');
var uploadImageSize = document.querySelector('.upload-resize-controls-value');
var effectImage = document.querySelector('.effect-image-preview');
var uploadCancel = document.querySelector('.upload-form-cancel');
var uploadOverlay = document.querySelector('.upload-overlay');
var effectLevel = document.querySelector('.upload-effect-level');
var effectNone = document.getElementById('upload-effect-none');
var effectChrome = document.getElementById('upload-effect-chrome');
var effectSepia = document.getElementById('upload-effect-sepia');
var effectMarvin = document.getElementById('upload-effect-marvin');
var effectPhobos = document.getElementById('upload-effect-phobos');
var effectHeat = document.getElementById('upload-effect-heat');
var effectLevelPin = document.querySelector('.upload-effect-level-pin');
var effectLevelVal = document.querySelector('.upload-effect-level-val');
var hashtagsForm = document.querySelector('.upload-form-hashtags');
var commentsForm = document.querySelector('.upload-form-description');

var getRandomElement = function(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

for(var i = 1; i < 26; i++) {
  var randomLike = 15 + Math.floor(Math.random() * 185);
  var randomComment = getRandomElement(comments);
  var number = 'photos/' + i + '.jpg';

  caption.push({
    url: number,
    likes: randomLike,
    comments: randomComment
  });
}

var getPicture = function(pic) {
  var pictureElement = miniPicture.cloneNode(true);

  pictureElement.querySelector('.picture-src').src = pic.url;
  pictureElement.querySelector('.picture-likes').textContent = pic.likes;
  pictureElement.querySelector('.picture-comments').textContent = pic.comments;

  return pictureElement;
};

var picturesContainer = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
for (var j = 0; j < caption.length; j++) {
  var pictureElement = getPicture(caption[j]);
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

uploadCancel.addEventListener('click', function() {
  uploadOverlay.classList.add('hidden');
});

document.addEventListener('keydown', function(evt) {
  if (document.activeElement !== hashtagsForm && document.activeElement !== commentsForm && evt.keyCode === ESC_KEYCODE) {
    uploadOverlay.classList.add('hidden');
  }
});

var x = 1;
resizeDecrease.addEventListener('mousedown', function() {
  if (x > 1) {
    x = 0.75;
    effectImage.style.transform = 'scale('+ x +')';
    uploadImageSize.value = (x * 100) + '%';
  } else
  x = x - 0.25;
  if (x > 0) {
    effectImage.style.transform = 'scale('+ x +')';
    uploadImageSize.value = (x * 100) + '%';
  }
});

resizeIncrease.addEventListener('mousedown', function() {
  if (x < 0) {
    x = 0.5;
    effectImage.style.transform = 'scale('+ x +')';
    uploadImageSize.value = (x * 100) + '%';
  } else
  x = x + 0.25;
  if (x < 1.25) {
    effectImage.style.transform = 'scale('+ x +')';
    uploadImageSize.value = (x * 100) + '%';
  }
});

effectNone.addEventListener('click', function() {
  effectImage.style.filter = 'none';
  effectLevel.classList.add('hidden');
});

effectChrome.addEventListener('click', function() {
  effectImage.style.filter = 'grayscale(1)';
  effectLevel.classList.remove('hidden');
  effectLevelPin.style.transform = 'translateX(2000%)';
});

effectSepia.addEventListener('click', function() {
  effectImage.style.filter = 'sepia(1)';
  effectLevel.classList.remove('hidden');
});

effectMarvin.addEventListener('click', function() {
  effectImage.style.filter = 'invert(100%)';
  effectLevel.classList.remove('hidden');
});

effectPhobos.addEventListener('click', function() {
  effectImage.style.filter = 'blur(3px)';
  effectLevel.classList.remove('hidden');
});

effectHeat.addEventListener('click', function() {
  effectImage.style.filter = 'brightness(3)';
  effectLevel.classList.remove('hidden');
});

hashtagsForm.addEventListener('change', function() {
  var valHash = hashtagsForm.value;
  var arrHash = valHash.split(' ', 5);
  var errorHash = false;
  for (var hash of arrHash) {
    if (hash[0] !== "#") {
    hashtagsForm.setCustomValidity('хештег должен начинаться с #');
    errorHash = true;
    }
    if (hash.length < 2) {
      hashtagsForm.setCustomValidity('Хэштег должен состоять минимум из 2х символов');
      errorHash = true;
    } else if (hash.length > 20) {
      hashtagsForm.setCustomValidity('Хэштег не должен превышать 20 символов');
      errorHash = true;
    }
  }
  for (var i = 0; i < arrHash.length; i++) {
    if (arrHash[i] === arrHash[i + 1]) {
      hashtagsForm.setCustomValidity('Одинаковые хэштеги');
      errorHash = true;
    }
  }
  if (errorHash === false) {
    hashtagsForm.setCustomValidity('');
  }
});

hashtagsForm.style.textTransform = 'lowerCase';
