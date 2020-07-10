const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const { convertToTitleCase, formatResponse } = require('../helpers/minihelpers');
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
}

module.exports = SponsorService;
