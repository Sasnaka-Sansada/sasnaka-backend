const Joi = require('@hapi/joi');
const { Pillers } = require('../database/models/pillar');

const CreateProject = Joi.object().keys({
  header: Joi.string().max(255).required(),
  subHeader: Joi.string().max(255).required(),
  introduction: Joi.string().required(),
  objective: Joi.string().required(),
  process: Joi.string().required(),
  introductionImage: Joi.string().uri().max(1023).required(),
  objectiveImage: Joi.string().uri().max(1023).required(),
  processImage: Joi.string().uri().max(1023).required(),
  pillerId: Joi.string().valid(...Pillers).required(),
});

const UpdateProject = Joi.object().keys({
  id: Joi.string().uuid().required(),
  header: Joi.string().max(255).required(),
  subHeader: Joi.string().max(255).required(),
  introduction: Joi.string().required(),
  objective: Joi.string().required(),
  process: Joi.string().required(),
  introductionImage: Joi.string().uri().max(1023).required(),
  objectiveImage: Joi.string().uri().max(1023).required(),
  processImage: Joi.string().uri().max(1023).required(),
  pillerId: Joi.string().valid(...Pillers).required(),
});

const ProjectId = Joi.object().keys({
  id: Joi.string().uuid().required(),
});

const ProjectPiller = Joi.object().keys({
  pillerId: Joi.string().valid(...Pillers).required(),
});

module.exports = {
  CreateProject, ProjectId, UpdateProject, ProjectPiller,
};
