const logger = require('../helpers/logger');
const { sendGridTransport } = require('./sendgrid');

/**
 * The abstract mail sender
 * Free from any implementation logic
 * Change the transporter to include another email API
 * @category Helpers
 * @param {Object} email
 * @param {String} email.from
 * @param {String} email.to
 * @param {String} email.subject
 * @param {String} email.template
 * @param {Object} email.context
 */
const sendMail = async (email) => {
  const transporter = sendGridTransport();
  try {
    await transporter.sendMail(email);
    logger.info('Email sent successfully');
  } catch (error) {
    logger.error('Error during sending mail: ', error);
  }
};

module.exports = sendMail;
