'use strict';

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
var effectLevelLine = document.querySelector('.upload-effect-level-line');
var hashtagsForm = document.querySelector('.upload-form-hashtags');
var commentsForm = document.querySelector('.upload-form-description');
var uploadImage = document.querySelector('.upload-image');
var uploadForm = document.querySelector('.upload-form');

uploadImage.addEventListener('change', function() {
  uploadOverlay.classList.remove('hidden');
})
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
  if (x > 0.25 && x < 1.25) {
    x = x - 0.25;
    effectImage.style.transform = 'scale('+ x +')';
    uploadImageSize.value = (x * 100) + '%';
  }
});

resizeIncrease.addEventListener('mousedown', function() {
  if (x > 0 && x < 1) {
    x = x + 0.25;
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
  effectLevelPin.style.left = 455 + 'px';
  effectLevelVal.style.width = 455 + 'px';
  effect = 'grayscale';
  getEffectLevel();
  effectLevel.classList.remove('hidden');
});

effectSepia.addEventListener('click', function() {
  effectImage.style.filter = 'sepia(1)';
  effectLevelPin.style.left = 455 + 'px';
  effectLevelVal.style.width = 455 + 'px';
  effect = 'sepia';
  getEffectLevel();
  effectLevel.classList.remove('hidden');
});

effectMarvin.addEventListener('click', function() {
  effectImage.style.filter = 'invert(100%)';
  effectLevelPin.style.left = 455 + 'px';
  effectLevelVal.style.width = 455 + 'px';
  effect = 'invert';
  getEffectLevel();
  effectLevel.classList.remove('hidden');
});

effectPhobos.addEventListener('click', function() {
  effectImage.style.filter = 'blur(3px)';
  effectLevelPin.style.left = 455 + 'px';
  effectLevelVal.style.width = 455 + 'px';
  effect = 'blur';
  getEffectLevel();
  effectLevel.classList.remove('hidden');
});

effectHeat.addEventListener('click', function() {
  effectImage.style.filter = 'brightness(3)';
  effectLevelPin.style.left = 455 + 'px';
  effectLevelVal.style.width = 455 + 'px';
  effect = 'brightness';
  getEffectLevel();
  effectLevel.classList.remove('hidden');
});

hashtagsForm.addEventListener('change', function() {
  var valHash = hashtagsForm.value;
  var arrHash = valHash.split(' ');
  var errorHash = false;

  if (arrHash.length > 5){
    hashtagsForm.setCustomValidity('не больше пяти хэштегов');
    errorHash = true;
  }
  console.log(arrHash.length);

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
    var arrSort = arrHash.sort();
    if (arrSort[i] === arrSort[i + 1]) {
      hashtagsForm.setCustomValidity('Одинаковые хэштеги');
      errorHash = true;
    }
  }

  if (errorHash === false) {
    hashtagsForm.setCustomValidity('');
  }
});

hashtagsForm.style.textTransform = 'lowerCase';

var newLeft;
var level;
var effect;

effectLevelPin.onmousedown = function(evt) {
  evt.preventDefault();

  var shiftX = evt.clientX - effectLevelPin.getBoundingClientRect().left;

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove(evt) {
    newLeft = evt.clientX - shiftX - effectLevelLine.getBoundingClientRect().left;

    if (newLeft < 0) {
      newLeft = 0;
    }
    var rightEdge = effectLevelLine.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    effectLevelPin.style.left = newLeft + 'px';
    effectLevelVal.style.width = newLeft + 'px';
    getEffectLevel();

  }

  function onMouseUp() {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  }

};

function getEffectLevel() {
  level = newLeft/455;
  if (effect === 'grayscale') {
  effectImage.style.filter = effect + '('+ level +')';
  } else if (effect === 'sepia') {
    effectImage.style.filter = effect + '('+ level +')';
  } else if (effect === 'invert') {
    effectImage.style.filter = effect + '('+ (level * 100) + '%' +')';
  } else if (effect === 'blur') {
    effectImage.style.filter = effect + '('+ (level + 0.1) * 3 + 'px' + ')';
  } else if (effect === 'brightness') {
    effectImage.style.filter = effect + '('+ level * 3 +')';
  }
}

uploadForm.addEventListener('submit', function (evt) {
  window.upload(new FormData(uploadForm), function (response) {
    uploadOverlay.classList.add('hidden');
  });
  evt.preventDefault();
});
