const { getDatabase } = require('../helpers/get_database');
const Errors = require('../helpers/errors');
const logger = require('../helpers/logger');
const { fileUpload } = require('../helpers/file_upload_handler');
const cloudinaryDir = require('../config/cloudinary.json');
const {
  formatResponse, convertToTitleCase,
} = require('../helpers/minihelpers');

/**
 * Service that manages team_member functionalities
 * @abstract
 * @category Services
 */
class TeamMemberService {
/**
     * Creates a new team_member
     * @param {string} name name of the team member
     * @param {string} position position team member
     * @param {string} achievements list of achievements team member
     * @param {string} description description team member
     * @param {string} linkedin linkedIn url of the team member
     * @param {string} facebook facebook url of the team member
     * @param {string} twitter twitter url of the team member
     * @param {File} profileImage profile image of the team member
     * @returns {string}
  */
  static async CreateTeamMember({
    name,
    position,
    achievements,
    description,
    linkedin,
    facebook,
    twitter,
    profileImage,
  }) {
    const database = await getDatabase();

    // convert name to titilecase
    const nameTitlecase = convertToTitleCase(name);

    // upload the profileImage file and get the url
    const profileImageUrl = await fileUpload({
      file: profileImage, folder: cloudinaryDir.TeamMember.Profile,
    });

    if (!profileImageUrl) {
      throw new Errors.InternalServerError('Image upload failed');
    }

    let teamMember;

    try {
      teamMember = await database.TeamMember.create({
        name: nameTitlecase,
        position,
        achievements,
        description,
        linkedin,
        facebook,
        twitter,
        profileImage: profileImageUrl,
      });
    } catch (error) {
      logger.error(`Error while inserting data. ${error}`);
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    teamMember = formatResponse(teamMember);

    return teamMember;
  }

  /**
     * Deletes an existing team_member
     * @param {string} id id of the team_member
  */
  static async DeleteTeamMember({ id }) {
    const database = await getDatabase();

    const teamMember = await database.TeamMember.findOne({ where: { id } });
    if (!teamMember) {
      throw new Errors.BadRequest('A team member with the given id does not exist');
    }

    try {
      await teamMember.destroy();
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }
  }


  /**
     * Updates an existing team_member
     * @param {string} id id of the team_member
  */
  static async UpdateTeamMember({
    id,
    name,
    position,
    achievements,
    description,
    linkedin,
    facebook,
    twitter,
    profileImage,
  }) {
    const database = await getDatabase();

    let teamMember = await database.TeamMember.findOne({ where: { id } });
    if (!teamMember) {
      throw new Errors.BadRequest('A teamMember with the given id does not exist');
    }

    // convert name to titlecase
    const nameTitlecase = convertToTitleCase(name);

    // upload the file and get the url
    const profileImageUrl = await fileUpload({
      file: profileImage, folder: cloudinaryDir.TeamMember.Profile,
    });

    if (!profileImageUrl) {
      throw new Errors.InternalServerError('Image upload failed');
    }


    teamMember.name = nameTitlecase;
    teamMember.position = position;
    teamMember.achievements = achievements;
    teamMember.description = description;
    teamMember.linkedin = linkedin;
    teamMember.facebook = facebook;
    teamMember.twitter = twitter;
    teamMember.profileImage = profileImageUrl;

    try {
      await teamMember.save();
    } catch (error) {
      logger.error('Error while inserting data');
      throw new Errors.InternalServerError('Error while inserting data');
    }

    // remove timestamp attributes
    teamMember = formatResponse(teamMember);

    return teamMember;
  }

  /**
     * Returns all team_members
     * @returns {TeamMember}[] array of all team_members
  */
  static async ListTeamMembers() {
    const database = await getDatabase();

    const result = await database.TeamMember.findAll({ order: [['createdAt', 'DESC']] });

    // remove timestamp attributes
    const teamMembers = result.map((teamMember) => formatResponse(teamMember));

    return teamMembers;
  }
}

module.exports = TeamMemberService;
