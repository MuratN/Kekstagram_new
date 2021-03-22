'use strict';

var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var caption = [];

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
