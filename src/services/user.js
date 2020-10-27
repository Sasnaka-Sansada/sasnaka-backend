const { Op } = require('sequelize');
const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const { hashPassword, comparePassword } = require('../helpers/password');
const { jwtSign } = require('../helpers/jwt');
const { formatResponse } = require('../helpers/minihelpers');
const { Administrator, EditorLevelA, EditorLevelD } = require('../database/models/role');

/**
 * Service that manages user functionalities
 * @abstract
 * @category Services
 */
class UserService {
  /**
     * Verifies whether a registration token is valid.
     *
     * This checks if the user already has a token and it is valid.
     * Then this will return the user details associated with the token.
     * If the token is invalid, this will throw an error.
     * @param {string} token Registration token
     * @returns {Promise<any>} Associated user details
     */
  static async VerifyRegistrationToken(token) {
    const database = await getDatabase();

    // Token Should be Created, Valid in order
    // To be verified

    let existingToken = await database.Invitation
      .findOne({
        where: { token },
        attributes: ['email', 'roleId'],
      });
    if (!existingToken) {
      throw new Errors.BadRequest('Invalid token');
    }

    const currentUser = await database.User.findOne({
      where: { email: existingToken.email },
    });

    if (currentUser) {
      throw new Errors.BadRequest('The user is already registered in the system');
    }

    existingToken = formatResponse(existingToken);

    return existingToken;
  }


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
  static async LoginUser({ email, password }) {
    const database = await getDatabase();

    let user = await database.User.findOne({
      where: { email },
      attributes: ['id', 'email', 'name', 'profileImage', 'roleId', 'password'],
    });

    // Check user existence
    if (!user) throw new Errors.BadRequest('Email isn\'t registered in the system');

    user = formatResponse(user);
    // Authenticate user password
    const isValid = await comparePassword(password, user.password);
    if (!isValid) throw new Errors.BadRequest('Email/Password mismatch');

    const userInformation = { id: user.id, email: user.email };
    // Get a json copy of model and format it to add the fields we need
    // const userInformation = JSON.stringify(jwtInfo);

    const signedJwt = jwtSign(userInformation);

    return {
      token: signedJwt,
      id: user.id,
      email: user.email,
      name: user.name,
      profileImage: user.profileImage,
      roleId: user.roleId,
    };
  }

  /** DEPRICIATED
     * Gets user details of an given user by destructuring the req.user param
     * @param {string} id uuid of the user
     * @param {string} email email of the user
     * @param {string} name name of the user
     * @param {string} profileImage profileImage of the user
     * @param {string} roleId roleId of the user
     * @returns {Object} user
  */
  static async GetUserFromSession({
    id, email, name, profileImage, roleId,
  }) {
    return {
      id, email, name, profileImage, roleId,
    };
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
      attributes: ['id', 'email', 'name', 'profileImage', 'roleId', 'contactNumber'],
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
    id, name, oldPassword, newPassword, profileImage, contactNumber,
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
    user.contactNumber = contactNumber;

    await user.save();

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      profileImage: user.profileImage,
      contactNumber: user.contactNumber,
      roleId: user.roleId,
    };
  }

  /**
     * Returns all users
     * @returns {User}[] Users
  */
  static async ListUsers() {
    const database = await getDatabase();

    const result = await database.User.findAll({
      attributes: ['id', 'email', 'name', 'roleId', 'contactNumber'],
      order: [['createdAt', 'DESC']],
    });

    // remove timestamp attributes
    const users = result.map((user) => formatResponse(user));

    return users;
  }

  /**
     * Returns all users with email recieving capability
     * @returns {User}[] Users
  */
  static async ListEmailSharableUsers() {
    const database = await getDatabase();

    const result = await database.User.findAll({
      attributes: ['id', 'email', 'name', 'roleId', 'contactNumber'],
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

  /**
     * Updates the details of the user
     * @param {String[]} emailList email list to be updated with new role
     * @param {string} roleId role id of the new role
  */
  static async UpdateRole({ emailList, roleId }) {
    const database = await getDatabase();

    const promises = emailList.map(async (email) => database.User.findOne({ where: { email } }));

    const users = await Promise.all(promises);

    if (users.includes(null) || users.includes(undefined)) {
      throw new Errors.BadRequest('Unregistered emails in the emailList');
    }

    emailList.forEach(async (email) => {
      const user = await database.User.findOne({ where: { email } });
      user.roleId = roleId;
      user.save();
    });
  }
}
module.exports = UserService;
