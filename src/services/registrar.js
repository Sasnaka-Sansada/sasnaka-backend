/**
 * Service that manages registrar functionalities
 * @abstract
 * @category Services
 */
class RegistrarService {
  /**
     * Invites users to create accounts
     * @param {string} email to be invited to
  */
  static async InviteUsers({ email, roleId }) {
    console.log(email);
  }
}

module.exports = RegistrarService;
