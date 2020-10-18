const Joi = require('@hapi/joi');

const CreateBanner = Joi.object().keys({
  header: Joi.string().max(255).required().allow(null, ''),
  description: Joi.string().required().allow(null, ''),
  heroImage: Joi.string().uri().max(1023).required()
    .allow(null, ''),
  readMoreLink: Joi.string().uri().max(1023).required()
    .allow(null, ''),
});

const UpdateBanner = Joi.object().keys({
  id: Joi.string().uuid().required(),
  header: Joi.string().max(255).required().allow(null, ''),
  description: Joi.string().required().allow(null, ''),
  heroImage: Joi.string().uri().max(1023).required()
    .allow(null, ''),
  readMoreLink: Joi.string().uri().max(1023).required()
    .allow(null, ''),
});

const BannerId = Joi.object().keys({
  id: Joi.string().uuid().required(),
});

module.exports = {
  CreateBanner, UpdateBanner, BannerId,
};
