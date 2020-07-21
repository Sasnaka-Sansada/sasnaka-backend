const Joi = require('@hapi/joi');

const UserId = Joi.object().keys({
  id: Joi.string().uuid().required(),
});

const UpdateUser = Joi.object().keys({
  id: Joi.string().uuid().required(),
  name: Joi.string().max(255).required(),
  oldPassword: Joi.string().max(1023).min(6).required(),
  newPassword: Joi.string().max(1023).min(6).required(),
  profileImage: Joi.string().uri().max(1023).allow(null, '')
    .required(),
});


module.exports = {
  UserId, UpdateUser,
};
