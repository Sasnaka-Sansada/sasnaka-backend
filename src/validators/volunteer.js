const Joi = require('@hapi/joi');

const CreateVolunteer = Joi.object().keys({
  name: Joi.string().max(255).required(),
  birthday: Joi.date().required(),
  email: Joi.string().email().max(1023).required(),
  contactNumber: Joi.number().integer().min(1).max(10 ** 15)
    .required(),
  address: Joi.string().allow(null, '').required(),
  potentials: Joi.string().allow(null, '').required(),
  interested: Joi.string().allow(null, '').required(),
  comment: Joi.string().allow(null, '').required(),
});


module.exports = {
  CreateVolunteer,
};
