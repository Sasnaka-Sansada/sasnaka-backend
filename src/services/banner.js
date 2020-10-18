const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');

const { formatResponse } = require('../helpers/minihelpers');

/**
 * Service that manages banner functionalities
 * @abstract
 * @category Services
 */
class BannerService {
  /**
     * Creates a new banner
     * @param {string} header header of the banner
     * @param {string} description description of the banner
     * @param {string} heroImage heroImage of the banner
     * @param {string} readMoreLink readMoreLink of the banner
     * @returns {Object} banner
  */
  static async CreateBanner({
    header,
    description,
    heroImage,
    readMoreLink,
  }) {
    const database = await getDatabase();

    let banner;
    try {
      banner = await database.Banner.create({
        header,
        description,
        heroImage,
        readMoreLink,
      });
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    banner = formatResponse(banner);

    return banner;
  }

  /**
     * Deletes an existing banner
     * @param {string} id id of the banner
  */
  static async DeleteBanner({ id }) {
    const database = await getDatabase();

    const banner = await database.Banner.findOne({ where: { id } });
    if (!banner) {
      throw new Errors.BadRequest('A banner with the given id does not exist');
    }

    try {
      await banner.destroy();
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }
  }


  /**
     * Updates an existing banner
     * @param {string} id id of the banner
      * @param {string} header header of the banner
     * @param {string} description description of the banner
     * @param {string} heroImage heroImage of the banner
     * @param {string} readMoreLink readMoreLink of the banner
     * @returns {Object} banner
  */
  static async UpdateBanner({
    id,
    header,
    description,
    heroImage,
    readMoreLink,
  }) {
    const database = await getDatabase();

    let banner = await database.Banner.findOne({ where: { id } });
    if (!banner) {
      throw new Errors.BadRequest('A banner with the given id does not exist');
    }

    banner.header = header;
    banner.description = description;
    banner.heroImage = heroImage;
    banner.readMoreLink = readMoreLink;

    try {
      await banner.save();
    } catch (error) {
      logger.error(`Error while inserting data. ${error}`);
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    banner = formatResponse(banner);

    return banner;
  }

  /**
     * Returns all banners
     * @returns {Banner}[] array of all banners grouped into pillers
  */
  static async ListBanners() {
    const database = await getDatabase();

    const result = await database.Banner.findAll({
      order: [['createdAt', 'DESC']],
    });

    // remove timestamp attributes
    const banners = result.map((banner) => formatResponse(banner));

    return banners;
  }
}

module.exports = BannerService;
