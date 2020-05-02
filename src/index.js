
const init = function() {
  let image = document.getElementById('image');
  
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  drawImage(image, canvas);
};

const drawImage = function(image, canvas) {
  canvas.width = image.width;
  canvas.height = image.height;

  context.drawImage(image, 0, 0);
};
