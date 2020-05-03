
const init = function() {
  let image = document.getElementById('image');
  
  let canvas = document.getElementById('canvas');
  let c = canvas.getContext('2d');

  drawImage(image, canvas);
  carve(canvas, c);
};

const drawImage = function(image, canvas) {
  canvas.width = image.width;
  canvas.height = image.height;

  context.drawImage(image, 0, 0);
};




const carve = function(canvas, c) {
  let imageData = c.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;
  for (let i = 0; i < data.length; i++) {
    data[i] = 255;
  }
}

// window.addEventListener('load', init);
document.addEventListener("DOMContentLoaded", () => {
  init();
})