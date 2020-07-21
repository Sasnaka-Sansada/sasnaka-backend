const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');

const {
  formatResponse, convertToTitleCase, groupByKey,
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
     * @param {string} profileImage profileImage of the cordinator
     * @param {string}[] alumniProjects projects the cordinator has cordinated in the past
     * @returns {string} projectId projectId of the cordinator
  */
  static async CreateCordinator({
    name,
    university,
    description,
    alumni,
    profileImage,
    projectId,
    alumniProjects,
  }) {
    const database = await getDatabase();

    // check if the project id is valid
    const project = await database.Project.findOne({ where: { id: projectId } });
    if (!project) {
      throw new Errors.BadRequest('A project with given project id does not exist');
    }

    const result = alumniProjects.map(
      async (alumniProjectId) => database.Project.findOne({ where: { id: alumniProjectId } }),
    );

    let pastProjects = await Promise.all(result);

    // throw error if at least one alumni project ids are invalid
    if (pastProjects.some((pastProject) => !pastProject)) {
      throw new Errors.BadRequest('Invalid alumni project');
    }

    // convert name, university to titilecase
    const nameTitlecase = convertToTitleCase(name);
    const universityTitlecase = convertToTitleCase(university);

    let cordinator;

    try {
      cordinator = await database.Cordinator.create({
        name: nameTitlecase,
        university: universityTitlecase,
        description,
        alumni,
        profileImage,
        projectId,
      });
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }

    pastProjects = alumniProjects.map(
      (pastProject) => ({ pastProjectId: pastProject, cordinatorId: cordinator.dataValues.id }),
    );

    await database.AlumniProject.bulkCreate(pastProjects);

    // remove timestamp attributes
    cordinator = formatResponse(cordinator);

    return { ...cordinator, pillerId: project.pillerId, alumniProjects };
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

    let cordinator = await database.Cordinator.findOne({
      where: { id },
      include: {
        model: database.Project,
        attributes: ['id'],
        through: { attributes: [] },
        as: 'alumniProjects',
      },
    });
    if (!cordinator) {
      throw new Errors.BadRequest('A cordinator with the given id does not exist');
    }

    // remove timestamp attributes
    cordinator = formatResponse(cordinator);

    const alumniProjects = cordinator.alumniProjects.map((project) => project.id);
    cordinator = { ...cordinator, alumniProjects };

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
     * @param {string} profileImage profileImage of the cordinator
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
    alumniProjects,
  }) {
    const database = await getDatabase();

    let cordinator = await database.Cordinator.findOne({ where: { id } });
    if (!cordinator) {
      throw new Errors.BadRequest('A cordinator with the given id does not exist');
    }

    // check if alumni projects are valid
    const result = alumniProjects.map(
      async (alumniProjectId) => database.Project.findOne({ where: { id: alumniProjectId } }),
    );

    let pastProjects = await Promise.all(result);

    // throw error if at least one alumni project ids are invalid
    if (pastProjects.some((pastProject) => !pastProject)) {
      throw new Errors.BadRequest('Invalid alumni project');
    }

    // convert name, university to titlecase
    const nameTitlecase = convertToTitleCase(name);
    const universityTitlecase = convertToTitleCase(university);

    const project = await database.Project.findOne({ where: { id: projectId } });
    if (!project) {
      throw new Errors.BadRequest('A project with given project is not available');
    }

    cordinator.name = nameTitlecase;
    cordinator.university = universityTitlecase;
    cordinator.description = description;
    cordinator.alumni = alumni;
    cordinator.profileImage = profileImage;
    cordinator.projectId = projectId;

    try {
      await cordinator.save();
    } catch (error) {
      logger.error(`Error while inserting data. ${error}`);
      throw new Errors.InternalServerError('Error while inserting data');
    }

    pastProjects = alumniProjects.map(
      (pastProject) => ({ pastProjectId: pastProject, cordinatorId: cordinator.dataValues.id }),
    );

    await database.AlumniProject.destroy({ where: { cordinatorId: id } });
    await database.AlumniProject.bulkCreate(pastProjects);

    // remove timestamp attributes
    cordinator = formatResponse(cordinator);

    return { ...cordinator, pillerId: project.pillerId, alumniProjects };
  }

  /**
     * Returns all cordinators
     * @returns {Cordinator}[] array of all cordinators grouped into pillers
  */
  static async ListCordinators() {
    const database = await getDatabase();

    const result = await database.Cordinator.findAll({
      order: [['createdAt', 'DESC']],
      include:
        {
          model: database.Project,
          attributes: ['id'],
          through: { attributes: [] },
          as: 'alumniProjects',
        },
    });

    // remove timestamp attributes
    let cordinators = result.map((cordinator) => formatResponse(cordinator));

    const promises = cordinators.map(async (cordinator) => {
      const alumniProjects = cordinator.alumniProjects.map((project) => project.id);
      const formattedCordinator = { ...cordinator, alumniProjects };
      const project = await database.Project.findOne({ where: { id: cordinator.projectId } });
      return { ...formattedCordinator, pillerId: project.pillerId, projectHeader: project.header };
    });

    cordinators = await Promise.all(promises);

    cordinators = groupByKey(cordinators, 'pillerId', 'piller', 'cordinators');

    return cordinators;
  }
}

module.exports = CordinatorService;
