const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const { fileUpload } = require('../helpers/file_upload_handler');
const cloudinaryDir = require('../config/cloudinary.json');
const { convertToTitleCase, formatResponse } = require('../helpers/minihelpers');

/**
 * Service that manages notification functionalities
 * @abstract
 * @category Services
 */
class NotificationService {
  /**
   *
   * @param {String} header
   * @param {String} subHeader
   * @param {String} description
   * @param {String} subDescription
   * @param {File} bannerImage
   * @param {File} portraitImage
   * @param {File}[] attatchments
   */
  static async CreateNotification({
    header,
    subHeader,
    description,
    subDescription,
    bannerImage,
    portraitImage,
    docs,
  }) {
    const database = await getDatabase();

    // make header titlecase
    const headerTitlecase = convertToTitleCase(header);
    // make header titlecase
    const subHeaderTitlecase = convertToTitleCase(subHeader);


    // upload the files and get the url
    const bannerImageUrl = await fileUpload({
      file: bannerImage, folder: cloudinaryDir.Notification.Banner,
    });
    const portraitImageUrl = await fileUpload({
      file: portraitImage, folder: cloudinaryDir.Notification.Portrait,
    });

    const promises = docs.map(async (document) => {
      const attatchment = await fileUpload({
        file: document.doc, folder: cloudinaryDir.Notification.Document,
      });
      return { name: document.name, attatchment };
    });

    const attatchments = await Promise.all(promises);

    const attatchmentError = attatchments.some((attatchment) => (!(attatchment)));

    if (!bannerImageUrl || !portraitImageUrl || attatchmentError) {
      throw new Errors.InternalServerError('File upload failed');
    }

    let notification;

    try {
      await database.sequelize.transaction(async (t) => {
        // create notification
        notification = await database.Notification.create({
          header: headerTitlecase,
          subHeader: subHeaderTitlecase,
          description,
          subDescription,
          bannerImage: bannerImageUrl,
          portraitImage: portraitImageUrl,
        }, { transaction: t });

        // insert notification id into attatchments id
        const attatchmentArray = attatchments.map((attatchment) => (
          { ...attatchment, notificationId: notification.dataValues.id }));

        // create tuples in attatchment table
        await database.Attatchment.bulkCreate(attatchmentArray, { transaction: t });
      });
    } catch (error) {
      logger.error(`Error while inserting data: ${error}`);
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    notification = formatResponse(notification);

    return { ...notification, attatchments };
  }

  /**
     * Deletes an existing notification
     * @param {string} id id of the notificaion
  */
  static async DeleteNotification({ id }) {
    const database = await getDatabase();

    const notification = await database.Notification.findOne({ where: { id } });
    if (!notification) {
      throw new Errors.BadRequest('A notification with the given id does not exist');
    }

    try {
      await notification.destroy();
    } catch (error) {
      logger.error(`Error while deleting data: ${error}`);
      throw new Errors.InternalServerError('Error while deleting data');
    }
  }

  /**
     * Returns an existing notification
     * @param {string} id id of the notification
  */
  static async GetNotification({ id }) {
    const database = await getDatabase();

    let notification = await database.Notification.findOne({
      where: { id },
      include: {
        model: database.Attatchment,
        attributes: ['id', 'name', 'attatchment'],
      },
    });
    if (!notification) {
      throw new Errors.BadRequest('A notification with the given id does not exist');
    }

    // remove timestamp attributes
    notification = formatResponse(notification);
    return notification;
  }

  /**
     * Updates an existing notification
     * @param {string} id id of the notification
  */
  static async UpdateNotification({
    id,
    header,
    subHeader,
    description,
    subDescription,
    bannerImage,
    portraitImage,
    docs,
  }) {
    const database = await getDatabase();

    let notification = await database.Notification.findOne({ where: { id } });
    if (!notification) {
      throw new Errors.BadRequest('A notification with the given id does not exist');
    }

    // make header titlecase
    const headerTitlecase = convertToTitleCase(header);
    // make header titlecase
    const subHeaderTitlecase = convertToTitleCase(subHeader);


    // upload the files and get the url
    const bannerImageUrl = await fileUpload({
      file: bannerImage, folder: cloudinaryDir.Notification.Banner,
    });
    const portraitImageUrl = await fileUpload({
      file: portraitImage, folder: cloudinaryDir.Notification.Portrait,
    });

    const promises = docs.map(async (document) => {
      const attatchment = await fileUpload({
        file: document.doc, folder: cloudinaryDir.Notification.Document,
      });
      return { name: document.name, attatchment };
    });

    const attatchments = await Promise.all(promises);

    const attatchmentError = attatchments.some((attatchment) => (!(attatchment)));

    if (!bannerImageUrl || !portraitImageUrl || attatchmentError) {
      throw new Errors.InternalServerError('File upload failed');
    }

    notification.header = headerTitlecase;
    notification.subHeader = subHeaderTitlecase;
    notification.description = description;
    notification.subDescription = subDescription;
    notification.bannerImage = bannerImageUrl;
    notification.portraitImage = portraitImageUrl;

    try {
      await database.sequelize.transaction(async (t) => {
        // save edited notification
        await notification.save({ transaction: t });
        // delete previous attatchments
        await database.Attatchment.destroy({ where: { notificationId: id } }, { transaction: t });
        // insert notification id into attatchments id
        const attatchmentArray = attatchments.map((attatchment) => (
          { ...attatchment, notificationId: notification.dataValues.id }));

        // create tuples in attatchment table
        await database.Attatchment.bulkCreate(attatchmentArray, { transaction: t });
      });
    } catch (error) {
      logger.error(`Error while inserting data: ${error}`);
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    notification = formatResponse(notification);
    return { ...notification, attatchments };
  }

  /**
     * Returns all notifications
     * @returns {Object}[] Notifications
  */
  static async ListNotifications() {
    const database = await getDatabase();

    const result = await database.Notification.findAll({
      order: [['createdAt', 'DESC']],
      include: {
        model: database.Attatchment,
        attributes: ['id', 'name', 'attatchment'],
      },
    });

    const notifications = result.map((notification) => formatResponse(notification));

    return notifications;
  }
}

module.exports = NotificationService;
