module.exports = {
  fileToImage(file) {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        resolve(img);
      };

      const reader = new window.FileReader();
      reader.addEventListener('load', () => {
        img.src = reader.result;
      });
      reader.readAsDataURL(file);
    });
  },

  imageToCanvas(img, scaleFactor = 1) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = img.width * scaleFactor;
    canvas.height = img.height * scaleFactor;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas;
  },

  canvasToBlob(canvas, mimeType) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      });
    }, mimeType);
  },
};
