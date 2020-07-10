const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const hbs = require('nodemailer-handlebars');
const path = require('path');

const config = require('../config');

/**
 * creates the sendgrid transport
 */
const sendGridTransport = () => {
  const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: config.email.sendgrid_api_key,
    }),
  );

  const templates = path.join(__dirname, 'templates');

  const options = {
    viewEngine: {
      extname: '.hbs',
      layoutsDir: templates,
      partialsDir: templates,
      defaultLayout: '',
    },
    viewPath: templates,
    extName: '.hbs',
  };

  transporter.use('compile', hbs(options));


  return transporter;
};

module.exports = { sendGridTransport };
