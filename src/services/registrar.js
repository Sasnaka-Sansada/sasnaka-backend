const path = require('path');
const { generateToken } = require('../helpers/generate_token');
const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const sendMail = require('../emails/send_mail');
const config = require('../config');

/**
 * Service that manages registrar functionalities
 * @abstract
 * @category Services
 */
class RegistrarService {
  /**
   * Helper invitation mail function
   * @param {String} email email of the recipient
   * @param {String} roleId role id of the recipient
   */
  static async sendInvitationMail({ email, roleId }) {
    const emailComposition = {
      from: config.email.organization_email,
      to: email,
      subject: 'Registration Invitation- Sasnaka Sansada',
      template: 'invitation',
      context: {
        role: roleId.toLowerCase(),
        registerURL: config.registerURL,
      },
      attachments: [
        {
          filename: 'logo.png',
          path: path.join(__dirname, '../../public/images/logo.png'),
          cid: 'sasnakalogo',
        },
        {
          filename: 'email_cover.png',
          path: path.join(__dirname, '../../public/images/email_cover.png'),
          cid: 'sasnakacover',
        },
      ],
    };
    await sendMail(emailComposition);
  }

  /**
     * Invites users to create accounts through an email
     * @param {string} email to be invited to
     * @param {roleId} email to be invited to
     * @returns {invitation} invitation created
  */
  static async InviteUsers({ emailList, roleId }) {
    const database = await getDatabase();

    try {
      emailList.forEach(async (email) => {
        const token = generateToken(96);
        await database.Invitation.create({ email, roleId, token });
        await this.sendInvitationMail({ email, roleId });
      });
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }
  }
}

module.exports = RegistrarService;
