const TeamMemberService = require('../services/team_member');
const {
  CreateTeamMember, TeamMemberId, UpdateTeamMember,
} = require('../validators/team_member');

/**
 * Controller which manages team_members
 * @abstract
 * @category Controllers
 */
class TeamMemberController {
  /**
   * Creates a team_member
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PostCreateTeamMember(req, res, next) {
    try {
      const { value, error } = CreateTeamMember.validate(req.body);
      if (error) throw (error);
      const teamMember = await TeamMemberService.CreateTeamMember(value);
      res.send(teamMember).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Deletes a team_member
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async DeleteDeleteTeamMember(req, res, next) {
    try {
      const { value, error } = TeamMemberId.validate({ id: req.params.id });
      if (error) throw (error);
      await TeamMemberService.DeleteTeamMember(value);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Lists all team_members
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListTeamMembers(req, res, next) {
    try {
      const teamMembers = await TeamMemberService.ListTeamMembers();
      res.send(teamMembers).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Updates a team_member
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PutUpdateTeamMember(req, res, next) {
    try {
      const { value, error } = UpdateTeamMember.validate({ id: req.params.id, ...req.body });
      if (error) throw (error);
      const teamMember = await TeamMemberService.UpdateTeamMember(value);
      res.send(teamMember).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TeamMemberController;
