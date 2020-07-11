const ProjectService = require('../services/project');
const {
  CreateProject, ProjectId, UpdateProject, ProjectPiller,
} = require('../validators/project');
const { FileValidator } = require('../validators/file_validator');

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
   * @param {NextFunction} next
   */
  static async PostCreateProject(req, res, next) {
    try {
      const { value, error } = CreateProject.validate(req.body);
      if (error) throw (error);
      const { fileError, images } = FileValidator(req.files,
        ['introductionImage', 'objectiveImage', 'processImage'], [], []);
      if (fileError) throw fileError;
      const project = await ProjectService.CreateProject({ ...value, ...images });
      res.send(project).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Deletes a project
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
   * Gets a project
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
      const { fileError, images } = FileValidator(req.files, ['introductionImage', 'objectiveImage', 'processImage'], [], []);
      if (fileError) throw fileError;
      const project = await ProjectService.UpdateProject({ ...value, ...images });
      res.send(project).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Lists all projects
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListProjects(req, res, next) {
    try {
      const projects = await ProjectService.ListProjects();
      res.send(projects).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Lists all projects of a given piller
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListProjectsOfAPiller(req, res, next) {
    try {
      const { value, error } = ProjectPiller.validate({ pillerId: req.params.pillerId });
      if (error) throw (error);
      const projects = await ProjectService.ListProjectsOfAPiller(value);
      res.send(projects).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProjectController;
