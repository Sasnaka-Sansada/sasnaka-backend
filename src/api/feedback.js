const FeedbackService = require('../services/feedback');
const {
  CreateFeedback, UpdateFeedback, SharedEmailList,
} = require('../validators/feedback');

/**
 * Controller which manages feedbacks
 * @abstract
 * @category Controllers
 */
class FeedbackController {
  /**
   * Creates a feedback
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PostCreateFeedback(req, res, next) {
    try {
      const { value, error } = CreateFeedback.validate(req.body);
      if (error) throw (error);
      const feedback = await FeedbackService.CreateFeedback(value);
      res.send(feedback).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Lists all feedbacks
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListFeedbacks(req, res, next) {
    try {
      const feedbacks = await FeedbackService.ListFeedbacks();
      res.send(feedbacks).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Updates a feedback
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PutUpdateFeedback(req, res, next) {
    try {
      const { value, error } = UpdateFeedback.validate({ id: req.params.id, ...req.body });
      if (error) throw (error);
      const feedback = await FeedbackService.UpdateFeedback(value);
      res.send(feedback).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Gets all visible feedback
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListVisibleFeedbacks(req, res, next) {
    try {
      const feedbacks = await FeedbackService.ListVisibleFeedbacks();
      res.send(feedbacks).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Posts the notification shared emails
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PostPostSharedEmails(req, res, next) {
    try {
      const { value, error } = SharedEmailList.validate(req.body);
      if (error) throw (error);
      await FeedbackService.PostSharedEmails(value);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Lists all notification shared emails
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListSharedEmails(req, res, next) {
    try {
      const emails = await FeedbackService.ListSharedEmails();
      res.send(emails).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = FeedbackController;
