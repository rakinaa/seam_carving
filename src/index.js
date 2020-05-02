let image = document.getElementById('SourceImage');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

img.onload = function() {
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
};