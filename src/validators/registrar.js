const Joi = require('@hapi/joi');

const Invitation = Joi.object().keys({
  email: Joi.string().email().required(),
  roleId: Joi.string().uuid().required(),
});

module.exports = { Invitation };
