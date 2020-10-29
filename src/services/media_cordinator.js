const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');

const {
  formatResponse, convertToTitleCase,
} = require('../helpers/minihelpers');

/**
 * Service that manages media cordinator functionalities
 * @abstract
 * @category Services
 */
class MediaCordinatorService {
  /**
     * Creates a new media cordinator
     * @param {string} name name of the media cordinator
     * @param {string} university university of the media cordinator
     * @param {string} description desctiption of the media cordinator
     * @param {boolean} alumni type of the media cordinator
     * @param {string} profileImage profileImage of the media cordinator
     * @param {string}[] alumniProjects projects the media cordinator has cordinated in the past
     * @returns {string} projectId projectId of the media cordinator
  */
  static async CreateMediaCordinator({
    name,
    university,
    description,
    alumni,
    profileImage,
  }) {
    const database = await getDatabase();

    // convert name, university to titilecase
    const nameTitlecase = convertToTitleCase(name);
    const universityTitlecase = convertToTitleCase(university);

    let mediaCordinator;

    try {
      mediaCordinator = await database.MediaCordinator.create({
        name: nameTitlecase,
        university: universityTitlecase,
        description,
        alumni,
        profileImage,
      });
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    mediaCordinator = formatResponse(mediaCordinator);

    return mediaCordinator;
  }

  /**
     * Deletes an existing media cordinator
     * @param {string} id id of the media cordinator
  */
  static async DeleteMediaCordinator({ id }) {
    const database = await getDatabase();

    const mediaCordinator = await database.MediaCordinator.findOne({ where: { id } });
    if (!mediaCordinator) {
      throw new Errors.BadRequest('A media cordinator with the given id does not exist');
    }

    try {
      await mediaCordinator.destroy();
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }
  }

  /**
     * Returns an existing media cordinator
     * @param {string} id id of the media cordinator
  */
  static async GetMediaCordinator({ id }) {
    const database = await getDatabase();

    let mediaCordinator = await database.MediaCordinator.findOne({ where: { id } });
    if (!mediaCordinator) {
      throw new Errors.BadRequest('A media cordinator with the given id does not exist');
    }

    // remove timestamp attributes
    mediaCordinator = formatResponse(mediaCordinator);

    return mediaCordinator;
  }

  /**
     * Updates an existing media cordinator
     * @param {string} id id of the media cordinator
     * @param {string} name name of the media cordinator
     * @param {string} university university of the media cordinator
     * @param {string} description desctiption of the media cordinator
     * @param {boolean} alumni type of the media cordinator
     * @param {string} profileImage profileImage of the media cordinator
     * @returns {string} projectId projectId of the media cordinator
  */
  static async UpdateMediaCordinator({
    id,
    name,
    university,
    description,
    alumni,
    profileImage,
  }) {
    const database = await getDatabase();

    let mediaCordinator = await database.MediaCordinator.findOne({ where: { id } });
    if (!mediaCordinator) {
      throw new Errors.BadRequest('A mediaCordinator with the given id does not exist');
    }

    // convert name, university to titlecase
    const nameTitlecase = convertToTitleCase(name);
    const universityTitlecase = convertToTitleCase(university);

    mediaCordinator.name = nameTitlecase;
    mediaCordinator.university = universityTitlecase;
    mediaCordinator.description = description;
    mediaCordinator.alumni = alumni;
    mediaCordinator.profileImage = profileImage;

    try {
      await mediaCordinator.save();
    } catch (error) {
      logger.error(`Error while inserting data. ${error}`);
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    mediaCordinator = formatResponse(mediaCordinator);

    return mediaCordinator;
  }

  /**
     * Returns all media cordinators
     * @returns {MediaCordinator}[] array of all media cordinators grouped into pillers
  */
  static async ListMediaCordinators() {
    const database = await getDatabase();

    const result = await database.MediaCordinator.findAll({ order: [['createdAt', 'DESC']] });

    // remove timestamp attributes
    const mediaCordinators = result.map((mediaCordinator) => formatResponse(mediaCordinator));

    return mediaCordinators;
  }
}

module.exports = MediaCordinatorService;
