const Joi = require('@hapi/joi');

const Registration = Joi.object().keys({
  token: Joi.string().length(96).required(),
  firstName: Joi.string().max(255).required(),
  lastName: Joi.string().max(255).required(),
  password: Joi.string().max(1023).min(6).required(),
});

const Login = Joi.object().keys({
  email: Joi.string().email().max(1023).required(),
  password: Joi.string().max(1023).min(6).required(),
});

module.exports = { Registration, Login };