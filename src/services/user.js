const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const { hashPassword } = require('../helpers/password');

/**
 * Service that manages user functionalities
 * @abstract
 * @category Services
 */
class UserService {
  /**
     * Creates an account for a user in the system
     * @param {string} email to be invited to
     * @param {roleId} email to be invited to
     * @returns {invitation} invitation created
  */
  static async RegisterUsers({
    token, firstName, lastName, password,
  }) {
    const database = await getDatabase();

    const invitation = await database.Invitation.findOne({ where: { token } });

    if (!invitation) {
      throw new Errors.BadRequest('The token is either expired or invalid');
    }

    const currentUser = await database.User.findOne({
      where: { email: invitation.email },
    });

    if (currentUser) {
      throw new Errors.BadRequest('The user is already registered in the system');
    }

    const hashedPassword = await hashPassword(password);

    try {
      await database.sequelize.transaction(async (t) => {
        await database.Invitation.destroy(
          { where: { email: invitation.email }, transaction: t },
        );

        await database.User.create({
          email: invitation.email,
          password: hashedPassword,
          firstName,
          lastName,
          roleId: invitation.roleId,
        }, { transaction: t });
      });
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }
  }
}
module.exports = UserService;
