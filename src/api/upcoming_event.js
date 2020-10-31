const UpcomingEventService = require('../services/upcoming_event');
const {
  CreateEvent, EventId, UpdateEvent,
} = require('../validators/upcoming_event');

/**
 * Controller which manages events
 * @abstract
 * @category Controllers
 */
class UpcomingEventController {
  /**
   * Creates an upcoming event
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PostCreateEvent(req, res, next) {
    try {
      const { value, error } = CreateEvent.validate(req.body);
      if (error) throw (error);
      const event = await UpcomingEventService.CreateEvent(value);
      res.send(event).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Deletes an upcoming event
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async DeleteDeleteEvent(req, res, next) {
    try {
      const { value, error } = EventId.validate({ id: req.params.id });
      if (error) throw (error);
      await UpcomingEventService.DeleteEvent(value);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Gets an upcoming event
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetGetEvent(req, res, next) {
    try {
      const { value, error } = EventId.validate({ id: req.params.id });
      if (error) throw (error);
      const event = await UpcomingEventService.GetEvent(value);
      res.send(event).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Updates an upcoming event
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PutUpdateEvent(req, res, next) {
    try {
      const { value, error } = UpdateEvent.validate({ id: req.params.id, ...req.body });
      if (error) throw (error);

      const event = await UpcomingEventService.UpdateEvent(value);
      res.send(event).status(200);
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
  static async GetListEvents(req, res, next) {
    try {
      const events = await UpcomingEventService.ListEvents();
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
  static async GetListEventsInRange(req, res, next) {
    try {
      const events = await UpcomingEventService.ListEventsInRange();
      res.send(events).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UpcomingEventController;
