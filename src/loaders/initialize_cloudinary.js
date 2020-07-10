const cloudinary = require('cloudinary').v2;
const config = require('../config');

const initializeCloudinary = () => {
  cloudinary.config({
    cloud_name: config.cloudinary.name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.secret,
  });
};

module.exports = { initializeCloudinary };
