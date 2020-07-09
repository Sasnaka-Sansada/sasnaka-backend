const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const { convertToTitleCase, formatResponse } = require('../helpers/minihelpers');
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

    try {
      // create feedback
      feedback = await database.Feedback.create({
        name: nameTitlecase,
        email,
        message,
        visible,
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
}

module.exports = FeedbackService;
