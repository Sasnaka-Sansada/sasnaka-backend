const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const { fileUpload } = require('../helpers/file_upload_handler');
const cloudinaryDir = require('../config/cloudinary.json');
const { convertToTitleCase, formatResponse } = require('../helpers/minihelpers');

/**
 * Service that manages event functionalities
 * @abstract
 * @category Services
 */
class EventService {
/**
     * Creates a new event
     * @param {string} headerTitle header title of the event
     * @param {string} headerSinhalaTitle sinhala title of the header of the event
     * @param {string} headerDescription description of the header of the event
     * @param {string} contentDescription description of the content of the event
     * @param {string} thumbnailDescription description of the thumbnail of the event
     * @param {string} thumbnailTitle title of the thumbnail of the event
     * @param {string} date date of the event
     * @param {File} contentImage image of the content of the event
     * @param {File} thumbnailImage image of the thumbnail of the event
     * @param {File}[] subImages array of other images of the event
     * @params {string} projectId projectId of the event
     * @returns {Object} Event
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
    date,
    subImages,
    projectId,
  }) {
    const database = await getDatabase();
    // make titlecase
    const headerTitleTitlecase = convertToTitleCase(headerTitle);
    const thumbnailTitleTitlecase = convertToTitleCase(thumbnailTitle);

    // check if project id is valid
    const project = await database.Project.findOne({ where: { id: projectId } });
    if (!project) {
      throw new Errors.BadRequest('A project with the given id does not exist');
    }

    // upload the files and get the url
    const contentImageUrl = await fileUpload({
      file: contentImage, folder: cloudinaryDir.Event.Content,
    });
    const thumbnailImageUrl = await fileUpload({
      file: thumbnailImage, folder: cloudinaryDir.Event.Thumbnail,
    });

    const promises = subImages.map(async (image) => {
      const img = await fileUpload({
        file: image, folder: cloudinaryDir.Event.SubImage,
      });
      return img;
    });


    const subImageUrls = await Promise.all(promises);

    const imageError = subImageUrls.some((image) => (!(image)));

    if (!contentImageUrl || !thumbnailImageUrl || imageError) {
      throw new Errors.InternalServerError('File upload failed');
    }

    const dueDate = new Date(date);

    let event;

    try {
      await database.sequelize.transaction(async (t) => {
        // create event
        event = await database.Event.create({
          headerTitle: headerTitleTitlecase,
          headerSinhalaTitle,
          headerDescription,
          contentImage: contentImageUrl,
          contentDescription,
          thumbnailImage: thumbnailImageUrl,
          thumbnailDescription,
          thumbnailTitle: thumbnailTitleTitlecase,
          date: dueDate,
          projectId,
        }, { transaction: t });

        // insert event id into subImages
        const subImageArray = subImageUrls.map((image) => (
          { image, eventId: event.dataValues.id }));

        // create tuples in event_image table
        await database.EventImage.bulkCreate(subImageArray, { transaction: t });
      });
    } catch (error) {
      logger.error(`Error while inserting data: ${error}`);
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    event = formatResponse(event);

    return { ...event, subImages: subImageUrls };
  }

  /**
     * Deletes an existing event
     * @param {string} id id of the notificaion
  */
  static async DeleteEvent({ id }) {
    const database = await getDatabase();

    const event = await database.Event.findOne({ where: { id } });
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
     * Returns an existing event
     * @param {string} id id of the event
  */
  static async GetEvent({ id }) {
    const database = await getDatabase();

    let event = await database.Event.findOne({
      where: { id },
      include: {
        model: database.EventImage,
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
   * Updates an existing event
   * @param {string} id id of the event
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
    date,
    subImages,
    projectId,
  }) {
    const database = await getDatabase();

    let event = await database.Event.findOne({ where: { id } });
    if (!event) {
      throw new Errors.BadRequest('A event with the given id does not exist');
    }

    // make titlecase
    const headerTitleTitlecase = convertToTitleCase(headerTitle);
    const thumbnailTitleTitlecase = convertToTitleCase(thumbnailTitle);

    // check if project id is valid
    const project = await database.Project.findOne({ where: { id: projectId } });
    if (!project) {
      throw new Errors.BadRequest('A project with the given id does not exist');
    }

    // upload the files and get the url
    const contentImageUrl = await fileUpload({
      file: contentImage, folder: cloudinaryDir.Event.Content,
    });
    const thumbnailImageUrl = await fileUpload({
      file: thumbnailImage, folder: cloudinaryDir.Event.Thumbnail,
    });

    const promises = subImages.map(async (image) => fileUpload({
      file: image, folder: cloudinaryDir.Event.SubImage,
    }));


    const subImageUrls = await Promise.all(promises);

    const imageError = subImageUrls.some((image) => (!(image)));

    if (!contentImageUrl || !thumbnailImageUrl || imageError) {
      throw new Errors.InternalServerError('File upload failed');
    }

    const dueDate = new Date(date);

    event.headerTitle = headerTitleTitlecase;
    event.headerSinhalaTitle = headerSinhalaTitle;
    event.headerDescription = headerDescription;
    event.contentImage = contentImageUrl;
    event.contentDescription = contentDescription;
    event.thumbnailImage = thumbnailImageUrl;
    event.thumbnailDescription = thumbnailDescription;
    event.thumbnailTitle = thumbnailTitleTitlecase;
    event.date = dueDate;
    event.projectId = projectId;

    try {
      await database.sequelize.transaction(async (t) => {
      // save edited event
        await event.save({ transaction: t });
        // delete previous images
        await database.EventImage.destroy({ where: { eventId: id } }, { transaction: t });

        // insert event id into subImages
        const subImageArray = subImageUrls.map((image) => (
          { image, eventId: event.dataValues.id }));

        // create tuples in attatchment table
        await database.EventImage.bulkCreate(subImageArray, { transaction: t });
      });
    } catch (error) {
      logger.error(`Error while inserting data: ${error}`);
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    event = formatResponse(event);
    return { ...event, subImages: subImageUrls };
  }

  /**
   * Returns all events
   * @returns {Object}[] Events
*/
  static async ListEvents() {
    const database = await getDatabase();

    const result = await database.Event.findAll({
      order: [['date', 'DESC']],
      include: {
        model: database.EventImage,
        attributes: ['id', 'image'],
      },
    });

    const events = result.map((event) => formatResponse(event));

    return events;
  }

  /**
   * Returns all events of a given project
   * @param {String} projectId id of the project
   * @returns {Object}[] Events
*/
  static async ListEventsOfAProject({ projectId }) {
    const database = await getDatabase();

    const result = await database.Event.findAll(
      {
        where: { projectId },
        order: [['date', 'DESC']],
        include: {
          model: database.EventImage,
          attributes: ['id', 'image'],
        },
      },
    );

    const events = result.map((event) => formatResponse(event));

    return events;
  }

  /**
   * Returns all latest(past) events
   * @returns {Object}[] Events
*/
  static async ListLatestEvents() {
    const database = await getDatabase();

    const result = await database.Event.findAll(
      {
        order: [['date', 'DESC']],
        include: {
          model: database.EventImage,
          attributes: ['id', 'image'],
        },
      },
    );

    const currentDate = new Date();
    let events = result.map((event) => formatResponse(event));
    events = (events.filter((event) => currentDate.getTime() > event.date.getTime())).slice(0, 10);
    return events;
  }

  /**
   * Returns all latest(past) events
   * @returns {Object}[] Events
*/
  static async ListUpcomingEvents() {
    const database = await getDatabase();

    const result = await database.Event.findAll(
      {
        order: [['date', 'ASC']],
        include: {
          model: database.EventImage,
          attributes: ['id', 'image'],
        },
      },
    );

    const currentDate = new Date();
    let events = result.map((event) => formatResponse(event));
    events = (events.filter((event) => currentDate.getTime() < event.date.getTime())).slice(0, 10);
    return events;
  }
}

module.exports = EventService;
