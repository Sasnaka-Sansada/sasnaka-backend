const ResourcePersonService = require('../services/resource_person');
const {
  CreateResourcePerson, SharedEmailList,
} = require('../validators/resource_person');

/**
 * Controller which manages resource_persons
 * @abstract
 * @category Controllers
 */
class ResourcePersonController {
  /**
   * Creates a resource person
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
   * Gets a resource person
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
      await ResourcePersonService.PostSharedEmails(value);
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
      const emails = await ResourcePersonService.ListSharedEmails();
      res.send(emails).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ResourcePersonController;
