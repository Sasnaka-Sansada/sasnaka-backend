const Joi = require('@hapi/joi');

const CreateTeamMember = Joi.object().keys({
  name: Joi.string().max(255).required(),
  position: Joi.string().max(1023).required(),
  achievements: Joi.string().required(),
  description: Joi.string().required(),
  linkedin: Joi.string().uri().max(255).allow(null, '')
    .required(),
  facebook: Joi.string().uri().max(255).allow(null, '')
    .required(),
  twitter: Joi.string().uri().max(255).allow(null, '')
    .required(),

});

const UpdateTeamMember = Joi.object().keys({
  id: Joi.string().uuid().required(),
  name: Joi.string().max(255).required(),
  position: Joi.string().max(1023).required(),
  achievements: Joi.string().required(),
  description: Joi.string().required(),
  linkedin: Joi.string().uri().max(255).allow(null, '')
    .required(),
  facebook: Joi.string().uri().max(255).allow(null, '')
    .required(),
  twitter: Joi.string().uri().max(255).allow(null, '')
    .required(),
});

const TeamMemberId = Joi.object().keys({
  id: Joi.string().uuid().required(),
});

module.exports = {
  CreateTeamMember, UpdateTeamMember, TeamMemberId,
};
