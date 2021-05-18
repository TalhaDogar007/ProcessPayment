const Joi = require("joi");

const paymentSchema = Joi.object().keys({
  creditCardNumber: Joi.string().creditCard().required(),
  cardHolder: Joi.string().required(),
  expirationDate: Joi.date().greater("now").required(),
  securityCode: Joi.string().max(3),
  amount: Joi.number().positive().required(),
});

module.exports = {
  paymentSchema: paymentSchema,
};
