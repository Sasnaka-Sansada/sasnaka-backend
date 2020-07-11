const NotificationService = require('../services/notification');
const {
  CreateNotification, NotificationId, UpdateNotification,
} = require('../validators/notification');
const { FileValidator } = require('../validators/file_validator');

/**
 * Controller which manages notifications
 * @abstract
 * @category Controllers
 */
class NotificationController {
  /**
   * Creates a notification
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PostCreateNotification(req, res, next) {
    try {
      const { value, error } = CreateNotification.validate(req.body);
      if (error) throw (error);
      const { fileError, images, docs } = FileValidator(req.files, ['bannerImage', 'portraitImage'], [], ['attatchments']);
      if (fileError) throw fileError;
      const notification = await NotificationService.CreateNotification(
        { ...value, ...images, docs },
      );
      res.send(notification).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Deletes a notification
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async DeleteDeleteNotification(req, res, next) {
    try {
      const { value, error } = NotificationId.validate({ id: req.params.id });
      if (error) throw (error);
      await NotificationService.DeleteNotification(value);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Gets a notification
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetGetNotification(req, res, next) {
    try {
      const { value, error } = NotificationId.validate({ id: req.params.id });
      if (error) throw (error);
      const notification = await NotificationService.GetNotification(value);
      res.send(notification).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Updates a notification
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PutUpdateNotification(req, res, next) {
    try {
      const { value, error } = UpdateNotification.validate({ ...req.body, id: req.params.id });
      if (error) throw (error);
      const { fileError, images, docs } = FileValidator(req.files, ['bannerImage', 'portraitImage'], [], ['attatchments']);
      if (fileError) throw fileError;
      const notification = await NotificationService.UpdateNotification(
        { ...value, ...images, docs },
      );
      res.send(notification).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Lists all notifications
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListNotifications(req, res, next) {
    try {
      const notifications = await NotificationService.ListNotifications();
      res.send(notifications).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = NotificationController;
