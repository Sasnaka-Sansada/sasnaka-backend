const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');

/**
 * Service that manages project functionalities
 * @abstract
 * @category Services
 */
class ProjectService {
/**
     * Creates a new project
     * @param {string} email to be invited to
     * @param {roleId} email to be invited to
     * @returns {invitation} invitation created
  */
  static async CreateProject({
    header,
    subHeader,
    introduction,
    objective,
    process,
    // introductionImage,
    // objectiveImage,
    // processImage,
    pillerId,
  }) {
    // upload the file and get the url or save the file locally
    const introductionImage = 'introductionImage';
    const objectiveImage = 'objectiveImage';
    const processImage = 'processImage';

    const database = await getDatabase();

    // make sure to make them lower case and compare
    const previousHeader = await database.Project.findOne({ where: { header } });
    if (previousHeader) {
      throw new Errors.BadRequest('A project with the header already exists');
    }
    let project;

    try {
      project = await database.Project.create({
        header,
        subHeader,
        introduction,
        objective,
        process,
        introductionImage,
        objectiveImage,
        processImage,
        pillerId,
      });
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }

    return project;
  }

  static async DeleteProject({ id }) {
    const database = await getDatabase();

    const project = await database.Project.findOne({ where: { id } });
    if (!project) {
      throw new Errors.BadRequest('A project with the given id does not exist');
    }

    try {
      await project.destroy();
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }
  }
}

module.exports = ProjectService;
