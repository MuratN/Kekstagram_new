'use strict';

(function() {
  var URL = 'http://localhost:7777/kekstagram/data';

  window.upload = function(data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function() {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.load = function(onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    var onError = function(message) {
      // console.error(message);
    };
    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200:
          error = '11';
          onSuccess(xhr.response);
          break;

        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Статус ответа: :' + xhr.status + ' ' + xhr.statusText;

      }
      if (error) {
        onError(error);
      }
      console.log(error);

      var message = document.createElement('div');
      message.style.position = 'absolute';
      message.style.left = 19.5 + 'px';
      message.style.top = 0 + 'px';
      message.style.width = 182 + 'px';
      message.style.height = 182 + 'px';
      message.style.backgroundColor = '#e7b91e';
      message.style.color = 'black';
      message.style.textAlign = 'center';
      message.style.lineHeight = 150 + 'px';
      message.innerHTML = error;
      document.body.append(message);
    });

    xhr.send();
  };
})();
