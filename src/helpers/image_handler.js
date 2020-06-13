const DatauriParser = require('datauri/parser');

const path = require('path');

const cloudinary = require('cloudinary').v2;
const logger = require('./logger');

const dataUri = (file) => {
  const parser = new DatauriParser();
  return (parser.format(path.extname(file.originalname).toString(), file.buffer)).content;
};

const imageUpload = async ({ file, folder }) => {
  let imageData;
  try {
    // turn transformations on once deployed
    imageData = await cloudinary.uploader.upload(dataUri(file),
      {
        folder,
        // format: 'png',
        // transformation: [
        //   { width: 1920, crop: 'limit' },
        //   { quality: 'auto' },
        // ],
      });
  } catch (error) {
    logger.error('Error while uploading image');
  }
  return imageData.secure_url;
};

module.exports = { imageUpload };
