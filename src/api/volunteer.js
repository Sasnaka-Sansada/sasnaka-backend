const VolunteerService = require('../services/volunteer');
const {
  CreateVolunteer,
} = require('../validators/volunteer');

/**
 * Controller which manages volunteers
 * @abstract
 * @category Controllers
 */
class VolunteerController {
  /**
   * Creates a volunteer
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PostCreateVolunteer(req, res, next) {
    try {
      const { value, error } = CreateVolunteer.validate(req.body);
      if (error) throw (error);
      const volunteer = await VolunteerService.CreateVolunteer(value);
      res.send(volunteer).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Gets a volunteer
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListVolunteers(req, res, next) {
    try {
      const volunteers = await VolunteerService.ListVolunteers();
      res.send(volunteers).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = VolunteerController;
