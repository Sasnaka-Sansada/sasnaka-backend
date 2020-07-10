const Joi = require('@hapi/joi');

const CreateResourcePerson = Joi.object().keys({
  name: Joi.string().max(255).required(),
  address: Joi.string().allow(null, '').required(),
  email: Joi.string().email().max(1023).required(),
  contactNumber: Joi.number().integer().min(1).max(10 ** 15)
    .required(),
  type: Joi.string().max(255).required(),
  comment: Joi.string().allow(null, '').required(),
});

module.exports = {
  CreateResourcePerson,
};
