const Joi = require('@hapi/joi');

const CreateEvent = Joi.object().keys({
  headerTitle: Joi.string().max(255).required(),
  headerSinhalaTitle: Joi.string().max(255).required().allow(null, ''),
  headerDescription: Joi.string().max(255).required().allow(null, ''),
  contentDescription: Joi.string().max(255).required().allow(null, ''),
  thumbnailDescription: Joi.string().max(255).required().allow(null, ''),
  thumbnailTitle: Joi.string().max(255).required(),
  date: Joi.date().required(),
  contentImage: Joi.string().uri().max(1023).required()
    .allow(null, ''),
  thumbnailImage: Joi.string().uri().max(1023).required(),
  subImages: Joi.array().items(Joi.string().uri().max(1023)).required().allow(null),
  heroImage: Joi.string().uri().max(1023).required()
    .allow(null, ''),
  projectId: Joi.string().uuid().required(),
});

const UpdateEvent = Joi.object().keys({
  id: Joi.string().uuid().required(),
  headerTitle: Joi.string().max(255).required(),
  headerSinhalaTitle: Joi.string().max(255).required().allow(null, ''),
  headerDescription: Joi.string().max(255).required().allow(null, ''),
  contentDescription: Joi.string().max(255).required().allow(null, ''),
  thumbnailDescription: Joi.string().max(255).required().allow(null, ''),
  thumbnailTitle: Joi.string().max(255).required(),
  date: Joi.date().required(),
  contentImage: Joi.string().uri().max(1023).required()
    .allow(null, ''),
  thumbnailImage: Joi.string().uri().max(1023).required(),
  subImages: Joi.array().items(Joi.string().uri().max(1023)).required().allow(null),
  heroImage: Joi.string().uri().max(1023).required()
    .allow(null, ''),
  projectId: Joi.string().uuid().required(),
});

const EventId = Joi.object().keys({
  id: Joi.string().uuid().required(),
});

const ProjectId = Joi.object().keys({
  projectId: Joi.string().uuid().required(),
});

module.exports = {
  CreateEvent, UpdateEvent, EventId, ProjectId,
};
