const Joi = require('@hapi/joi');

const CreateNotification = Joi.object().keys({
  header: Joi.string().max(255).required(),
  subHeader: Joi.string().max(255).required().allow(null, ''),
  description: Joi.string().required(),
  subDescription: Joi.string().required().allow(null, ''),
});

const UpdateNotification = Joi.object().keys({
  id: Joi.string().uuid().required(),
  header: Joi.string().max(255).required(),
  subHeader: Joi.string().max(255).required().allow(null, ''),
  description: Joi.string().required(),
  subDescription: Joi.string().required().allow(null, ''),
});

const NotificationId = Joi.object().keys({
  id: Joi.string().uuid().required(),
});

module.exports = {
  CreateNotification, UpdateNotification, NotificationId,
};
