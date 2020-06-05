const Joi = require('@hapi/joi');
const { Roles } = require('../database/models/role');

const Invitation = Joi.object().keys({
  emailList: Joi.array().items(Joi.string().email().max(1023).required()).required(),
  roleId: Joi.string().valid(...Roles).required(),
});

module.exports = { Invitation };
