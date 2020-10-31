const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const { convertToTitleCase, formatResponse } = require('../helpers/minihelpers');
const { calcLocalTime, calcCurrentTime } = require('../helpers/local_time');

/**
 * Service that manages upcoming event functionalities
 * @abstract
 * @category Services
 */
class UpcomingEventService {
/**
     * Creates a new event
     * @param {string} headerTitle header title of the event
     * @param {string} headerSinhalaTitle sinhala title of the header of the event
     * @param {string} headerDescription description of the header of the event
     * @param {string} contentDescription description of the content of the event
     * @param {string} thumbnailDescription description of the thumbnail of the event
     * @param {string} thumbnailTitle title of the thumbnail of the event
     * @param {string} startDate startDate of the event
     * @param {string} endDate endDate of the event
     * @param {string} contentImage image of the content of the event
     * @param {string} thumbnailImage image of the thumbnail of the event
     * @param {string}[] subImages array of other images of the event
     * @returns {Object} UpcomingEvent
  */
  static async CreateEvent({
    headerTitle,
    headerSinhalaTitle,
    headerDescription,
    contentImage,
    contentDescription,
    thumbnailImage,
    thumbnailDescription,
    thumbnailTitle,
    startDate,
    endDate,
    subImages,
    heroImage,
  }) {
    const database = await getDatabase();
    // make titlecase
    const headerTitleTitlecase = convertToTitleCase(headerTitle);
    const thumbnailTitleTitlecase = convertToTitleCase(thumbnailTitle);

    const startDateGMT = calcLocalTime(startDate, '+5.5');
    const endDateGMT = calcLocalTime(endDate, '+5.5');

    startDateGMT.setFullYear(2000);
    endDateGMT.setFullYear(2000);

    let event;

    try {
      await database.sequelize.transaction(async (t) => {
        // create event
        event = await database.UpcomingEvent.create({
          headerTitle: headerTitleTitlecase,
          headerSinhalaTitle,
          headerDescription,
          contentImage,
          contentDescription,
          thumbnailImage,
          thumbnailDescription,
          thumbnailTitle: thumbnailTitleTitlecase,
          startDate: startDateGMT,
          endDate: endDateGMT,
          heroImage,
        }, { transaction: t });

        // insert event id into subImages
        const subImageArray = subImages.map((image) => (
          { image, eventId: event.dataValues.id }));

        // create tuples in event_image table
        await database.UpcomingEventImage.bulkCreate(subImageArray, { transaction: t });
      });
    } catch (error) {
      logger.error(`Error while inserting data: ${error}`);
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    event = formatResponse(event);

    return { ...event, subImages };
  }

  /**
     * Deletes an existing upcoming event
     * @param {string} id id of the notificaion
  */
  static async DeleteEvent({ id }) {
    const database = await getDatabase();

    const event = await database.UpcomingEvent.findOne({ where: { id } });

    if (!event) {
      throw new Errors.BadRequest('A event with the given id does not exist');
    }

    try {
      await event.destroy();
    } catch (error) {
      logger.error(`Error while deleting data: ${error}`);
      throw new Errors.InternalServerError('Error while deleting data');
    }
  }

  /**
     * Returns an existing upcoming event
     * @param {string} id id of the event
  */
  static async GetEvent({ id }) {
    const database = await getDatabase();

    let event = await database.UpcomingEvent.findOne({
      where: { id },
      include: {
        model: database.UpcomingEventImage,
        attributes: ['id', 'image'],
      },
    });
    if (!event) {
      throw new Errors.BadRequest('A event with the given id does not exist');
    }

    // remove timestamp attributes
    event = formatResponse(event);
    return event;
  }

  /**
   * Updates an existing upcoming event
   * @param {string} id id of the event
    * @param {string} headerTitle header title of the event
    * @param {string} headerSinhalaTitle sinhala title of the header of the event
    * @param {string} headerDescription description of the header of the event
    * @param {string} contentDescription description of the content of the event
    * @param {string} thumbnailDescription description of the thumbnail of the event
    * @param {string} thumbnailTitle title of the thumbnail of the event
    * @param {string} startDate startDate of the event
    * @param {string} endDate endDate of the event
    * @param {string} contentImage image of the content of the event
    * @param {string} thumbnailImage image of the thumbnail of the event
    * @param {string}[] subImages array of other images of the event
    * @returns {Object} Event
*/
  static async UpdateEvent({
    id,
    headerTitle,
    headerSinhalaTitle,
    headerDescription,
    contentImage,
    contentDescription,
    thumbnailImage,
    thumbnailDescription,
    thumbnailTitle,
    startDate,
    endDate,
    subImages,
    heroImage,
  }) {
    const database = await getDatabase();

    let event = await database.UpcomingEvent.findOne({ where: { id } });
    if (!event) {
      throw new Errors.BadRequest('A event with the given id does not exist');
    }

    // make titlecase
    const headerTitleTitlecase = convertToTitleCase(headerTitle);
    const thumbnailTitleTitlecase = convertToTitleCase(thumbnailTitle);

    const startDateGMT = calcLocalTime(startDate, '+5.5');
    const endDateGMT = calcLocalTime(endDate, '+5.5');

    startDateGMT.setFullYear(2000);
    endDateGMT.setFullYear(2000);

    event.headerTitle = headerTitleTitlecase;
    event.headerSinhalaTitle = headerSinhalaTitle;
    event.headerDescription = headerDescription;
    event.contentImage = contentImage;
    event.contentDescription = contentDescription;
    event.thumbnailImage = thumbnailImage;
    event.thumbnailDescription = thumbnailDescription;
    event.thumbnailTitle = thumbnailTitleTitlecase;
    event.startDate = startDateGMT;
    event.endDate = endDateGMT;
    event.heroImage = heroImage;

    try {
      await database.sequelize.transaction(async (t) => {
      // save edited event
        await event.save({ transaction: t });
        // delete previous images
        await database.UpcomingEventImage.destroy({ where: { eventId: id } }, { transaction: t });

        // insert event id into subImages
        const subImageArray = subImages.map((image) => (
          { image, eventId: event.dataValues.id }));

        // create tuples in attatchment table
        await database.UpcomingEventImage.bulkCreate(subImageArray, { transaction: t });
      });
    } catch (error) {
      logger.error(`Error while inserting data: ${error}`);
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    event = formatResponse(event);
    return { ...event, subImages };
  }

  /**
   * Returns all events within range
   * @returns {Object}[] Events
*/
  static async ListEventsInRange() {
    const database = await getDatabase();

    const result = await database.UpcomingEvent.findAll({
      order: [['startDate', 'ASC']],
      include: {
        model: database.UpcomingEventImage,
        attributes: ['id', 'image'],
      },
    });

    const currentDate = calcCurrentTime('+5.5');
    currentDate.setUTCFullYear(2000);

    const firstDateOfYear = new Date('2000-01-01');
    const lastDateOfYear = new Date('2000-12-31');

    let events = result.map((event) => formatResponse(event));
    events = (events.filter((event) => (
      (event.startDate.getTime() < currentDate.getTime()
      && currentDate.getTime() < event.endDate.getTime())
        || (firstDateOfYear.getTime() < currentDate.getTime()
        && currentDate.getTime() < event.endDate.getTime()
        && event.endDate.getTime() < event.startDate.getTime())
        || (event.startDate.getTime() < currentDate.getTime()
        && currentDate.getTime() < lastDateOfYear.getTime()
        && event.endDate.getTime() < event.startDate.getTime())
    ))).slice(0, 10);

    return events;
  }

  /**
   * Returns all events
   * @returns {Object}[] Events
*/
  static async ListEvents() {
    const database = await getDatabase();

    const result = await database.UpcomingEvent.findAll({
      order: [['startDate', 'ASC']],
      include: {
        model: database.UpcomingEventImage,
        attributes: ['id', 'image'],
      },
    });

    const events = result.map((event) => formatResponse(event));

    return events;
  }
}

module.exports = UpcomingEventService;
