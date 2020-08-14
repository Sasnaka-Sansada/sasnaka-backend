const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const filePath = path.join(__dirname, '../../public/static_data/contact.json');

/**
 * Service that manages the contact information of the organization
 * @abstract
 * @category Services
 */
class ContactService {
  /**
     * Updates the contact information
     * @param {string} postalCode postal code of the organization
     * @param {string} phone1 first phone number of the organization
     * @param {string} phone2 second phone number of the organization
     * @param {string} email email of the organization
     * @returns {Object} contact contact of the organization
  */
  static async UpdateContact(contact) {
    const data = JSON.stringify(contact, null, 2);

    try {
      await writeFile(filePath, data);
    } catch (error) {
      logger.error(`Error while inserting data. ${error}`);
      throw new Errors.InternalServerError('Error while inserting data');
    }

    return contact;
  }


  /**
     * Returns the contact information
     * @returns Contact contact details
  */
  static async GetContact() {
    const contact = await readFile(filePath);
    return contact;
  }
}

module.exports = ContactService;
