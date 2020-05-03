
const init = function() {
  let image = document.getElementById('image');
  
  let canvas = document.getElementById('canvas');
  let c = canvas.getContext('2d');

  drawImage(image, canvas, c);
  carve(canvas, c);
};

const drawImage = function(image, canvas, c) {
  canvas.width = image.width;
  canvas.height = image.height;

  c.drawImage(image, 0, 0);
};




const carve = function(canvas, c) {
  console.log(canvas.width);
  console.log(canvas.height);
  let imageData = c.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;
  for (let i = 0; i < data.length; i++) {
    data[i] = 255;
  }
  c.putImageData(imageData, 0, 0);
}

// window.addEventListener('load', init);
document.addEventListener("DOMContentLoaded", () => {
  init();
})