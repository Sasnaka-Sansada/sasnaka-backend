const Joi = require('@hapi/joi');

const UpdateContact = Joi.object().keys({
  postalCode: Joi.string().max(255).required(),
  phone1: Joi.string().max(20).required().allow(null, ''),
  phone2: Joi.string().max(20).required().allow(null, ''),
  email: Joi.string().email().max(1023).required(),
});

module.exports = { UpdateContact };
