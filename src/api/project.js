const ProjectService = require('../services/project');
const { CreateProject, ProjectId, UpdateProject } = require('../validators/project');
const { ImageValidator } = require('../validators/image_validator');

/**
 * Controller which manages projects
 * @abstract
 * @category Controllers
 */
class ProjectController {
  /**
   * Creates a project
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunct = require('../validators/image_validator')ion} next
   */
  static async PostCreateProject(req, res, next) {
    try {
      const { value, error } = CreateProject.validate(req.body);
      if (error) throw (error);
      const { imageError, images } = ImageValidator(req.files);
      if (imageError) throw imageError;
      const project = await ProjectService.CreateProject({ ...value, ...images });
      res.send(project).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Creates a project
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async DeleteDeleteProject(req, res, next) {
    try {
      const { value, error } = ProjectId.validate({ id: req.params.id });
      if (error) throw (error);
      await ProjectService.DeleteProject(value);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Creates a project
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetGetProject(req, res, next) {
    try {
      const { value, error } = ProjectId.validate({ id: req.params.id });
      if (error) throw (error);
      const project = await ProjectService.GetProject(value);
      res.send(project).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Updates a project
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PutUpdateProject(req, res, next) {
    try {
      const { value, error } = UpdateProject.validate({ id: req.params.id, ...req.body });
      if (error) throw (error);
      const { imageError, images } = ImageValidator(req.files);
      if (imageError) throw imageError;
      const project = await ProjectService.UpdateProject({ ...value, ...images });
      res.send(project).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProjectController;
