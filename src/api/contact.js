const ContactService = require('../services/contact');
const { UpdateContact } = require('../validators/contact');

/**
 * Controller which manages contact information of the organization
 * @abstract
 * @category Controllers
 */
class ContactController {
  /**
   * Puts the contact information
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PutUpdateContact(req, res, next) {
    try {
      const { value, error } = UpdateContact.validate(req.body);
      if (error) throw (error);
      const contact = await ContactService.UpdateContact(value);
      res.send(contact).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Gets the contact information
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetGetContact(req, res, next) {
    try {
      const contact = await ContactService.GetContact();
      res.send(contact).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ContactController;
