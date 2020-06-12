const cloudinary = require('cloudinary');
const config = require('../config');

const initializeCloudinary = () => {
  cloudinary.v2.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.secret,
  });
};

module.exports = { initializeCloudinary };
