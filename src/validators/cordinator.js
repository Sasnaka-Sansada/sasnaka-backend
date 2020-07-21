const Joi = require('@hapi/joi');

const CreateCordinator = Joi.object().keys({
  name: Joi.string().max(255).required(),
  university: Joi.string().max(255).allow(null, '').required(),
  description: Joi.string().allow(null, '').required(),
  alumni: Joi.bool().required(),
  profileImage: Joi.string().uri().max(1023).required(),
  projectId: Joi.string().uuid().required(),
  alumniProjects: Joi.array().items(Joi.string().uuid().required().allow(null)).required(),
});

const UpdateCordinator = Joi.object().keys({
  id: Joi.string().uuid().required(),
  name: Joi.string().max(255).required(),
  university: Joi.string().allow(null, '').required(),
  description: Joi.string().allow(null, '').required(),
  alumni: Joi.bool().required(),
  profileImage: Joi.string().uri().max(1023).required(),
  projectId: Joi.string().uuid().required(),
  alumniProjects: Joi.array().items(Joi.string().uuid().required().allow(null)).required(),
});

const CordinatorId = Joi.object().keys({
  id: Joi.string().uuid().required(),
});

module.exports = {
  CreateCordinator, UpdateCordinator, CordinatorId,
};
