const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../../helpers');
const { languages } = require('../../constants');

const userWordSchema = new Schema(
  {
    wordRef: { type: Schema.Types.ObjectId, ref: 'Word' },
    text: { type: String, required: true },
    examples: { type: [String], required: true },
    synonyms: { type: [String], required: true },
    antonyms: { type: [String], required: true },
    repeatCount: { type: Number, default: 0 },
  },
  { timestamps: false, strict: false }
);

const dictionarySchema = new Schema(
  {
    lang: { type: String, enum: languages, required: true },
    words: { type: [userWordSchema], default: [] },
  },
  { _id: false }
);

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  nativeLang: { type: String, enum: languages, required: true },
  dictionaries: { type: [dictionarySchema], default: [] },
  token: { type: String, default: '' },
});

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  nativeLang: Joi.string()
    .valid(...languages)
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const userSchemas = {
  registerSchema,
  loginSchema,
};

const User = model('user', userSchema);

userSchema.pre('validate', function (next) {
  const nativeLang = this.nativeLang;

  this.dictionaries.forEach(dict => {
    dict.words.forEach(word => {
      if (!word[nativeLang]) {
        return next(
          new Error(`Word "${word.text}" should be in: "${nativeLang}"`)
        );
      }
    });
  });

  next();
});

module.exports = {
  User,
  userSchemas,
};
