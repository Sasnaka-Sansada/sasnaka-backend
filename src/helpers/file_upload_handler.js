const DatauriParser = require('datauri/parser');

const path = require('path');

const cloudinary = require('cloudinary').v2;
const logger = require('./logger');
const config = require('../config');

const dataUri = (file) => {
  const parser = new DatauriParser();
  return (parser.format(path.extname(file.originalname).toString(), file.buffer)).content;
};

const cdnUpload = async ({ file, folder }) => {
  let fileData;
  try {
    // turn transformations on once deployed
    fileData = await cloudinary.uploader.upload(dataUri(file),
      {
        folder,
        // format: 'png',
        // transformation: [
        //   { width: 1920, crop: 'limit' },
        //   { quality: 'auto' },
        // ],
      });
  } catch (error) {
    logger.error(`Error while uploading file: ${error.message}`);
  }
  return fileData.secure_url;
};

// need to implement the logic for local storing
// eslint-disable-next-line no-unused-vars
const localUpload = async ({ file, folder }) => 'null';

const fileUpload = async ({ file, folder }) => {
  if (config.cloudinary.cdn_upload) {
    return cdnUpload({ file, folder });
  }
  return localUpload({ file, folder });
};

module.exports = { fileUpload };
