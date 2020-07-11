const { Op } = require('sequelize');
const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const { convertToTitleCase, formatResponse } = require('../helpers/minihelpers');
const { Administrator, EditorLevelA, EditorLevelD } = require('../database/models/role');

/**
 * Service that manages sponsor functionalities
 * @abstract
 * @category Services
 */
class SponsorService {
  /**
       * Creates a new sponsor
       * @param {String} name name of the sponsor
       * @param {String} email email of the sponsor
       * @param {Number} contactNumber contact number of the sponsor
       * @param {String} address address of the sponsor
       * @param {String} comment comments of the sponsor
       * @returns {Object} Sponsor
    */
  static async CreateSponsor({
    name,
    email,
    contactNumber,
    address,
    comment,
  }) {
    const database = await getDatabase();

    // make titlecase
    const nameTitlecase = convertToTitleCase(name);

    let sponsor;

    try {
      // create sponsor
      sponsor = await database.Sponsor.create({
        name: nameTitlecase,
        email,
        contactNumber,
        address,
        comment,
      });
    } catch (error) {
      logger.error(`Error while inserting data: ${error}`);
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    sponsor = formatResponse(sponsor);

    return sponsor;
  }

  /**
     * Returns all sponsors
     * @returns {Sponsor}[] array of all sponsors
  */
  static async ListSponsors() {
    const database = await getDatabase();

    const result = await database.Sponsor.findAll({ order: [['createdAt', 'DESC']] });

    // remove timestamp attributes
    const sponsors = result.map((sponsor) => formatResponse(sponsor));

    return sponsors;
  }

  /**
       * Overwrites the previous sponsor msg shared emails
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
          { where: { sponsorEmail: true } }, { transaction: t },
        );

        previousEmailedUsers.forEach(async (user) => {
          await database.User.update(
            { sponsorEmail: false }, { where: { id: user.dataValues.id } }, { transaction: t },
          );
        });

        emailList.forEach(async (email) => {
          await database.User.update(
            { sponsorEmail: true }, { where: { email } }, { transaction: t },
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
      where: { sponsorEmail: true },
      order: [['createdAt', 'DESC']],
    });

    // remove timestamp attributes
    const users = result.map((user) => formatResponse(user));

    return users;
  }
}

module.exports = SponsorService;
