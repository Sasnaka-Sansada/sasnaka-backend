const { Op } = require('sequelize');
const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const { groupByKey, convertToTitleCase, formatResponse } = require('../helpers/minihelpers');

/**
 * Service that manages project functionalities
 * @abstract
 * @category Services
 */
class ProjectService {
/**
     * Creates a new project
     * @param {string} header header of the project
     * @param {string} subHeader subHeader of the project
     * @param {string} introduction introductionof the project
     * @param {string} objective objective of the project
     * @param {string} process process of the project
     * @param {string} introductionImage introductionImage of the project
     * @param {string} objectiveImage objectiveImage of the project
     * @param {string} processImage processImage of the project
     * @returns {string} pillerId pillerId of the project
  */
  static async CreateProject({
    header,
    subHeader,
    introduction,
    objective,
    process,
    introductionImage,
    objectiveImage,
    processImage,
    pillerId,
  }) {
    const database = await getDatabase();

    // make header titlecase
    const headerTitlecase = convertToTitleCase(header);
    // check for previous same header projects
    const previousHeader = await database.Project.findOne({ where: { header: headerTitlecase } });
    if (previousHeader) {
      throw new Errors.BadRequest('A project with the header already exists');
    }

    let project;

    try {
      project = await database.Project.create({
        header: headerTitlecase,
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

    // remove timestamp attributes
    project = formatResponse(project);

    return project;
  }

  /**
     * Deletes an existing project
     * @param {string} id id of the project
  */
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

  /**
     * Returns an existing project
     * @param {string} id id of the project
  */
  static async GetProject({ id }) {
    const database = await getDatabase();

    let project = await database.Project.findOne({ where: { id } });
    if (!project) {
      throw new Errors.BadRequest('A project with the given id does not exist');
    }

    // remove timestamp attributes
    project = formatResponse(project);
    return project;
  }

  /**
     * Updates an existing project
     * @param {string} id id of the project
     * @param {String} header of the project
     * @param {String} subHeader of the project
     * @param {String} introduction of the project
     * @param {String} objective of the project
     * @param {String} process of the project
     * @param {string} introductionImage of the project
     * @param {string} objectiveImage of the project
     * @param {string} processImage of the project
     * @param {String} pillerId of the project
  */
  static async UpdateProject({
    id,
    header,
    subHeader,
    introduction,
    objective,
    process,
    introductionImage,
    objectiveImage,
    processImage,
    pillerId,
  }) {
    const database = await getDatabase();

    let project = await database.Project.findOne({ where: { id } });
    if (!project) {
      throw new Errors.BadRequest('A project with the given id does not exist');
    }

    const headerTitlecase = convertToTitleCase(header);
    const similarNameProject = await database.Project.findOne(
      { where: { header: headerTitlecase, id: { [Op.ne]: id } } },
    );
    if (similarNameProject) {
      throw new Errors.BadRequest('A project with the given header already exists');
    }

    project.header = headerTitlecase;
    project.subHeader = subHeader;
    project.introduction = introduction;
    project.objective = objective;
    project.process = process;
    project.introductionImage = introductionImage;
    project.objectiveImage = objectiveImage;
    project.processImage = processImage;
    project.pillerId = pillerId;

    try {
      await project.save();
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    project = formatResponse(project);
    return project;
  }

  /**
     * Returns all projects of all pillers
     * @returns {Project}[] array of all projects grouped into pillers
  */
  static async ListProjects() {
    const database = await getDatabase();

    const result = await database.Project.findAll({ order: [['createdAt', 'DESC']] });

    // remove timestamp attributes
    let projects = result.map((project) => formatResponse(project));

    projects = groupByKey(projects, 'pillerId', 'piller', 'projects');
    return projects;
  }

  /**
     * Returns all projects of a given piller
     * @param {String} pillerId
     * @returns {Project}[] array of all projects grouped into pillers
  */
  static async ListProjectsOfAPiller({ pillerId }) {
    const database = await getDatabase();

    let projects = await database.Project.findAll({ where: { pillerId }, order: [['createdAt', 'DESC']] });

    // remove timestamp attributes
    projects = projects.map((project) => formatResponse(project));

    return projects;
  }
}

module.exports = ProjectService;
