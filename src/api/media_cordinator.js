const MediaCordinatorService = require('../services/media_cordinator');
const {
  CreateMediaCordinator, MediaCordinatorId, UpdateMediaCordinator,
} = require('../validators/media_cordinator');

/**
 * Controller which manages media media cordinators
 * @abstract
 * @category Controllers
 */
class MediaMediaCordinatorController {
  /**
   * Creates a media cordinator
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PostCreateMediaCordinator(req, res, next) {
    try {
      const { value, error } = CreateMediaCordinator.validate(req.body);
      if (error) throw (error);
      const mediaCordinator = await MediaCordinatorService.CreateMediaCordinator(value);
      res.send(mediaCordinator).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Deletes a media cordinator
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async DeleteDeleteMediaCordinator(req, res, next) {
    try {
      const { value, error } = MediaCordinatorId.validate({ id: req.params.id });
      if (error) throw (error);
      await MediaCordinatorService.DeleteMediaCordinator(value);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Gets a media cordinator
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetGetMediaCordinator(req, res, next) {
    try {
      const { value, error } = MediaCordinatorId.validate({ id: req.params.id });
      if (error) throw (error);
      const mediaCordinator = await MediaCordinatorService.GetMediaCordinator(value);
      res.send(mediaCordinator).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Updates a media cordinator
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PutUpdateMediaCordinator(req, res, next) {
    try {
      const { value, error } = UpdateMediaCordinator.validate({ id: req.params.id, ...req.body });
      if (error) throw (error);
      const mediaCordinator = await MediaCordinatorService.UpdateMediaCordinator(value);
      res.send(mediaCordinator).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Lists all media cordinators
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListMediaCordinators(req, res, next) {
    try {
      const mediaCordinators = await MediaCordinatorService.ListMediaCordinators();
      res.send(mediaCordinators).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MediaMediaCordinatorController;
