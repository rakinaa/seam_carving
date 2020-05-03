
const init = function() {
  let image = document.getElementById('image');
  
  let canvas = document.getElementById('canvas');
  let c = canvas.getContext('2d');

  drawImage(image, canvas);
};

const drawImage = function(image, canvas) {
  canvas.width = image.width;
  canvas.height = image.height;

  context.drawImage(image, 0, 0);
};




const carve = function(canvas, c) {
  let imageData = c.getImageData(0, 0, canvas.width, canvas.height);
}

// window.addEventListener('load', init);
document.addEventListener("DOMContentLoaded", () => {
  init();
})