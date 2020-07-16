const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const { fileUpload } = require('../helpers/file_upload_handler');
const cloudinaryDir = require('../config/cloudinary.json');
const {
  formatResponse, convertToTitleCase, groupByKey, changeObjectLabel,
} = require('../helpers/minihelpers');


/**
 * Service that manages cordinator functionalities
 * @abstract
 * @category Services
 */
class CordinatorService {
/**
     * Creates a new cordinator
     * @param {string} name name of the cordinator
     * @param {string} university university of the cordinator
     * @param {string} description desctiption of the cordinator
     * @param {boolean} alumni type of the cordinator
     * @param {File} profileImage profileImage of the cordinator
     * @returns {string} projectId projectId of the cordinator
  */
  static async CreateCordinator({
    name,
    university,
    description,
    alumni,
    profileImage,
    projectId,
  }) {
    const database = await getDatabase();

    // check if the project id is valid
    const project = await database.Project.findOne({ where: { id: projectId } });
    if (!project) {
      throw new Errors.BadRequest('A project with given project id does not exist');
    }

    // convert name, university to titilecase
    const nameTitlecase = convertToTitleCase(name);
    const universityTitlecase = convertToTitleCase(university);

    // upload the file and get the url
    const profileImageUrl = await fileUpload({
      file: profileImage, folder: cloudinaryDir.Cordinator.Profile,
    });

    if (!profileImageUrl) {
      throw new Errors.InternalServerError('Image upload failed');
    }

    let cordinator;

    try {
      cordinator = await database.Cordinator.create({
        name: nameTitlecase,
        university: universityTitlecase,
        description,
        alumni,
        profileImage: profileImageUrl,
        projectId,
      });
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    cordinator = formatResponse(cordinator);

    return { ...cordinator, pillerId: project.pillerId };
  }

  /**
     * Deletes an existing cordinator
     * @param {string} id id of the cordinator
  */
  static async DeleteCordinator({ id }) {
    const database = await getDatabase();

    const cordinator = await database.Cordinator.findOne({ where: { id } });
    if (!cordinator) {
      throw new Errors.BadRequest('A cordinator with the given id does not exist');
    }

    try {
      await cordinator.destroy();
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }
  }

  /**
     * Returns an existing cordinator
     * @param {string} id id of the cordinator
  */
  static async GetCordinator({ id }) {
    const database = await getDatabase();

    let cordinator = await database.Cordinator.findOne({ where: { id } });
    if (!cordinator) {
      throw new Errors.BadRequest('A cordinator with the given id does not exist');
    }

    // remove timestamp attributes
    cordinator = formatResponse(cordinator);

    const project = await database.Project.findOne({ where: { id: cordinator.projectId } });

    return { ...cordinator, pillerId: project.pillerId, projectHeader: project.header };
  }

  /**
     * Updates an existing cordinator
     * @param {string} id id of the cordinator
     * @param {string} name name of the cordinator
     * @param {string} university university of the cordinator
     * @param {string} description desctiption of the cordinator
     * @param {boolean} alumni type of the cordinator
     * @param {File} profileImage profileImage of the cordinator
     * @returns {string} projectId projectId of the cordinator
  */
  static async UpdateCordinator({
    id,
    name,
    university,
    description,
    alumni,
    profileImage,
    projectId,
  }) {
    const database = await getDatabase();

    let cordinator = await database.Cordinator.findOne({ where: { id } });
    if (!cordinator) {
      throw new Errors.BadRequest('A cordinator with the given id does not exist');
    }

    // convert name, university to titlecase
    const nameTitlecase = convertToTitleCase(name);
    const universityTitlecase = convertToTitleCase(university);

    // upload the file and get the url
    const profileImageUrl = await fileUpload({
      file: profileImage, folder: cloudinaryDir.Cordinator.Profile,
    });

    if (!profileImageUrl) {
      throw new Errors.InternalServerError('Image upload failed');
    }

    const project = await database.Project.findOne({ where: { id: projectId } });
    if (!project) {
      throw new Errors.BadRequest('A project with given project is not available');
    }

    cordinator.name = nameTitlecase;
    cordinator.university = universityTitlecase;
    cordinator.description = description;
    cordinator.alumni = alumni;
    cordinator.profileImage = profileImageUrl;
    cordinator.projectId = projectId;

    try {
      await cordinator.save();
    } catch (error) {
      logger.error(`Error while inserting data. ${error}`);
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    cordinator = formatResponse(cordinator);

    return { ...cordinator, pillerId: project.pillerId };
  }

  /**
     * Returns all cordinators
     * @returns {Cordinator}[] array of all cordinators grouped into pillers
  */
  static async ListCordinators() {
    const database = await getDatabase();

    const result = await database.Cordinator.findAll({
      order: [['createdAt', 'DESC']],
      include: {
        model: database.Project,
        attributes: ['header', 'pillerId'],
      },
      raw: true,
    });

    // remove timestamp attributes
    let cordinators = result.map((cordinator) => formatResponse(cordinator));

    // change nested attribute labels
    cordinators = result.map((cordinator) => changeObjectLabel('Project.header', 'projectHeader', cordinator));

    cordinators = groupByKey(result, 'Project.pillerId', 'piller', 'cordinators');

    return cordinators;
  }
}

module.exports = CordinatorService;
