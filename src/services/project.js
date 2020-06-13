const { Op } = require('sequelize');
const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const { imageUpload } = require('../helpers/image_handler');
const cloudinaryDir = require('../config/cloudinary.json');


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
     * @param {File} introductionImage introductionImage of the project
     * @param {File} objectiveImage objectiveImage of the project
     * @param {File} processImage processImage of the project
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

    // make sure to make them lower case and compare
    const previousHeader = await database.Project.findOne({ where: { header } });
    if (previousHeader) {
      throw new Errors.BadRequest('A project with the header already exists');
    }

    // upload the file and get the url
    const introductionImageUrl = await imageUpload({
      file: introductionImage, folder: cloudinaryDir.Project.ProjectIntroduction,
    });
    const objectiveImageUrl = await imageUpload({
      file: objectiveImage, folder: cloudinaryDir.Project.ProjectObjective,
    });
    const processImageUrl = await imageUpload({
      file: processImage, folder: cloudinaryDir.Project.ProjectProcess,
    });

    if (!introductionImageUrl || !objectiveImageUrl || !processImageUrl) {
      throw new Errors.InternalServerError('Image upload failed');
    }

    let project;

    try {
      project = await database.Project.create({
        header,
        subHeader,
        introduction,
        objective,
        process,
        introductionImage: introductionImageUrl,
        objectiveImage: objectiveImageUrl,
        processImage: processImageUrl,
        pillerId,
      });
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }

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

    const project = await database.Project.findOne({ where: { id } });
    if (!project) {
      throw new Errors.BadRequest('A project with the given id does not exist');
    }

    return project;
  }

  /**
     * Updates an existing project
     * @param {string} id id of the project
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

    const project = await database.Project.findOne({ where: { id } });
    if (!project) {
      throw new Errors.BadRequest('A project with the given id does not exist');
    }

    const similarNameProject = await database.Project.findOne(
      { where: { header, id: { [Op.ne]: id } } },
    );
    if (similarNameProject) {
      throw new Errors.BadRequest('A project with the given header already exists');
    }

    // upload the file and get the url
    const introductionImageUrl = await imageUpload({
      file: introductionImage, folder: cloudinaryDir.Project.ProjectIntroduction,
    });
    const objectiveImageUrl = await imageUpload({
      file: objectiveImage, folder: cloudinaryDir.Project.ProjectObjective,
    });
    const processImageUrl = await imageUpload({
      file: processImage, folder: cloudinaryDir.Project.ProjectProcess,
    });

    project.header = header;
    project.subHeader = subHeader;
    project.introduction = introduction;
    project.objective = objective;
    project.process = process;
    project.introductionImage = introductionImageUrl;
    project.objectiveImage = objectiveImageUrl;
    project.processImage = processImageUrl;
    project.pillerId = pillerId;

    try {
      await project.save();
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }

    return project;
  }
}

module.exports = ProjectService;
