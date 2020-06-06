const sgMail = require('@sendgrid/mail');
const config = require('../config');
const logger = require('./logger');

/**
 * The abstract mail sender
 * Should be free from any implementation logic
 * @category Helpers
 * @param {*} reciever
 * @param {*} token
 */
const sendMail = async (reciever, token) => {
  sgMail.setApiKey(config.email.sendgrid_api_key);
  const msg = {
    to: reciever,
    from: 'g.c.dassanayake@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: token,
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  try {
    await sgMail.send(msg);
    logger.info('Invitation email sent successfully');
  } catch (error) {
    logger.error(error, ':Error during sending mail');
    throw (error);
  }
};

module.exports = sendMail;
