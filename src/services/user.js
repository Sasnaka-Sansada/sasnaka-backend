const { Op } = require('sequelize');
const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const { hashPassword, comparePassword } = require('../helpers/password');
const { formatResponse } = require('../helpers/minihelpers');
const { Administrator, EditorLevelA, EditorLevelD } = require('../database/models/role');

/**
 * Service that manages user functionalities
 * @abstract
 * @category Services
 */
class UserService {
  /**
     * Creates an account for a user in the system
     * @param {string} email to be invited to
     * @param {string} roleId to be invited to
     * @returns {invitation} invitation created
  */
  static async RegisterUser({
    token, name, password, profileImage,
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

    let user;
    try {
      await database.sequelize.transaction(async (t) => {
        await database.Invitation.destroy(
          { where: { email: invitation.email }, transaction: t },
        );

        user = await database.User.create({
          email: invitation.email,
          password: hashedPassword,
          name,
          roleId: invitation.roleId,
          profileImage,
        }, { transaction: t });
      });
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      profileImage: user.profileImage,
      roleId: user.roleId,
    };
  }

  /**
     * Creates an account for a user in the system
     * @param {string} email to be invited to
     * @param {roleId} email to be invited to
     * @returns {invitation} invitation created
  */
  static async LoginUser({ email }) {
    const database = await getDatabase();

    const user = await database.User.findOne({
      where: { email },
      attributes: ['id', 'email', 'name', 'profileImage', 'roleId'],
    });

    return user;
  }

  /**
     * Gets user details of an given user id
     * @param {string} id uuid of the user
     * @returns {Object} user
  */
  static async GetUser({ id }) {
    const database = await getDatabase();

    const user = await database.User.findOne({
      where: { id },
      attributes: ['id', 'email', 'name', 'profileImage', 'roleId'],
    });

    if (!user) {
      throw new Errors.BadRequest('Invalid user id');
    }

    return user;
  }

  /**
     * Updates the details of the user
     * @param {string} id id of the user
     * @param {string} name name of the user
     * @param {oldpassword} email to be invited to
     * @returns {invitation} invitation created
  */
  static async UpdateUser({
    id, name, oldPassword, newPassword, profileImage,
  }) {
    const database = await getDatabase();

    const user = await database.User.findOne({ where: { id } });

    if (!user) {
      throw new Errors.BadRequest('Invalid user id');
    }

    const correctOldPassword = await comparePassword(oldPassword, user.dataValues.password);

    if (correctOldPassword) {
      user.password = await hashPassword(newPassword);
    } else {
      throw new Errors.BadRequest('Invalid old password');
    }

    user.name = name;
    user.profileImage = profileImage;

    await user.save();

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      profileImage: user.profileImage,
      roleId: user.roleId,
    };
  }


  /**
     * Returns all users with email recieving capability
     * @returns {User}[] Users
  */
  static async ListEmailSharableUsers() {
    const database = await getDatabase();

    const result = await database.User.findAll({
      attributes: ['id', 'email', 'name', 'roleId'],
      where: {
        [Op.or]: [
          { roleId: Administrator },
          { roleId: EditorLevelA },
          { roleId: EditorLevelD },
        ],
      },
      order: [['createdAt', 'DESC']],
    });

    // remove timestamp attributes
    const users = result.map((user) => formatResponse(user));

    return users;
  }
}
module.exports = UserService;
