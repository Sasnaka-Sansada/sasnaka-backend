const ResourcePersonService = require('../services/resource_person');
const {
  CreateResourcePerson,
} = require('../validators/resource_person');

/**
 * Controller which manages sponsors
 * @abstract
 * @category Controllers
 */
class ResourcePersonController {
  /**
   * Creates a sponsor
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PostCreateResourcePerson(req, res, next) {
    try {
      const { value, error } = CreateResourcePerson.validate(req.body);
      if (error) throw (error);
      const sponsor = await ResourcePersonService.CreateResourcePerson(value);
      res.send(sponsor).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Gets a sponsor
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListResourcePersons(req, res, next) {
    try {
      const sponsors = await ResourcePersonService.ListResourcePersons();
      res.send(sponsors).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ResourcePersonController;
