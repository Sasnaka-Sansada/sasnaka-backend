const Joi = require('@hapi/joi');

const CreateFeedback = Joi.object().keys({
  name: Joi.string().max(255).required(),
  email: Joi.string().email().max(1023).required(),
  message: Joi.string().required(),
  visible: Joi.bool().required(),
});

const UpdateFeedback = Joi.object().keys({
  id: Joi.string().uuid().required(),
  name: Joi.string().max(255).required(),
  email: Joi.string().email().max(1023).required(),
  message: Joi.string().required(),
  visible: Joi.bool().required(),
});

const SharedEmailList = Joi.object().keys({
  emailList: Joi.array().items(Joi.string().email().max(1023)).required(),
});

module.exports = {
  CreateFeedback, UpdateFeedback, SharedEmailList,
};
