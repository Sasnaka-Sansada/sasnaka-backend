const { Op } = require('sequelize');
const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const { convertToTitleCase, formatResponse } = require('../helpers/minihelpers');
const { Administrator, EditorLevelA, EditorLevelD } = require('../database/models/role');

/**
 * Service that manages resource_person functionalities
 * @abstract
 * @category Services
 */
class ResourcePersonService {
  /**
       * Creates a new resource_person
       * @param {String} name name of the resource person
       * @param {String} email email of the resource person
       * @param {Number} contactNumber contact number of the resource person
       * @param {String} address address of the resource person
       * @param {String} type type of the resource provided
       * @param {String} comment comments of the resource person
       * @returns {Object} ResourcePerson
    */
  static async CreateResourcePerson({
    name,
    email,
    contactNumber,
    type,
    address,
    comment,
  }) {
    const database = await getDatabase();

    // make titlecase
    const nameTitlecase = convertToTitleCase(name);

    let resourcePerson;

    try {
      // create resource person
      resourcePerson = await database.ResourcePerson.create({
        name: nameTitlecase,
        email,
        contactNumber,
        address,
        comment,
        type,
      });
    } catch (error) {
      logger.error(`Error while inserting data: ${error}`);
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    resourcePerson = formatResponse(resourcePerson);

    return resourcePerson;
  }

  /**
     * Returns all resource persons
     * @returns {ResourcePerson}[] array of all resource persons
  */
  static async ListResourcePersons() {
    const database = await getDatabase();

    const result = await database.ResourcePerson.findAll({ order: [['createdAt', 'DESC']] });

    // remove timestamp attributes
    const resourcePersons = result.map((resourcePerson) => formatResponse(resourcePerson));

    return resourcePersons;
  }

  /**
       * Overwrites the previous resource person msg shared emails
       * @param {String}[] emailList list of emails
    */
  static async PostSharedEmails({ emailList }) {
    const database = await getDatabase();

    const result = emailList.map(async (email) => database.User.findOne(
      {
        where: {
          email,
          [Op.or]: [
            { roleId: Administrator },
            { roleId: EditorLevelA },
            { roleId: EditorLevelD },
          ],
        },
      },
    ));

    const users = await Promise.all(result);
    if (users.some((user) => !user)) {
      throw new Errors.BadRequest('Only registered user emails can be assigned');
    }

    try {
      await database.sequelize.transaction(async (t) => {
        const previousEmailedUsers = await database.User.findAll(
          { where: { resourcePersonEmail: true } }, { transaction: t },
        );

        previousEmailedUsers.forEach(async (user) => {
          await database.User.update(
            { resourcePersonEmail: false },
            { where: { id: user.dataValues.id } },
            { transaction: t },
          );
        });

        emailList.forEach(async (email) => {
          await database.User.update(
            { resourcePersonEmail: true }, { where: { email } }, { transaction: t },
          );
        });
      });
    } catch (error) {
      logger.error(`Error while inserting data: ${error}`);
      throw new Errors.InternalServerError('Error while inserting data');
    }
  }


  /**
     * Returns all users with email recieving capability
     * @returns {User}[] Users
  */
  static async ListSharedEmails() {
    const database = await getDatabase();

    const result = await database.User.findAll({
      attributes: ['id', 'email', 'firstName', 'lastName', 'roleId'],
      where: { resourcePersonEmail: true },
      order: [['createdAt', 'DESC']],
    });

    // remove timestamp attributes
    const users = result.map((user) => formatResponse(user));

    return users;
  }
}

module.exports = ResourcePersonService;
