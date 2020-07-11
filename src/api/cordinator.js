const CordinatorService = require('../services/cordinator');
const {
  CreateCordinator, CordinatorId, UpdateCordinator,
} = require('../validators/cordinator');
const { FileValidator } = require('../validators/file_validator');

/**
 * Controller which manages cordinators
 * @abstract
 * @category Controllers
 */
class CordinatorController {
  /**
   * Creates a cordinator
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PostCreateCordinator(req, res, next) {
    try {
      const { value, error } = CreateCordinator.validate(req.body);
      if (error) throw (error);
      const { fileError, images } = FileValidator(req.files, ['profileImage'], [], []);
      if (fileError) throw fileError;
      const cordinator = await CordinatorService.CreateCordinator({ ...value, ...images });
      res.send(cordinator).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Deletes a cordinator
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async DeleteDeleteCordinator(req, res, next) {
    try {
      const { value, error } = CordinatorId.validate({ id: req.params.id });
      if (error) throw (error);
      await CordinatorService.DeleteCordinator(value);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Gets a cordinator
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetGetCordinator(req, res, next) {
    try {
      const { value, error } = CordinatorId.validate({ id: req.params.id });
      if (error) throw (error);
      const cordinator = await CordinatorService.GetCordinator(value);
      res.send(cordinator).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Updates a cordinator
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PutUpdateCordinator(req, res, next) {
    try {
      const { value, error } = UpdateCordinator.validate({ id: req.params.id, ...req.body });
      if (error) throw (error);
      const { fileError, images } = FileValidator(req.files, ['profileImage'], [], []);
      if (fileError) throw fileError;
      const cordinator = await CordinatorService.UpdateCordinator({ ...value, ...images });
      res.send(cordinator).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Lists all cordinators
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListCordinators(req, res, next) {
    try {
      const cordinators = await CordinatorService.ListCordinators();
      res.send(cordinators).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CordinatorController;
