// const { Op } = require('sequelize');
const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const { imageUpload } = require('../helpers/image_handler');
const cloudinaryDir = require('../config/cloudinary.json');
// const { groupByKey, convertToTitleCase } = require('../helpers/minihelpers');

/**
 * Service that manages cordinator functionalities
 * @abstract
 * @category Services
 */
class CordinatorService {
/**
     * Creates a new cordinator
     * @param {string} header header of the cordinator
     * @param {string} subHeader subHeader of the cordinator
     * @param {string} introduction introductionof the cordinator
     * @param {string} objective objective of the cordinator
     * @param {string} process process of the cordinator
     * @param {File} introductionImage introductionImage of the cordinator
     * @param {File} objectiveImage objectiveImage of the cordinator
     * @param {File} processImage processImage of the cordinator
     * @returns {string} pillerId pillerId of the cordinator
  */
  static async CreateCordinator({
    firstName,
    lastName,
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

    // upload the file and get the url
    const profileImageUrl = await imageUpload({
      file: profileImage, folder: cloudinaryDir.Cordinator.Profile,
    });

    if (!profileImageUrl) {
      throw new Errors.InternalServerError('Image upload failed');
    }

    let cordinator;

    try {
      cordinator = await database.Cordinator.create({
        firstName,
        lastName,
        university,
        description,
        alumni,
        profileImage: profileImageUrl,
        projectId,
      });
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }

    return cordinator;
  }

  // /**
  //    * Deletes an existing cordinator
  //    * @param {string} id id of the cordinator
  // */
  // static async DeleteCordinator({ id }) {
  //   const database = await getDatabase();

  //   const cordinator = await database.Cordinator.findOne({ where: { id } });
  //   if (!cordinator) {
  //     throw new Errors.BadRequest('A cordinator with the given id does not exist');
  //   }

  //   try {
  //     await cordinator.destroy();
  //   } catch (error) {
  //     logger.error('Error while inserting data');
  //     throw new Errors.InternalServerError('Error while inserting data');
  //   }
  // }

  // /**
  //    * Returns an existing cordinator
  //    * @param {string} id id of the cordinator
  // */
  // static async GetCordinator({ id }) {
  //   const database = await getDatabase();

  //   const cordinator = await database.Cordinator.findOne({ where: { id } });
  //   if (!cordinator) {
  //     throw new Errors.BadRequest('A cordinator with the given id does not exist');
  //   }

  //   return cordinator;
  // }

  // /**
  //    * Updates an existing cordinator
  //    * @param {string} id id of the cordinator
  // */
  // static async UpdateCordinator({
  //   id,
  //   header,
  //   subHeader,
  //   introduction,
  //   objective,
  //   process,
  //   introductionImage,
  //   objectiveImage,
  //   processImage,
  //   pillerId,
  // }) {
  //   const database = await getDatabase();

  //   const cordinator = await database.Cordinator.findOne({ where: { id } });
  //   if (!cordinator) {
  //     throw new Errors.BadRequest('A cordinator with the given id does not exist');
  //   }

  //   const headerTitlecase = convertToTitleCase(header);
  //   const similarNameCordinator = await database.Cordinator.findOne(
  //     { where: { header: headerTitlecase, id: { [Op.ne]: id } } },
  //   );
  //   if (similarNameCordinator) {
  //     throw new Errors.BadRequest('A cordinator with the given header already exists');
  //   }

  //   // upload the file and get the url
  //   const introductionImageUrl = await imageUpload({
  //     file: introductionImage, folder: cloudinaryDir.Cordinator.CordinatorIntroduction,
  //   });
  //   const objectiveImageUrl = await imageUpload({
  //     file: objectiveImage, folder: cloudinaryDir.Cordinator.CordinatorObjective,
  //   });
  //   const processImageUrl = await imageUpload({
  //     file: processImage, folder: cloudinaryDir.Cordinator.CordinatorProcess,
  //   });

  //   cordinator.header = headerTitlecase;
  //   cordinator.subHeader = subHeader;
  //   cordinator.introduction = introduction;
  //   cordinator.objective = objective;
  //   cordinator.process = process;
  //   cordinator.introductionImage = introductionImageUrl;
  //   cordinator.objectiveImage = objectiveImageUrl;
  //   cordinator.processImage = processImageUrl;
  //   cordinator.pillerId = pillerId;

  //   try {
  //     await cordinator.save();
  //   } catch (error) {
  //     logger.error('Error while inserting data');
  //     throw new Errors.InternalServerError('Error while inserting data');
  //   }

  //   return cordinator;
  // }

  // /**
  //    * Returns all cordinators of a given piller
  //    * @returns {Cordinator}[] array of all cordinators grouped into pillers
  // */
  // static async ListCordinators() {
  //   const database = await getDatabase();

  //   const result = await database.Cordinator.findAll({ order: [['createdAt', 'DESC']] });
  //   const cordinators = groupByKey(result, 'pillerId', 'piller', 'cordinators');
  //   return cordinators;
  // }

  // /**
  //    * Returns all cordinators of a given piller
  //    * @param {String} pillerId
  //    * @returns {Cordinator}[] array of all cordinators grouped into pillers
  // */
  // static async ListCordinatorsOfAPiller({ pillerId }) {
  //   const database = await getDatabase();

  //   const cordinators = await database.Cordinator.findAll(
  // { where: { pillerId } }, { order: [['createdAt', 'DESC']] });
  //   return cordinators;
  // }
}

module.exports = CordinatorService;
