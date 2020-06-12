const cloudinary = require('cloudinary');

const imageUpload = async ({ file, folder }) => cloudinary.uploader.upload(file, {
  folder,
  transformation: [
    { width: 1920, crop: 'limit' },
    { quality: 'auto' },
  ],
});

module.exports = { imageUpload };
