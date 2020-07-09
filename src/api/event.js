const EventService = require('../services/event');
const {
  CreateEvent, EventId, UpdateEvent, ProjectId,
} = require('../validators/event');
const { FileValidator } = require('../validators/file_validator');

/**
 * Controller which manages events
 * @abstract
 * @category Controllers
 */
class EventController {
  /**
   * Creates a event
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PostCreateEvent(req, res, next) {
    try {
      const { value, error } = CreateEvent.validate(req.body);
      if (error) throw (error);
      const { fileError, images } = FileValidator(req.files, ['contentImage', 'thumbnailImage', 'subImages'], []);
      if (fileError) throw fileError;
      const event = await EventService.CreateEvent({ ...value, ...images });
      res.send(event).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Deletes a event
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async DeleteDeleteEvent(req, res, next) {
    try {
      const { value, error } = EventId.validate({ id: req.params.id });
      if (error) throw (error);
      await EventService.DeleteEvent(value);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Gets a event
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetGetEvent(req, res, next) {
    try {
      const { value, error } = EventId.validate({ id: req.params.id });
      if (error) throw (error);
      const event = await EventService.GetEvent(value);
      res.send(event).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Updates a event
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PutUpdateEvent(req, res, next) {
    try {
      const { value, error } = UpdateEvent.validate({ id: req.params.id, ...req.body });
      if (error) throw (error);
      const { fileError, images } = FileValidator(req.files, ['contentImage', 'thumbnailImage', 'subImages'], []);
      if (fileError) throw fileError;
      const event = await EventService.UpdateEvent({ ...value, ...images });
      res.send(event).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Lists all events
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListEvents(req, res, next) {
    try {
      const events = await EventService.ListEvents();
      res.send(events).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Lists all events of a project
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListEventsOfAProject(req, res, next) {
    try {
      const { value, error } = ProjectId.validate({ projectId: req.params.projectId });
      if (error) throw error;
      const events = await EventService.ListEventsOfAProject(value);
      res.send(events).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Lists all latest events
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListLatestEvents(req, res, next) {
    try {
      const events = await EventService.ListLatestEvents();
      res.send(events).status(200);
    } catch (err) {
      next(err);
    }
  }


  /**
   * Lists all upcoming events
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListUpcomingEvents(req, res, next) {
    try {
      const events = await EventService.ListUpcomingEvents();
      res.send(events).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EventController;
