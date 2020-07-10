const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const { convertToTitleCase, formatResponse } = require('../helpers/minihelpers');
/**
 * Service that manages volunteer functionalities
 * @abstract
 * @category Services
 */
class VolunteerService {
  /**
       * Creates a new volunteer
       * @param {String} name name of the volunteer
       * @param {String} birthday birthday of the volunteer
       * @param {String} email email of the volunteer
       * @param {Number} contactNumber telephone number of the volunteer
       * @param {String} address address of the volunteer
       * @param {String} potentials potentials of the volunteer
       * @param {String} interested interests of the volunteer
       * @param {String} comment comment of the volunteer
       * @returns {Object} Volunteer
    */
  static async CreateVolunteer({
    name,
    birthday,
    email,
    contactNumber,
    address,
    potentials,
    interested,
    comment,
  }) {
    const database = await getDatabase();

    // make titlecase
    const nameTitlecase = convertToTitleCase(name);

    const birthdayObject = new Date(birthday);

    let volunteer;

    try {
      // create volunteer
      volunteer = await database.Volunteer.create({
        name: nameTitlecase,
        birthday: birthdayObject,
        email,
        contactNumber,
        address,
        potentials,
        interested,
        comment,
      });
    } catch (error) {
      logger.error(`Error while inserting data: ${error}`);
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    volunteer = formatResponse(volunteer);

    return volunteer;
  }

  /**
     * Returns all volunteers of a given piller
     * @returns {Volunteer}[] array of all volunteers grouped into pillers
  */
  static async ListVolunteers() {
    const database = await getDatabase();

    const result = await database.Volunteer.findAll({ order: [['createdAt', 'DESC']] });

    // remove timestamp attributes
    const volunteers = result.map((volunteer) => formatResponse(volunteer));

    return volunteers;
  }
}

module.exports = VolunteerService;
