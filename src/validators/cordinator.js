const Joi = require('@hapi/joi');

const CreateCordinator = Joi.object().keys({
  name: Joi.string().max(255).required(),
  university: Joi.string().max(255).allow(null, '').required(),
  description: Joi.string().allow(null, '').required(),
  alumni: Joi.bool().required(),
  projectId: Joi.string().uuid().required(),
});

const UpdateCordinator = Joi.object().keys({
  id: Joi.string().uuid().required(),
  name: Joi.string().max(255).required(),
  university: Joi.string().allow(null, '').required(),
  description: Joi.string().allow(null, '').required(),
  alumni: Joi.bool().required(),
  projectId: Joi.string().uuid().required(),
});

const CordinatorId = Joi.object().keys({
  id: Joi.string().uuid().required(),
});

module.exports = {
  CreateCordinator, UpdateCordinator, CordinatorId,
};
