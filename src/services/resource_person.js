const { Op } = require('sequelize');
const path = require('path');
const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const { convertToTitleCase, formatResponse } = require('../helpers/minihelpers');
const { Administrator, EditorLevelA, EditorLevelD } = require('../database/models/role');
const config = require('../config');
const sendMail = require('../emails/send_mail');
const { calcCurrentTime } = require('../helpers/local_time');

/**
 * Service that manages resource_person functionalities
 * @abstract
 * @category Services
 */
class ResourcePersonService {
  /**
   * Helper resource_person mail function
   * @param {String} recipientEmail,
   * @param {String} recipientFirstName,
   * @param {String} recipientLastName,
   * @param {String} name name of the resource person
   * @param {String} email email of the resource person
   * @param {Integer} contactNumber contact no of the resource person
   * @param {String} resourcePersonAddress
   * @param {String} resourcePersonComment
   * @param {String} resourcePersonDate
   * @param {String} resourcePersonType
   */
  static async sendResourceMail({
    recipientEmail,
    recipientName,
    resourcePersonName,
    resourcePersonEmail,
    resourcePersonContactNumber,
    resourcePersonHelp,
    resourcePersonAddress,
    resourcePersonComment,
    resourcePersonDate,
    resourcePersonType,
  }) {
    const emailComposition = {
      from: config.email.organization_email,
      to: recipientEmail,
      subject: 'Resource Person Notification- Sasnaka Sansada',
      template: 'resource_person_notification',
      context: {
        recipientEmail,
        recipientName,

        resourcePersonName,
        resourcePersonEmail,
        resourcePersonContactNumber,
        resourcePersonHelp,
        resourcePersonAddress,
        resourcePersonComment,
        resourcePersonDate,
        resourcePersonType,
      },
      attachments: [
        {
          filename: 'logo.png',
          path: path.join(__dirname, '../../public/images/logo.png'),
          cid: 'sasnakalogo',
        },
      ],
    };
    await sendMail(emailComposition);
  }

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
    help,
    address,
    comment,
  }) {
    const database = await getDatabase();

    // make titlecase
    const nameTitlecase = convertToTitleCase(name);

    const date = calcCurrentTime('+5.5').toLocaleString();

    let resourcePerson;

    try {
      // create resource person
      resourcePerson = await database.ResourcePerson.create({
        name: nameTitlecase,
        email,
        contactNumber,
        help,
        address,
        comment,
        type,
        date,
      });

      // find users that needed to be notified
      const notifiedUsers = await database.User.findAll({
        attributes: ['email', 'name'],
        where: { resourcePersonEmail: true },
        order: [['createdAt', 'DESC']],
      });

      // send mail
      notifiedUsers.forEach(async (user) => {
        await this.sendResourceMail({
          recipientEmail: user.email,
          recipientName: user.name,

          resourcePersonName: nameTitlecase,
          resourcePersonEmail: email,
          resourcePersonContactNumber: contactNumber,
          resourcePersonHelp: help,
          resourcePersonAddress: address,
          resourcePersonComment: comment,
          resourcePersonDate: date,
          resourcePersonType: type,
        });
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
      attributes: ['id', 'email', 'name', 'roleId'],
      where: { resourcePersonEmail: true },
      order: [['createdAt', 'DESC']],
    });

    // remove timestamp attributes
    const users = result.map((user) => formatResponse(user));

    return users;
  }
}

module.exports = ResourcePersonService;
