const { Op } = require('sequelize');
const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const { convertToTitleCase, formatResponse } = require('../helpers/minihelpers');
const { calcCurrentTime } = require('../helpers/local_time');
const { Administrator, EditorLevelA, EditorLevelD } = require('../database/models/role');

/**
 * Service that manages feedback functionalities
 * @abstract
 * @category Services
 */
class FeedbackService {
  /**
   * Creates a new feedback
   * @param {String} name name of the feedback provider
   * @param {String} email email of the feedback provider
   * @param {String} message content of the feedback
   * @param {Boolean} visible visibility of the feedback
   * @returns {Object} Feedback
    */
  static async CreateFeedback({
    name,
    email,
    message,
    visible,
  }) {
    const database = await getDatabase();

    // make titlecase
    const nameTitlecase = convertToTitleCase(name);

    let feedback;

    const date = calcCurrentTime('+5.5').toLocaleString();

    try {
      // create feedback
      feedback = await database.Feedback.create({
        name: nameTitlecase,
        email,
        message,
        visible,
        date,
      });
    } catch (error) {
      logger.error(`Error while inserting data: ${error}`);
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    feedback = formatResponse(feedback);

    return feedback;
  }

  /**
     * Returns all feedbacks
     * @returns {Feedback}[] array of all feedbacks grouped into pillers
  */
  static async ListFeedbacks() {
    const database = await getDatabase();

    const result = await database.Feedback.findAll({ order: [['createdAt', 'DESC']] });

    // remove timestamp attributes
    const feedbacks = result.map((feedback) => formatResponse(feedback));

    return feedbacks;
  }

  /**
   * Updates a feedback
   * @param {String} id id of the feedback
   * @param {String} name name of the feedback provider
   * @param {String} email email of the feedback provider
   * @param {String} message content of the feedback
   * @param {Boolean} visible visibility of the feedback
   * @returns {Object} Feedback
    */
  static async UpdateFeedback({
    id,
    name,
    email,
    message,
    visible,
  }) {
    const database = await getDatabase();

    let feedback = await database.Feedback.findOne({ where: { id } });
    if (!feedback) {
      throw new Errors.BadRequest('A feedback with the given id does not exist');
    }
    // make titlecase
    const nameTitlecase = convertToTitleCase(name);

    feedback.name = nameTitlecase;
    feedback.email = email;
    feedback.message = message;
    feedback.visible = visible;

    try {
      // save feedback
      await feedback.save();
    } catch (error) {
      logger.error(`Error while inserting data: ${error}`);
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    feedback = formatResponse(feedback);

    return feedback;
  }

  /**
     * Returns all visible feedbacks
     * @returns {Feedback}[] array of all feedbacks grouped into pillers
  */
  static async ListVisibleFeedbacks() {
    const database = await getDatabase();

    const result = await database.Feedback.findAll({ where: { visible: true }, order: [['updatedAt', 'DESC']] });

    // remove timestamp attributes
    const feedbacks = result.map((feedback) => formatResponse(feedback));

    return feedbacks;
  }


  /**
       * Overwrites the previous resource person msg shared emails
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
          { where: { feedbackEmail: true } }, { transaction: t },
        );

        previousEmailedUsers.forEach(async (user) => {
          await database.User.update(
            { feedbackEmail: false },
            { where: { id: user.dataValues.id } },
            { transaction: t },
          );
        });

        emailList.forEach(async (email) => {
          await database.User.update(
            { feedbackEmail: true }, { where: { email } }, { transaction: t },
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
      attributes: ['id', 'email', 'name', 'roleId'],
      where: { feedbackEmail: true },
      order: [['createdAt', 'DESC']],
    });

    // remove timestamp attributes
    const users = result.map((user) => formatResponse(user));

    return users;
  }
}

module.exports = FeedbackService;
