const DatauriParser = require('datauri/parser');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

const fsPromises = fs.promises;
const logger = require('./logger');
const config = require('../config');
const { generateFileName } = require('./generate_token');


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
        // format: 'jpg',
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

// eslint-disable-next-line no-unused-vars
const localUpload = async ({ file, folder }) => {
  // path to the subdirectory of the upload directory
  const folderPath = path.join(__dirname, `../../public/uploads/${folder}`);

  // filename
  const fileName = `${generateFileName(15)}${path.extname(file.originalname).toString()}`;
  // complete path to the file
  const filePath = path.join(`${folderPath}/${fileName}`);
  try {
    // create subdirectory if already not created
    await fsPromises.mkdir(folderPath, { recursive: true });
    // save the file
    await fsPromises.writeFile(filePath, file.buffer);
  } catch (error) {
    logger.error(`Error while uploading file: ${error.message}`);
  }

  // return resource static url
  return `http://${config.domain}:${config.port}/${folder}/${fileName}`;
};

/**
 * uploads the file to the local resource directory or CDN
 * @param {Object} file file needed to be saved
 * @param {String} name of the subdirectory the file is saved
 */
const fileUpload = async ({ file, folder }) => {
  if (config.cloudinary.cdn_upload) {
    return cdnUpload({ file, folder });
  }
  return localUpload({ file, folder });
};

module.exports = { fileUpload };
