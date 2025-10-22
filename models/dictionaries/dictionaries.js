const Joi = require("joi");
const {languages} = require('../../constants')

const createDictionarySchema = Joi.object({
  tl : Joi.string().valid(...languages).required(),
});

const addWordSchema = Joi.object({
  wordId : Joi.string().required(),
  tl : Joi.string().valid(...languages)
})



const changeStatusSchema = Joi.object({
  tl : Joi.string().valid(...languages).required(),
  wordId : Joi.string().required(),
  result : Joi.string().valid('correct', 'incorrect')
})

const sendToRepeatSchema = Joi.object({
  tl : Joi.string().valid(...languages).required(),
  wordId : Joi.string().required(),
})




const dictSchemas = {
  createDictionarySchema,
  addWordSchema,
  changeStatusSchema,
  sendToRepeatSchema,
};

module.exports = {
  dictSchemas,
};
