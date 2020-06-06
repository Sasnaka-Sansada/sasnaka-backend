const { generateToken } = require('../helpers/generate_token');
const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const sendMail = require('../helpers/send_mail');

/**
 * Service that manages registrar functionalities
 * @abstract
 * @category Services
 */
class RegistrarService {
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

        // send mail
        await sendMail(email, token);
      });
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }
  }
}

module.exports = RegistrarService;
