const Joi = require('@hapi/joi');

const CreateCordinator = Joi.object().keys({
  firstName: Joi.string().max(255).required(),
  lastName: Joi.string().max(255).required(),
  university: Joi.string().max(255),
  description: Joi.string().max(255),
  alumni: Joi.bool().required(),
  projectId: Joi.string().uuid().required(),
});

const UpdateCordinator = Joi.object().keys({
  id: Joi.string().uuid().required(),
  firstName: Joi.string().max(255).required(),
  lastName: Joi.string().max(255).required(),
  university: Joi.string().max(255),
  description: Joi.string().max(255),
  alumni: Joi.bool().required(),
  projectId: Joi.string().uuid().required(),
});

const CordinatorId = Joi.object().keys({
  id: Joi.string().uuid().required(),
});

module.exports = {
  CreateCordinator, UpdateCordinator, CordinatorId,
};
