const Joi = require('@hapi/joi');
const { Pillers } = require('../database/models/pillar');

const CreateProject = Joi.object().keys({
  header: Joi.string().max(255).required(),
  subHeader: Joi.string().max(255).required(),
  introduction: Joi.string().required(),
  objective: Joi.string().required(),
  process: Joi.string().required(),
  pillerId: Joi.string().valid(...Pillers).required(),
});

const UpdateProject = Joi.object().keys({
  id: Joi.string().uuid().required(),
  header: Joi.string().max(255).required(),
  subHeader: Joi.string().max(255).required(),
  introduction: Joi.string().required(),
  objective: Joi.string().required(),
  process: Joi.string().required(),
  pillerId: Joi.string().valid(...Pillers).required(),
});

const ProjectId = Joi.object().keys({
  id: Joi.string().uuid().required(),
});

module.exports = { CreateProject, ProjectId, UpdateProject };
