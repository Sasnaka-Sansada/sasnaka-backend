const Joi = require('@hapi/joi');

const CreateMediaCordinator = Joi.object().keys({
  name: Joi.string().max(255).required(),
  university: Joi.string().max(255).allow(null, '').required(),
  description: Joi.string().allow(null, '').required(),
  alumni: Joi.bool().required(),
  profileImage: Joi.string().uri().max(1023).required(),
  type: Joi.string().max(255).required(),
});

const UpdateMediaCordinator = Joi.object().keys({
  id: Joi.string().uuid().required(),
  name: Joi.string().max(255).required(),
  university: Joi.string().allow(null, '').required(),
  description: Joi.string().allow(null, '').required(),
  alumni: Joi.bool().required(),
  profileImage: Joi.string().uri().max(1023).required(),
  type: Joi.string().max(255).required(),
});

const MediaCordinatorId = Joi.object().keys({
  id: Joi.string().uuid().required(),
});

module.exports = {
  CreateMediaCordinator, UpdateMediaCordinator, MediaCordinatorId,
};
