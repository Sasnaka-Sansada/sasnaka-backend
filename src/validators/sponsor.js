const Joi = require('@hapi/joi');

const CreateSponsor = Joi.object().keys({
  name: Joi.string().max(255).required(),
  address: Joi.string().allow(null, '').required(),
  email: Joi.string().email().max(1023).required(),
  contactNumber: Joi.number().integer().min(1).max(10 ** 15)
    .required(),
  comment: Joi.string().allow(null, '').required(),
});

module.exports = {
  CreateSponsor,
};
