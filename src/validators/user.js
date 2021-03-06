const Joi = require('@hapi/joi');
const { Roles } = require('../database/models/role');

const UserId = Joi.object().keys({
  id: Joi.string().uuid().required(),
});

const UpdateUser = Joi.object().keys({
  id: Joi.string().uuid().required(),
  name: Joi.string().max(255).required(),
  oldPassword: Joi.string().max(1023).min(6).required()
    .allow(null, ''),
  newPassword: Joi.string().max(1023).min(6).required()
    .allow(null, ''),
  profileImage: Joi.string().uri().max(1023).allow(null, '')
    .required(),
  contactNumber: Joi.number().integer().min(1).max(10 ** 15),
});

const UpdateRole = Joi.object().keys({
  emailList: Joi.array().items(Joi.string().email().max(1023).required()).required(),
  roleId: Joi.string().valid(...Roles).required(),
});


module.exports = {
  UserId, UpdateUser, UpdateRole,
};
