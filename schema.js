const Joi = require('joi');

module.exports.contactSchema = Joi.object({
    contact : Joi.object({
      name: Joi.string().required(),
      email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      subJect: Joi.string().allow("",null),
      message: Joi.string().required(),
  }).required(),
});